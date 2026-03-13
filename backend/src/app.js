// Requirements
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Import error handlers
import { 
    errorHandler, 
    routeNotFoundHandler,
    rateLimitExceededHandler
 } from './middleware/errorHandler.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import filmRoutes from './routes/filmRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

// Cors Settings
const corsSettings = {
    origin: process.env.FRONT_END_URL,
    credentials: true,
};

// Rate limit settings
const rateLimitSettings = {
    windowMs: parseInt(process.env.REQUESTS_PERIOD_MS),
    limit: parseInt(process.env.MAX_REQUESTS),
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitExceededHandler,
};

// Server setup
const app = express();
app.disable('x-powered-by'); // Hide Express signature
app.use(helmet());
app.use(cors(corsSettings));
app.use(rateLimit(rateLimitSettings));
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

export default app;
