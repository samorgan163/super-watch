const User = require('../models/user.js');
const Film = require('../models/film.js');
const tmdbService = require('../services/tmdb/tmdbService.js');

const { NotFoundError, ConflictError } = require('../errors/customErrors.js');

// once database grows, this can be negated by calling 'getFilmById' directly.
// only storing a subset of data locally to reduce db size, for now.
async function createFilmObject(tmdbID) {
    const tmdbRes = await tmdbService.getFilmById(tmdbID);

    const newFilm = {
        tmdbid: tmdbRes.tmdbid,
        title: tmdbRes.title,
        release_date: tmdbRes.release_date,
        poster: tmdbRes.poster,
        streaming: tmdbRes.streaming,
    };

    return newFilm;
}

exports.addFilmToWatchlist = async (userID, tmdbID) => {
    // find or create film for local collection
    // this uses upsert to avoid duplicates
    // the checking for film and insertion if not found is done in one db call, making it atomic
    const film = await Film.findOneAndUpdate(
        { tmdbid: tmdbID },
        { $setOnInsert: await createFilmObject(tmdbID) },
        { new: true, upsert: true }
    );

    // add films to users watchlist if not already present
    const result = await User.updateOne(
        { _id: userID, 'watchlist.film': { $ne: film._id }},
        { $push: { watchlist: { film: film._id } } }
    );

    if (result.matchedCount === 0) {
        throw new NotFoundError('User not found');
    }

    // if no documents were modified, film was already in watchlist
    if (result.modifiedCount === 0) {
        throw new ConflictError('Film already in watchlist');
    }
}

exports.removeFilmFromWatchlist = async (userID, tmdbID) => {
    // find the film from local database, to get the internal _id
    const film = await Film.findOne({ tmdbid: tmdbID }).select('_id');
    if (!film) {
        throw new NotFoundError('Film not found in local database');
    }

    // remove from user's watchlist
    const result = await User.updateOne(
        { _id: userID },
        { $pull: { watchlist: { film: film._id } } }
    );

    if (result.matchedCount === 0) {
        throw new NotFoundError('User not found');
    }

    if (result.modifiedCount === 0) {
        throw new NotFoundError('Film not in watchlist');
    }
}

exports.checkIfFilmInWatchlist = async (userID, tmdbID) => {
    const film = await Film.findOne({ tmdbid: tmdbID }).select('_id');
        
    if (!film) {
        return false;
    }

    const exists = await User.exists({
        _id: userID,
        'watchlist.film': film._id,
    });

    return Boolean(exists);
}

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

    return user.watchlist
        .filter(item => item.film)
        .map(item => item.film); //filter out null films (ie not streaming) 
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

    return user.watchlist
        .filter(item => item.film)
        .map(item => item.film); //filter out null films (ie streaming)
}
