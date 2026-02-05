const Film = require('../models/film.js');
const User = require('../models/user.js');
const tmdbApi = require('../apis/tmdb.js');

// once database grows, this can be negated by calling 'getFilmById' directly.
// only storing a subset of data locally to reduce db size, for now.
async function createFilmObject(tmdbid) {
    try {
        const tmdbRes = await tmdbApi.getFilmById(tmdbid);

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
exports.addFilmToWatchlist = async (req, res) => {
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
            return res.status(200).json({ message: 'Film already in watchlist' });
        }

        return res.status(200).json({ message: 'Film added to watchlist' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding film to watchlist: ' + error.message });
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
exports.removeFilmFromWatchlist = async (req, res) => {
    const userId = req.user.id;
    const tmdbid = req.params.tmdbid;

    try {
        // find the film from local database, to get the internal _id
        const film = await Film.findOne({ tmdbid: tmdbid });
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }

        // remove from user's watchlist
        await User.updateOne(
            { _id: userId },
            { $pull: { watchlist: { film: film._id } } }
        );
        return res.status(200).json({ message: 'Film removed from watchlist' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error removing film from watchlist: ' + error.message });
    }
};

/**
 * Retrieves the user's watchlist with populated film details.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getWatchlist = async (req, res) => {
    const userId = req.user.id
    try {
        const user = await User.findById(userId).populate('watchlist.film').lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ watchlist: user.watchlist });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching watchlist: ' + error.message });
    }
};

// return boolean whether a film is in the user's watchlist
// frontend can indicate to the user
// TODO: I dont think this is a good implementation
exports.filmInWatchlist = async (req, res) => {
    const userId = req.user.id;
    const tmdbid = parseInt(req.params.tmdbid, 10);
    
    try {
        
        const film = await Film.findOne({ tmdbid: tmdbid });
        
        if (!film) {
            return res.status(200).json({ in_watchlist: false });
        }
        
        const filmInWatchlist = await User.exists(
            { _id: userId, 'watchlist.film': film._id }
        );
    
        return res.status(200).json({ in_watchlist: !!(filmInWatchlist) });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error checking watchlist: ' + error.message });
    }
}

// get all films currently streaming in the user's watchlist
exports.getStreamingWatchlist = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId)
            .populate({ 
                path: 'watchlist.film',
                match: { streaming: { $exists: true, $ne: [] } },
                select: 'tmdbid title poster streaming' // only return necessary fields
            })
            .lean();

        const streamingFilms = user.watchlist.filter(item => item.film);

        return res.status(200).json({ streaming_watchlist: streamingFilms });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching streaming watchlist: ' + error.message });
    }
};