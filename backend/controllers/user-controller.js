const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            return res.status(400).json({ message: 'Cannot find user' });
        }

        // compare password with stored hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            
            // JWT
            const accessToken = jwt.sign(
                { userId: user._id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' } // short-lived token
            );
            
            res.status(200).json({ accessToken: accessToken });
        } 
        else {
            res.status(403).json({ message: 'Login failed' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error during login' });
        console.log(error);
    }
}

//exports.getDashboard = async ()