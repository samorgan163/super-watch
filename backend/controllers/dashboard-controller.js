const watchlistService = require('../services/watchlistService.js');

exports.getDashboard = async (req, res, next) => {
    const userID = req.user.id;
    try {
        const streamingWatchlist = await watchlistService.getFilmsStreamingInWatchlist(userID);
        return res.status(200).json({ streaming_watchlist: streamingWatchlist });
    }
    catch (error) {
        next(error);
    }
};
