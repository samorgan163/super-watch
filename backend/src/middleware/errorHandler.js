import { 
    NotFoundError, 
    RateLimitExceededError,
    AppError,
} from '../errors/customErrors.js';

export function rateLimitExceededHandler(req, res, next) {
    next(new RateLimitExceededError('Rate limit exceeded'));
}

export function routeNotFoundHandler(req, res, next) {
    next(new NotFoundError(`Route not found: ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
    console.error(err);
    
    if (err instanceof AppError) {
        return res
            .status(err.statusCode)
            .json({
                success: false,
                message: err.message,
                errors: err.errors,
            });
    }
    
    // fallback for unexpected errors
    return res.status(500).json({ message: 'Unknown server error' });
}
