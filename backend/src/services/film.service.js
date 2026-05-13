import * as tmdbService from '../services/tmdb/tmdb.service.js';
import * as userProviderModel from '../models/userProvider.model.js';
import * as filmModel from '../models/film.model.js';
import * as filmProviderModel from '../models/filmProvider.model.js';
import db from '../config/db.js';

// gets film from tmdb
// filters provider by user providers
export async function getFilmById(userId, filmId) {
    const film = await tmdbService.getFilmById(filmId);

    // filter providers by user providers
    const userProvidersSet = new Set(
        await userProviderModel.getUserProviderIds(userId)
    );

    film.providers = film.providers.filter(p => 
        userProvidersSet.has(p.provider_id)
    );

    return film;
}

export async function ensureFilmCached(tmdbId) {
    const exists = await filmModel.exists(tmdbId);
    if (exists) return;

    const tmdbFilm = await tmdbService.getFilmById(tmdbId);

    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        await filmModel.insert({
            id: tmdbFilm.id,
            title: tmdbFilm.title,
            poster_path: tmdbFilm.poster_path,
            release_date: tmdbFilm.release_date
        }, connection);
        //cache streaming providers
        if (tmdbFilm.providers?.length) {
            console.log(tmdbFilm.providers);
            for (const provider of tmdbFilm.providers) { //TODO: batch insert
                await filmProviderModel.insert({
                    filmId: tmdbId, 
                    providerId: provider.provider_id
                }, connection);
            }
        }

        await connection.commit();
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
}
