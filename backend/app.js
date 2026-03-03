// Requirements
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// Import error handlers
const { errorHandler, routeNotFoundHandler } = require('./middleware/errorHandler.js');

// Import Routes
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const filmRoutes = require('./routes/filmRoutes.js');
const watchlistRoutes = require('./routes/watchlistRoutes.js');

// Cors Settings
const corsSettings = {
    origin: process.env.FRONT_END_URL,
    credentials: true,
};

// Rate limit settings
const rateLimitSettings = {
    windowMs: 2000,
    limit: 2,
    message: 'Rate limit exceeded',
};

// Connect to database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

// Server setup
const app = express();
app.use(cors(corsSettings));
//app.use(rateLimit(rateLimitSettings));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/film', filmRoutes);
app.use('/watchlist', watchlistRoutes);

// Route not found handler
app.use(routeNotFoundHandler);

// Error handler
app.use(errorHandler);

// Server startup
const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
});
