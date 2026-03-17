import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/customErrors.js';

export function validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return next(new ValidationError('Validation failed', { errors: formattedErrors }));
    }

    next();
}
