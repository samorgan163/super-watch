import { getFilmsStreamingInWatchlist } from '../services/watchlist.service.js';
import { getCurrentlyPopularFilms } from '../services/tmdb/tmdb.service.js';

export async function getDashboard(req, res, next) {
    const userID = req.user.id;
    try {
        const streamingWatchlist = await getFilmsStreamingInWatchlist(userID);
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
