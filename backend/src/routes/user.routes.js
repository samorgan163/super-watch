import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.middleware.js';
import { getDashboard } from '../controllers/dashboard.controller.js';
import { getUserProfile } from '../controllers/user.controller.js';

// Routes
router.get('/dashboard', authenticateUser, getDashboard);
router.get('/profile', authenticateUser, getUserProfile);

export default router;
