import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.js';
import { 
    getWatchlist, 
    addFilmToWatchlist, 
    removeFilmFromWatchlist, 
    filmInWatchlist 
} from '../controllers/watchlist-controller.js';

// Routes
router.get('/', authenticateUser, getWatchlist);
router.post('/:tmdbid', authenticateUser, addFilmToWatchlist);
router.delete('/:tmdbid', authenticateUser, removeFilmFromWatchlist);
router.get('/check/:tmdbid', authenticateUser, filmInWatchlist);

export default router;
