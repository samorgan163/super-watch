import { 
    NotFoundError, 
    ConflictError, 
    NotAuthenticatedError, 
    ServiceUnavailableError 
} from '../errors/customErrors.js';

export function routeNotFoundHandler(req, res, next) {
    next(new NotFoundError(`Route not found: ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
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

    if (err instanceof ServiceUnavailableError) {
        return res.status(503).json({ message: err.message });
    }
    
    // fallback for unexpected errors
    return res.status(500).json({ message: 'Unknown server error' });
}
