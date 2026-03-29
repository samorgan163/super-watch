import { loginUser, registerUser as registerUserService, } from '../services/auth.service.js';

// frontend can use this to verify auth status
export function authMe(req, res) {
    return res.status(200).json({ user_id: req.user.id });
}

// Register new user
export async function registerUser(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await registerUserService(username, password);
        res.status(201).json({ message: 'User created' });
    } 
    catch (error) {
        next(error);
    }
}

// User login
export async function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const { accessToken } = await loginUser(username, password);
    
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({ message: 'Login successful.' });        
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
