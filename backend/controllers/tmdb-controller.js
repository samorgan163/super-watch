const tmdbService = require('../services/tmdb/tmdbService');
import { validationResult } from 'express-validator';

// get film by tmdb id
exports.getFilmByTmdbId = async (req, res, next) => {
    const tmdbID = req.params.tmdbId;
    try {
        const film = await tmdbService.getFilmById(tmdbID);
        return res.status(200).json(film);
    }
    catch (err) {
        next(err);
    }
};

// find films by title
exports.findFilmsByTitle = async (req, res, next) => {
    const { title, page } = req.query;
    try {
        const results = await tmdbService.searchForFilm(title, page);
        return res.status(200).json(results);
    }
    catch (err) {
        next(err);
    }
};

exports.getCurrentlyPopularFilms = async (req, res, next) => {
    const { page } = req.query;
    try {        
        const results = await tmdbService.getCurrentlyPopularFilms(page);
        return res.status(200).json(results);
    }
    catch (err) {
        next(err);
    }
};
