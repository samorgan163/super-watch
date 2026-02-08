const tmdbService = require('../services/tmdbService');

const { NotFoundError } = require('../errors/customErrors');

// get film by tmdb id
exports.getFilmByTmdbId = async (req, res, next) => {
    const tmdbId = req.params.tmdbId;
    try {
        const film = await tmdbService.getFilmById(tmdbId);
        return res.status(200).json(film);
    }
    catch (err) {
        if (err.code === 'TMDB_NOT_FOUND') {
            throw new NotFoundError('Film not found on TMDb');
        }
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
    try {        const results = await tmdbService.getCurrentlyPopularFilms(page);
        return res.status(200).json(results);
    }
    catch (err) {
        next(err);
    }
};
