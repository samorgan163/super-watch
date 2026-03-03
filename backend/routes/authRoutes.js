const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/auth');

const authController = require('../controllers/auth-controller');

// Routes
router.get('/me', authenticateUser, authController.authMe); // check if user is authenticated for frontend
router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
