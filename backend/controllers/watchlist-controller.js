const watchlistService = require('../services/watchlistService.js');

/**
 * Adds a film to the user's watchlist.
 * A local copy of the film is created if it doesn't already exist in the database, using data from TMDB.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.addFilmToWatchlist = async (req, res, next) => {
    const userID = req.user.id;
    const tmdbID = req.params.tmdbid;

    try {
        await watchlistService.addFilmToWatchlist(userID, tmdbID);
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
    const userID = req.user.id;
    const tmdbID = req.params.tmdbid;
    
    try {
        await watchlistService.removeFilmFromWatchlist(userID, tmdbID);
        return res.status(200).json({ message: 'Film removed from watchlist' });
    }
    catch (error) {
        next(error);
    }
};

// return boolean whether a film is in the user's watchlist
// frontend can indicate to the user
// TODO: I dont think this is a good implementation
exports.filmInWatchlist = async (req, res, next) => {
    const userID = req.user.id;
    const tmdbID = parseInt(req.params.tmdbid, 10);
    
    try {
        const exists = await watchlistService.checkIfFilmInWatchlist(userID, tmdbID);
        return res.status(200).json({ in_watchlist: exists });
    }
    catch (error) {
        next(error);
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

        return res.status(200).json({ 
            streaming: filmsStreaming, 
            unavailable: filmsUnavailable 
        });
    }
    catch (error) {
        next(error);
    }
};
