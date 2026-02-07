const User = require('../models/user.js');

const { NotFoundError } = require('../errors/customErrors.js');

exports.getFilmsStreamingInWatchlist = async (userID) => {
    const user = await User.findById(userID)
        .populate({ 
            path: 'watchlist.film',
            match: { streaming: { $exists: true, $ne: [] } },
            select: 'tmdbid title poster streaming' // only return necessary fields
        })
        .lean();

    if (!user) {
        throw new NotFoundError('User not found');
    }

    return user.watchlist.filter(item => item.film).map(item => item.film); //filter out null films (ie not streaming) 
}

exports.getFilmsUnavailableInWatchlist = async (userID) => {
    const user = await User.findById(userID)
        .populate({
            path: 'watchlist.film',
            match: { streaming: { $size: 0 } },
            select: 'tmdbid title poster' // only return necessary fields
        })
        .lean();
    
    if (!user) {
        throw new NotFoundError('User not found');
    }

    return user.watchlist.filter(item => item.film).map(item => item.film); //filter out null films (ie streaming)
}
