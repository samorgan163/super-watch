import 'dotenv/config';
import db from "./config/db.js";

async function testConnection() {
  try {
    const result = await db.query(`
      INSERT INTO users (username, password_hash)
      VALUES (? , ?)
    `, ['testuser', 'testhash']);
    console.log("Query result:", result);
    await db.end();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

testConnection();
