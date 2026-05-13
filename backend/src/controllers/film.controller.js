import * as filmService from '../services/film.service.js';

export async function getFilmById(req, res, next) {
    const userId = req.user.id;
    const filmId = req.params.tmdbId;
    try {
        const film = await filmService.getFilmById(userId, filmId);
        return res.status(200).json(film);
    }
    catch (err) {
        next(err);
    }
}
