import * as watchlistService from '../services/watchlist.service.js';

/**
 * Adds a film to the user's watchlist.
 * A local copy of the film is created if it doesn't already exist in the database, using data from TMDB.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function addFilmToWatchlist(req, res, next) {
    const userId = req.user.id;
    const tmdbId = req.params.tmdbId;

    try {
        await watchlistService.addFilmToWatchlist(userId, tmdbId);
        return res.status(201).json({ message: 'Film added to watchlist' });
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
export async function removeFilmFromWatchlist(req, res, next) {
    const userId = req.user.id;
    const tmdbId = req.params.tmdbId;
    
    try {
        await watchlistService.removeFilmFromWatchlist(userId, tmdbId);
        return res.status(200).json({ message: 'Film removed from watchlist' });
    }
    catch (error) {
        next(error);
    }
};

// return boolean whether a film is in the user's watchlist
// frontend can indicate to the user
// TODO: I dont think this is a good implementation
export async function isFilmInWatchlist(req, res, next) {
    const userID = req.user.id;
    const tmdbID = parseInt(req.params.tmdbId, 10);
    
    try {
        const exists = await watchlistService.isFilmInWatchlist(userID, tmdbID);
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
export async function getWatchlist(req, res, next) {
    const userId = req.user.id
    try {
        const watchlist = await watchlistService.getAllWatchlistFilms(userId);

        return res.status(200).json(watchlist);
    }
    catch (error) {
        next(error);
    }
};
