import { getCurrentlyPopularFilms } from '../services/tmdb/tmdb.service.js';
import * as watchlistService from '../services/watchlist.service.js';

export async function getDashboard(req, res, next) {
    const userId = req.user.id;
    try {
        const streamingWatchlist = await watchlistService.getStreamingWatchlistFilms(userId);
        const popularFilms = await getCurrentlyPopularFilms(1);
        return res.status(200).json({ 
            streaming_watchlist: streamingWatchlist,
            popular_films: popularFilms,
        });
    }
    catch (error) {
        next(error);
    }
};
