import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.js';
import { authMe, registerUser, login, logout } from '../controllers/auth-controller.js';

import { registerRules, loginRules } from '../validators/authValidator.js';
import { validate } from '../middleware/validate.js';

// Routes
router.get('/me', authenticateUser, authMe); // check if user is authenticated for frontend
router.post('/register', registerRules, validate, registerUser);
router.post('/login', loginRules, validate, login);
router.post('/logout', logout);

export default router;
