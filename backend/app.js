require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// error classes
const { NotFoundError, ConflictError, NotAuthenticatedError } = require('./errors/customErrors.js');

// controllers
const authController = require('./controllers/auth-controller.js');
const userController = require('./controllers/user-controller.js');
const tmdbController = require('./controllers/tmdb-controller.js');
const watchlistController = require('./controllers/watchlist-controller.js');
const dashboardController = require('./controllers/dashboard-controller.js');

const app = express();

// Allow requests from your frontend
app.use(
  cors({
    origin: "http://192.168.0.77:5173",
    credentials: true, // only if using cookies/auth
  })
);

app.use(express.json());
app.use(cookieParser());

// middleware
const { authenticateUser } = require('./middleware/auth.js');

// connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

// --- AUTH ROUTES --- //
app.get('/auth/me', authenticateUser, authController.authMe); // check if user is authenticated for frontend
app.post('/auth/register', authController.registerUser);
app.post('/auth/login', authController.login);
app.post('/auth/logout', authController.logout);

// --- USER ROUTES --- //
app.get('/dashboard', authenticateUser, dashboardController.getDashboard);
app.get('/user/profile', authenticateUser, userController.getUserProfile);

// --- FILM ROUTES --- //
app.get('/film/search', authenticateUser, tmdbController.findFilmsByTitle);
app.get('/film/:tmdbId', authenticateUser, tmdbController.getFilmByTmdbId);

// --- WATCHLIST ROUTES --- //
app.get('/watchlist', authenticateUser, watchlistController.getWatchlist);
app.post('/watchlist/:tmdbid', authenticateUser, watchlistController.addFilmToWatchlist);
app.delete('/watchlist/:tmdbid', authenticateUser, watchlistController.removeFilmFromWatchlist);
app.get('/watchlist/check/:tmdbid', authenticateUser, watchlistController.filmInWatchlist);

// -- ERROR HANDLING MIDDLEWARE -- //
app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }

    if (err instanceof ConflictError) {
        return res.status(409).json({ message: err.message });
    }

    if (err instanceof NotAuthenticatedError) {
        return res.status(401).json({ message: err.message });
    }
    
    // fallback for unexpected errors
    return res.status(500).json({ message: 'Server error' });
});

// server startup
const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
