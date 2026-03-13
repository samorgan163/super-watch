import { 
    getFilmById, 
    searchForFilm, 
    getCurrentlyPopularFilms as getCurrentlyPopularFilmsService
} from '../services/tmdb/tmdbService.js';

// get film by tmdb id
export async function getFilmByTmdbId(req, res, next) {
    const tmdbID = req.params.tmdbId;
    try {
        const film = await getFilmById(tmdbID);
        return res.status(200).json(film);
    }
    catch (err) {
        next(err);
    }
};

// find films by title
export async function findFilmsByTitle(req, res, next) {
    const { title, page } = req.query;
    try {
        const results = await searchForFilm(title, page);
        return res.status(200).json(results);
    }
    catch (err) {
        next(err);
    }
};

export async function getCurrentlyPopularFilms(req, res, next) {
    const { page } = req.query;
    try {        
        const results = await getCurrentlyPopularFilmsService(page);
        return res.status(200).json(results);
    }
    catch (err) {
        next(err);
    }
};
