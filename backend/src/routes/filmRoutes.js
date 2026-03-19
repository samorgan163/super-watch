import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.js';
import { findFilmsByTitle, getFilmByTmdbId } from '../controllers/tmdb-controller.js';

import { searchFilmRules, tmdbIdRules } from '../validators/filmValidator.js';
import { validateTmdbId, validateSearchFilm } from '../middleware/validate.js';

// Routes
router.get('/search', authenticateUser, searchFilmRules, validateSearchFilm, findFilmsByTitle);
router.get('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId, getFilmByTmdbId);

export default router;
