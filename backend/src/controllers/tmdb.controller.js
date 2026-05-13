import { 
    getFilmById, 
    searchForFilm, 
    getCurrentlyPopularFilms as getCurrentlyPopularFilmsService
} from '../services/tmdb/tmdb.service.js';

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
