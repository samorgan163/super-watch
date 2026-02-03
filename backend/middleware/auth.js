const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    // get access token 
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json('Not authenticated.');
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { id: payload.userId };
        next();
    }
    catch (error) {
        res.status(401).json({ nessage: 'Invalid or expired token.' });
    }
}
