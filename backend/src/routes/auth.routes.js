import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/auth.middleware.js';
import { registerRules, loginRules } from '../validators/auth.validator.js';
import { validateLogin, validateRegister } from '../middleware/validate.middleware.js';
import * as authController from '../controllers/auth.controller.js';

// Routes
router.get('/me', authenticateUser, authController.authMe); // check if user is authenticated for frontend
router.post('/register', registerRules, validateRegister, authController.register);
router.post('/login', loginRules, validateLogin, authController.login);
router.post('/logout', authController.logout);

export default router;
