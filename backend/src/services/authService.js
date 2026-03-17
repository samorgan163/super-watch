import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotAuthenticatedError, ConflictError } from '../errors/customErrors.js';

function generateToken(user, secret, expires) {
    if (!secret) throw new Error('JWT secret missing');
    
    return jwt.sign(
        { userID: user._id}, secret, { expiresIn: expires },
    )
}

export async function registerUser(username, password) {
    // Check if user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        throw new ConflictError('Username already taken');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username: username,
        password: hashedPassword
    });
}

export async function loginUser(username, password) {
    // find user by username
    const user = await User.findOne({ username: username });
    if (!user) throw new NotAuthenticatedError('Username or password invalid');

    // compare password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new NotAuthenticatedError('Username or password invalid');

    // generate access token
    const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET, '15m');

    return { accessToken };
} 
