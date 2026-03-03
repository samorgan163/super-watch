const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/auth');

const userController = require('../controllers/user-controller');
const dashboardController = require('../controllers/dashboard-controller');

// Routes
router.get('/dashboard', authenticateUser, dashboardController.getDashboard);
router.get('/profile', authenticateUser, userController.getUserProfile);

module.exports = router;
