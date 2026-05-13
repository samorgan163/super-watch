//import { loginUser, registerUser as registerUserService, } from '../services/auth.service.js';

import * as authService from '../services/auth.service.js';

// frontend can use this to verify auth status
export function authMe(req, res) {
    return res.status(200).json({ user_id: req.user.id });
}

// Register new user
export async function register(req, res, next) {
    const { username, password } = req.body;

    try {
        await authService.registerUser(username, password);
        res.status(201).json({ message: 'User created' });
    } 
    catch (error) {
        next(error);
    }
}

// User login
export async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const { accessToken, userId } = await authService.loginUser(username, password);
    
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({ user_id: userId });        
    }
    catch (error) {
        next(error);
    }
}

// User logout
export function logout (req, res) {
    res.clearCookie('accessToken');
    res.json({ message: 'Logged out' });
};
