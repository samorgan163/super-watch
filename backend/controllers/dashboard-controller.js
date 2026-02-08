const watchlistService = require('../services/watchlistService.js');
const tmdbService = require('../services/tmdbService.js');

exports.getDashboard = async (req, res, next) => {
    const userID = req.user.id;
    try {
        const streamingWatchlist = await watchlistService.getFilmsStreamingInWatchlist(userID);
        const popularFilms = await tmdbService.getCurrentlyPopularFilms(1);
        return res.status(200).json({ 
            streaming_watchlist: streamingWatchlist,
            popular_films: popularFilms,
        });
    }
    catch (error) {
        next(error);
    }
};
