import jwt from 'jsonwebtoken';
import { NotAuthenticatedError } from '../errors/customErrors.js';

export function authenticateUser(req, res, next) {
    const token = req.cookies?.accessToken;
    
    if (!token) {
        return next(new NotAuthenticatedError('Unauthorised.'));
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = { id: payload.userID };
        next();
    }
    catch (error) {
        return next(new NotAuthenticatedError('Unauthorised.'));
    }
}
