const jwt = require('jsonwebtoken');

const { NotAuthenticatedError } = require('../errors/customErrors.js');

exports.authenticateUser = (req, res, next) => {
    // get access token 
    const token = req.cookies.accessToken;
    
    if (!token) {
        return next(new NotAuthenticatedError('No access token provided.'));
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { id: payload.userID };
        next();
    }
    catch (error) {
        return next(new NotAuthenticatedError('Invalid access token.'));
    }
}
