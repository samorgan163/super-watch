import db from '../config/db.js';

// insert streaming availability
export async function insert({ filmId, providerId }, connection = db) {
    const [result] = await connection.query(`
        INSERT IGNORE INTO film_providers (film_id, provider_id)
        VALUES (?, ?)
    `, [filmId, providerId]);

    return result;
}
