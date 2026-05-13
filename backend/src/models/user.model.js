import db from '../config/db.js';

// returns bool whether user exists
export async function exists(username, connection = db) {
	const [rows] = await connection.query(`
		SELECT 1
		FROM users
		WHERE username = ?
	`, [username]);

	return rows.length > 0;
}

// get user by username
export async function getAuthUserByUsername(username, connection = db) {
    const [rows] = await connection.query(`
		SELECT id, username, password_hash
		FROM users
		WHERE username = ?
	`, [username]);

    return rows[0];
}

export async function getProfileUserById(id, connection = db) {
	const [rows] = await connection.query(`
		SELECT username
		FROM users
		WHERE id = ?
	`, [id]);

	return rows[0];
}

// adds new user to database, returns the new users id
export async function insertUser({ username, passwordHash }, connection = db) {
	const [result] = await connection.query(`
		INSERT INTO users (username, password_hash)
		VALUES (? , ?)
	`, [username, passwordHash]);

	return result.insertId;
}
