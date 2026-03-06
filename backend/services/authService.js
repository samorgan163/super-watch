const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotAuthenticatedError, ConflictError } = require('../errors/customErrors.js');

function generateToken(user, secret, expires) {
    if (!secret) throw new Error('JWT secret missing');
    
    return jwt.sign(
        { userID: user._id}, secret, { expiresIn: expires },
    )
}

exports.registerUser = async (username, password) => {
    // Check if user already exists
    const existingUser = await User.findOne({ username: username });
    
    if (existingUser) {
        return next(new ConflictError('Username already taken'));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username: username,
        password: hashedPassword
    });
}

exports.loginUser = async (username, password) => {
    // find user by username
    const user = await User.findOne({ username: username });
    if (!user) throw new NotAuthenticatedError('Username invalid');

    // compare password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new NotAuthenticatedError('Password invalid');

    // generate access token
    const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, '15m');

    return { accessToken };
} 
