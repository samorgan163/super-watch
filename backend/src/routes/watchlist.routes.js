import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.middleware.js';
import { tmdbIdRules } from '../validators/film.validator.js';
import { validateTmdbId } from '../middleware/validate.middleware.js';

import * as watchlistController from '../controllers/watchlist.controller.js';

// Routes
router.get('/', authenticateUser, watchlistController.getWatchlist);
router.get('/:tmdbId/status', authenticateUser, tmdbIdRules, validateTmdbId, watchlistController.isFilmInWatchlist);
router.post('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId,  watchlistController.addFilmToWatchlist);
router.delete('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId, watchlistController.removeFilmFromWatchlist);

export default router;
