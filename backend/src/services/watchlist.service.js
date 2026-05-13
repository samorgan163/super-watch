import * as watchlistModel from '../models/watchlist.model.js';

import * as tmdbService from '../services/tmdb/tmdb.service.js';
import * as filmService from '../services/film.service.js';

import db from '../config/db.js';

import { 
    NotAuthenticatedError, 
    ConflictError,
    NotFoundError
} from '../errors/customErrors.js';

// add film to watchlist
// stores a local copy in db or finds it
// user is already authed so it's assumed user always exists,
// db fk constaint as fallback
export async function addFilmToWatchlist(userId, tmdbId) {

    // ensure film cached locally, if not already
    await filmService.ensureFilmCached(tmdbId);

    // add to users watchlist
    const result = await watchlistModel.insert({
        userId: userId,
        filmId: tmdbId
    });

    // throw error if film already in watchlist
    if (result.affectedRows === 0) {
        throw new ConflictError('Film already in watchlist');
    }
}

export async function removeFilmFromWatchlist(userId, tmdbId) {
    // remove from watchlist
    // dont need to check if film exists in local cache,
    // being removed from watchlist anyway
    const result = await watchlistModel.remove({
        userId: userId,
        filmId: tmdbId 
    });

    // throw error if film not in watchlist
    if (result.affectedRows === 0) {
        throw new NotFoundError('Film not in watchlist.');
    }
}

export async function isFilmInWatchlist(userId, tmdbId) {
    return await watchlistModel.exists({
        userId: userId,
        filmId: tmdbId
    });
}

export async function getStreamingWatchlistFilms(userId) {
    return await watchlistModel.getStreamingWatchlistFilms(userId);
}

export async function getAllWatchlistFilms(userId) {
    return await watchlistModel.getAllWatchlistFilms(userId);
}
