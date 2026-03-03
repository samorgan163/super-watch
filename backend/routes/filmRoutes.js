const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/auth');

const tmdbController = require('../controllers/tmdb-controller');

// Routes
router.get('/search', authenticateUser, tmdbController.findFilmsByTitle);
router.get('/:tmdbId', authenticateUser, tmdbController.getFilmByTmdbId);

module.exports = router;
