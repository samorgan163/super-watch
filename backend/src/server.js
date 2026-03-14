import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to database');

        app.listen(parseInt(process.env.PORT) || 5000, '0.0.0.0', () => {
            console.log(`Server listening on port: ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });
