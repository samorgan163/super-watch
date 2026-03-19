import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.js';
import { authMe, registerUser, login, logout } from '../controllers/auth-controller.js';

import { registerRules, loginRules } from '../validators/authValidator.js';
import { validateLogin, validateRegister } from '../middleware/validate.js';

// Routes
router.get('/me', authenticateUser, authMe); // check if user is authenticated for frontend
router.post('/register', registerRules, validateRegister, registerUser);
router.post('/login', loginRules, validateLogin, login);
router.post('/logout', logout);

export default router;
