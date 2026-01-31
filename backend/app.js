const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
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

// Register a new user
app.post('/register', userController.registerUser);

// Authenticate user
app.post('/login', userController.login);

// Example protected route
app.get('/dashboard', authenticateToken, userController.getDashboard);

function authenticateToken(req, res, next) {
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
