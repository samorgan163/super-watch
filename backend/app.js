const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

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

// controllers
const authController = require('./controllers/auth-controller.js');
const userController = require('./controllers/user-controller.js');
const tmdbController = require('./controllers/tmdb-controller.js');
const watchlistController = require('./controllers/watchlist-controller.js');

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

// --- ROUTES ---

// --- AUTH ROUTES --- //
app.get('/auth/me', authenticateUser, authController.authMe); // check if user is authenticated for frontend
app.post('/auth/register', authController.registerUser);
app.post('/auth/login', authController.login);
app.post('/auth/logout', authController.logout);

// --- USER ROUTES --- //
app.get('/dashboard', authenticateUser, authController.getDashboard);
app.get('/user/profile', authenticateUser, userController.getUserProfile);

// --- FILM ROUTES --- //
app.get('/film/search', authenticateUser, tmdbController.findFilmsByTitle);
app.get('/film/:tmdbId', authenticateUser, tmdbController.getFilmByTmdbId);

// --- WATCHLIST ROUTES --- //
app.get('/watchlist', authenticateUser, watchlistController.getWatchlist);
app.post('/watchlist', authenticateUser, watchlistController.addFilmToWatchlist);
app.delete('/watchlist/:tmdbid', authenticateUser, watchlistController.removeFilmFromWatchlist);
app.get('/watchlist/check/:tmdbid', authenticateUser, watchlistController.filmInWatchlist);

// server startup
const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
