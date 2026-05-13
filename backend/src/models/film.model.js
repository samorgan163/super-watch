import db from '../config/db.js';

// adds new user to database, returns the new users id
export async function insert(
    {
        id, 
        title,
        poster_path, 
        release_date
    },
    connection = db
) {
    const [result] = await connection.query(`
        INSERT INTO films (id, title, poster_path, release_date)
        VALUES (?, ?, ?, ?)
    `, [id, title, poster_path, release_date]);

    return result.insertId;
}

export async function exists(id, connection = db) {
    const [result] = await connection.query(`
        SELECT 1
        FROM films
        WHERE id = ?
    `, [id]);

    return result.length > 0;
}
