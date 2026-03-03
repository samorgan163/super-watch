const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/auth');
const watchlistController = require('../controllers/watchlist-controller');

// Routes
router.get('/', authenticateUser, watchlistController.getWatchlist);
router.post('/:tmdbid', authenticateUser, watchlistController.addFilmToWatchlist);
router.delete('/:tmdbid', authenticateUser, watchlistController.removeFilmFromWatchlist);
router.get('/check/:tmdbid', authenticateUser, watchlistController.filmInWatchlist);

module.exports = router;
