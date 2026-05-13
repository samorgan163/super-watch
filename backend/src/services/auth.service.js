import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotAuthenticatedError, ConflictError } from '../errors/customErrors.js';
import * as userModel from '../models/user.model.js';

function generateToken(user, secret, expires) {
    if (!secret) throw new Error('JWT secret missing');
    
    return jwt.sign(
        { userID: user._id}, secret, { expiresIn: expires },
    )
}

export async function registerUser(username, password) {
    // Check if user already exists
    const existingUser = await userModel.exists(username);
    if (existingUser) {
        throw new ConflictError(
            'Username already taken', 
            { errors: [{ field: 'username', message: 'Username already taken' }] }
        );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store in db
    const userId = await userModel.insertUser({
        username: username,
        passwordHash: hashedPassword
    });
    return userId;
}

export async function loginUser(username, password) {
    // find user by username
    const user = await userModel.getAuthUserByUsername(username);
    if (!user) throw new NotAuthenticatedError('Username or password invalid');

    // compare password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) throw new NotAuthenticatedError('Username or password invalid');

    // generate access token
    const accessToken = jwt.sign(
        { userID: user.id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' },
    );

    return { 
        accessToken, 
        userId: user.id 
    };
} 
