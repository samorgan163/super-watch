import db from '../config/db.js';

// returns array of all streaming providers
export async function getAllProviderIds(connection = db) {
    const [rows] = await connection.query(`
        SELECT id
        FROM providers
    `)

    return rows.map(row => row.id);
}

export async function update({ id, name, logo_path }, connection = db) {
    await connection.query(`
        INSERT INTO providers (id, name, logo_path)
        VALUES (?, ?, ?) AS new
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            logo_path = VALUES(logo_path)
    `, [id, name, logo_path]);
}
