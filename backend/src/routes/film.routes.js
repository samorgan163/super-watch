import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.middleware.js';
import { findFilmsByTitle } from '../controllers/tmdb.controller.js';

import { searchFilmRules, tmdbIdRules } from '../validators/film.validator.js';
import { validateTmdbId, validateSearchFilm } from '../middleware/validate.middleware.js';

import * as filmController from '../controllers/film.controller.js';

// Routes
router.get('/search', authenticateUser, searchFilmRules, validateSearchFilm, findFilmsByTitle);
router.get('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId, filmController.getFilmById);

export default router;
