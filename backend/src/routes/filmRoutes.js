import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.js';
import { findFilmsByTitle, getFilmByTmdbId } from '../controllers/tmdb-controller.js';

// Routes
router.get('/search', authenticateUser, findFilmsByTitle);
router.get('/:tmdbId', authenticateUser, getFilmByTmdbId);

export default router;
