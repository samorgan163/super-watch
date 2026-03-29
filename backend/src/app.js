// Requirements
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import cron from 'node-cron';

// Import error handlers
import { 
    errorHandler, 
    routeNotFoundHandler,
    rateLimitExceededHandler
} from './middleware/error.middleware.js';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import filmRoutes from './routes/film.routes.js';
import watchlistRoutes from './routes/watchlist.routes.js';

// Import cron jobs
import { watchlistUpdater } from './jobs/watchlistUpdater.js';

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
app.use(cors(corsSettings));
app.use(rateLimit(rateLimitSettings));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// cron jobs
cron.schedule('50 17 * * *', () => {
    watchlistUpdater();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/film', filmRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Route not found handler
app.use(routeNotFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
