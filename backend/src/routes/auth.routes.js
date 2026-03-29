import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.middleware.js';
import { authMe, registerUser, login, logout } from '../controllers/auth.controller.js';

import { registerRules, loginRules } from '../validators/auth.validator.js';
import { validateLogin, validateRegister } from '../middleware/validate.middleware.js';

// Routes
router.get('/me', authenticateUser, authMe); // check if user is authenticated for frontend
router.post('/register', registerRules, validateRegister, registerUser);
router.post('/login', loginRules, validateLogin, login);
router.post('/logout', logout);

export default router;
