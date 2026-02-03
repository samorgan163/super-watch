const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : '15m' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
};

// Register new user
exports.registerUser = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username: req.body.username });
        
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = User.create({
            username: req.body.username,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created' });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error creating user' });
        console.log(error);
    }
}

// User login
exports.login = async (req, res) => {
    try {
        // find user by username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: 'Username does not match.' });
        }

        // compare password with stored hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: 'Password does not match.' });
        }

        // generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
            
        // TODO: make tokens secure
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Login successful.' });        
    }
    catch (error) {
        res.status(500).json({ message: 'Error during login' });
        console.log(error);
    }
}

/*
exports.refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: 'No refresh token' });
    }
}

*/

exports.getDashboard = async (req, res) => {
    try {
        const username = await User.findById(req.user.id).select('username');
        res.status(200).json({ username: username});
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}