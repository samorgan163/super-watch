import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.middleware.js';
import { 
    getWatchlist, 
    addFilmToWatchlist, 
    removeFilmFromWatchlist, 
    filmInWatchlist 
} from '../controllers/watchlist.controller.js';
import { tmdbIdRules } from '../validators/film.validator.js';
import { validateTmdbId } from '../middleware/validate.middleware.js';

// Routes
router.get('/', authenticateUser, getWatchlist);
router.post('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId,  addFilmToWatchlist);
router.delete('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId, removeFilmFromWatchlist);
router.get('/check/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId, filmInWatchlist);

export default router;
