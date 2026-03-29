import { 
    addFilmToWatchlist as addFilmToWatchlistService, 
    removeFilmFromWatchlist as removeFilmFromWatchlistService,
    checkIfFilmInWatchlist as checkIfFilmInWatchlistService,
    getFilmsStreamingInWatchlist as getFilmsStreamingInWatchlistService,
    getFilmsUnavailableInWatchlist as getFilmsUnavailableInWatchlistService    
} from '../services/watchlist.service.js';

/**
 * Adds a film to the user's watchlist.
 * A local copy of the film is created if it doesn't already exist in the database, using data from TMDB.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function addFilmToWatchlist(req, res, next) {
    const userID = req.user.id;
    const tmdbID = req.params.tmdbId;

    try {
        await addFilmToWatchlistService(userID, tmdbID);
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
export async function removeFilmFromWatchlist(req, res, next) {
    const userID = req.user.id;
    const tmdbID = req.params.tmdbId;
    
    try {
        await removeFilmFromWatchlistService(userID, tmdbID);
        return res.status(200).json({ message: 'Film removed from watchlist' });
    }
    catch (error) {
        next(error);
    }
};

// return boolean whether a film is in the user's watchlist
// frontend can indicate to the user
// TODO: I dont think this is a good implementation
export async function filmInWatchlist(req, res, next) {
    const userID = req.user.id;
    const tmdbID = parseInt(req.params.tmdbId, 10);
    
    try {
        const exists = await checkIfFilmInWatchlistService(userID, tmdbID);
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
    const userID = req.user.id
    try {
        const filmsStreaming = await getFilmsStreamingInWatchlistService(userID);
        const filmsUnavailable = await getFilmsUnavailableInWatchlistService(userID);

        return res.status(200).json({ 
            streaming: filmsStreaming, 
            unavailable: filmsUnavailable 
        });
    }
    catch (error) {
        next(error);
    }
};
