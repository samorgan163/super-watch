import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.js';
import { 
    getWatchlist, 
    addFilmToWatchlist, 
    removeFilmFromWatchlist, 
    filmInWatchlist 
} from '../controllers/watchlist-controller.js';
import { tmdbIdRules } from '../validators/filmValidator.js';
import { validateTmdbId } from '../middleware/validate.js';

// Routes
router.get('/', authenticateUser, getWatchlist);
router.post('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId,  addFilmToWatchlist);
router.delete('/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId, removeFilmFromWatchlist);
router.get('/check/:tmdbId', authenticateUser, tmdbIdRules, validateTmdbId, filmInWatchlist);

export default router;
