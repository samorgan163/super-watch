const { NotFoundError, ConflictError, NotAuthenticatedError } = require('../errors/customErrors');

exports.routeNotFoundHandler = (req, res, next) => {
    next(new NotFoundError(`Route not found: ${req.originalUrl}`));
}

exports.errorHandler = (err, req, res, next) => {
    console.error(err);
    
    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }

    if (err instanceof ConflictError) {
        return res.status(409).json({ message: err.message });
    }

    if (err instanceof NotAuthenticatedError) {
        return res.status(401).json({ message: err.message });
    }
    
    // fallback for unexpected errors
    return res.status(500).json({ message: 'Server error' });
}