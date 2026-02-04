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
const filmController = require('./controllers/film-controller.js');

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
// check if user has auth
app.get('/auth/me', authenticateUser, authController.authMe);
// register new user
app.post('/auth/register', authController.registerUser);
// user login
app.post('/auth/login', authController.login);
// user logout
app.post('/auth/logout', authController.logout);

// --- USER ROUTES --- //
// Example protected route
app.get('/dashboard', authenticateUser, authController.getDashboard);
app.get('/user/profile', authenticateUser, userController.getUserProfile);

// --- FILM ROUTES --- //
app.get('/film/search', authenticateUser, filmController.findFilmsByTitle);
app.get('/film/:tmdbId', authenticateUser, filmController.getFilmByTmdbId);

// server startup
const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
