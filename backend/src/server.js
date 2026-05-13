import app from './app.js';
import db from './config/db.js';

async function startServer() {
    try {
        // test db connection
        await db.query('SELECT 1');
        console.log('Connected to database');

        app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
            console.log(`Server listening on port: ${process.env.PORT || 5000}`);
        })
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

startServer();
