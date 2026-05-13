import db from '../config/db.js';

// add film to watchlist
export async function insert({ userId, filmId }, connection = db) {
    const [result] = await connection.query(`
        INSERT IGNORE INTO watchlist (user_id, film_id)
        VALUES (?, ?)
    `, [userId, filmId]);

    return result;
}

// remove film from watchlist
export async function remove({ userId, filmId }, connection = db) {
    const [result] = await connection.query(`
        DELETE FROM watchlist
        WHERE user_id = ? AND film_id = ?
    `, [userId, filmId]);

    return result;
}

// returns a bool for the existence of film in watchlist
export async function exists({ userId, filmId }, connection = db) {
    const [result] = await connection.query(`
        SELECT 1
        FROM watchlist
        WHERE user_id = ? AND film_id = ?
    `, [userId, filmId]);

    return result.length > 0;
}

// returns only the films from user's watchlist
// that are available on user's streaming providers
export async function getStreamingWatchlistFilms(userId, connection = db) {
    const [rows] = await connection.query(`
        SELECT
            f.id,
            f.title,
            f.poster_path,
            f.release_date,
            w.created_at,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', p.id,
                    'name', p.name,
                    'logo_path', p.logo_path 
                ) 
            ) as providers
        FROM watchlist w
        INNER JOIN films f
            ON w.film_id = f.id
        INNER JOIN film_providers fp
            ON fp.film_id = f.id
        INNER JOIN providers p
            ON p.id = fp.provider_id
        INNER JOIN user_providers up
            ON up.provider_id = p.id
            AND up.user_id = ?
        WHERE w.user_id = ?
        GROUP BY w.film_id
        ORDER BY w.film_id DESC
    `, [userId, userId]);

    return rows;
}

// returns whole user watchlist,
// with users streaming providers available for each film
// and films where no providers are available.
// ordered alphabetically, films with user providers first.
export async function getAllWatchlistFilms(userId, connection = db) {
    const [rows] = await connection.query(`
        SELECT
            f.id,
            f.title,
            f.poster_path,
            f.release_date,
            w.created_at,
            COALESCE(p.providers, JSON_ARRAY()) AS providers
        FROM watchlist w
        INNER JOIN films f
            ON f.id = w.film_id
        LEFT JOIN (
            SELECT
                fp.film_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', p.id,
                        'name', p.name,
                        'logo_path', p.logo_path
                    )
                ) AS providers
            FROM film_providers fp
            INNER JOIN providers p
                ON p.id = fp.provider_id
            INNER JOIN user_providers up
                ON up.provider_id = p.id
            WHERE up.user_id = ?
            GROUP BY fp.film_id
        ) p
            ON p.film_id = f.id
        WHERE w.user_id = ?
        ORDER BY
            (p.providers IS NULL) ASC,
            f.title ASC;
    `, [userId, userId]);

    return rows;
}
