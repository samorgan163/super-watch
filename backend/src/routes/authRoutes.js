import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.js';
import { authMe, registerUser, login, logout } from '../controllers/auth-controller.js';

// Routes
router.get('/me', authenticateUser, authMe); // check if user is authenticated for frontend
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);

export default router;
