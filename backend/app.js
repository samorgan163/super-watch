const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
const userController = require('./controllers/user-controller.js');

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

// check if user has auth
app.get('/auth/me', authenticateUser, (req, res) => {
    return res.status(200).json({ user_id: req.user.id });
});

// register new user
app.post('/register', userController.registerUser);

// user login
app.post('/login', userController.login);

// user logout
app.post('/auth/logout', userController.logout);

// Example protected route
app.get('/dashboard', authenticateUser, userController.getDashboard);

function authenticateUser(req, res, next) {
    // get access token 
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json('Not authenticated.');
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { id: payload.userId };
        next();
    }
    catch (error) {
        res.status(401).json({ nessage: 'Invalid or expired token.' });
    }
} 

// server startup
const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
