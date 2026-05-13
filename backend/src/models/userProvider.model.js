import db from '../config/db.js';

// returns array of all user's providers
export async function getUserProviderIds(userId, connection = db) {
    const [rows] = await connection.query(`
        SELECT provider_id
        FROM user_providers
        WHERE user_id = ?
    `, [userId]);

    return rows.map(provider => provider.provider_id);
}
