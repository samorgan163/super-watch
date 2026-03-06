const authService = require('../services/authService.js');

// frontend can use this to verify auth status
exports.authMe = (req, res) => {
    return res.status(200).json({ user_id: req.user.id });
}

// Register new user
exports.registerUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await authService.registerUser(username, password);
        res.status(201).json({ message: 'User created' });
    } 
    catch (error) {
        next(error);
    }
}

// User login
exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const { accessToken } = await authService.loginUser(username, password);
    
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
exports.logout = (req, res) => {
    res.clearCookie('accessToken');
    res.json({ message: 'Logged out' });
};
