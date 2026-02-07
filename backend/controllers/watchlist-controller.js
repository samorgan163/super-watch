const Film = require('../models/film.js');
const User = require('../models/user.js');
const tmdbService = require('../services/tmdbService.js');
const watchlistService = require('../services/watchlistService.js');

const { NotFoundError, ConflictError } = require('../errors/customErrors.js');

// once database grows, this can be negated by calling 'getFilmById' directly.
// only storing a subset of data locally to reduce db size, for now.
async function createFilmObject(tmdbid) {
    try {
        const tmdbRes = await tmdbService.getFilmById(tmdbid);

        const newFilm = {
            tmdbid: tmdbRes.tmdbid,
            title: tmdbRes.title,
            release_date: tmdbRes.release_date,
            poster: tmdbRes.poster,
            streaming: tmdbRes.streaming,
        };

        return newFilm;
    }
    catch (error) {
        throw new Error('tmdb fetch error: ' + error.message);
    }
}

/**
 * Adds a film to the user's watchlist.
 * A local copy of the film is created if it doesn't already exist in the database, using data from TMDB.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.addFilmToWatchlist = async (req, res, next) => {
    const userId = req.user.id;
    const tmdbid = req.params.tmdbid;

    try {
        // find or create film for local collection
        // this uses upsert to avoid duplicates
        // the checking for film and insertion if not found is done in one db call, making it atomic
        const film = await Film.findOneAndUpdate(
            { tmdbid },
            { $setOnInsert: await createFilmObject(tmdbid) },
            { new: true, upsert: true }
        );

        // add films to users watchlist if not already present
        const result = await User.updateOne(
            { _id: userId, 'watchlist.film': { $ne: film._id }},
            { $push: { watchlist: { film: film._id } } }
        );

        // if no documents were modified, film was already in watchlist
        if (result.modifiedCount === 0) {
            throw new ConflictError('Film already in watchlist');
        }

        return res.status(200).json({ message: 'Film added to watchlist' });
    }
    catch (err) {
        next(err);
    }
};

/**
 * Removes a film from the user's watchlist.
 * Local film data is not deleted.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.removeFilmFromWatchlist = async (req, res, next) => {
    const userId = req.user.id;
    const tmdbid = req.params.tmdbid;

    try {
        // find the film from local database, to get the internal _id
        const film = await Film.findOne({ tmdbid: tmdbid });
        if (!film) {
            throw new NotFoundError('Film not found in local database');
        }

        // remove from user's watchlist
        await User.updateOne(
            { _id: userId },
            { $pull: { watchlist: { film: film._id } } }
        );

        return res.status(200).json({ message: 'Film removed from watchlist' });
    }
    catch (error) {
        next(error);
    }
};

// return boolean whether a film is in the user's watchlist
// frontend can indicate to the user
// TODO: I dont think this is a good implementation
exports.filmInWatchlist = async (req, res) => {
    const userId = req.user.id;
    const tmdbid = parseInt(req.params.tmdbid, 10);
    
    try {
        
        const film = await Film.findOne({ tmdbid: tmdbid }).select('_id');
        
        if (!film) {
            return res.status(200).json({ in_watchlist: false });
        }

        const exists = await User.exists({
            _id: userId,
            'watchlist.film': film._id
        });

        return res.status(200).json({ in_watchlist: Boolean(exists) });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error checking watchlist: ' + error.message });
    }
}

/**
 * Retrieves the user's watchlist with populated film details.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getWatchlist = async (req, res, next) => {
    const userID = req.user.id
    try {
        const filmsStreaming = await watchlistService.getFilmsStreamingInWatchlist(userID);
        const filmsUnavailable = await watchlistService.getFilmsUnavailableInWatchlist(userID);

        return res.status(200).json({ streaming: filmsStreaming, unavailable: filmsUnavailable });
    }
    catch (error) {
        next(error);
    }
};
