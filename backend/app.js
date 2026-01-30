const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

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

app.get('/dashboard', authenticateToken, (req, res) => {
    res.json(`hello, ${req.user.username}`);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json('No token.');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json('Token has expired.');
        }
        req.user = user;
        next();
    });
} 

// server startup
const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
