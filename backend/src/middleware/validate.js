import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/customErrors.js';

export function validateRegister(req, res, next) {
    const errors = validationResult(req);

    // send errors for user guidance
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));

        return next(new ValidationError('Validation failed', { errors: formattedErrors }));
    }

    next();
}

export function validateLogin(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new ValidationError('Username or password invalid'));
    }

    next();
}

export function validateTmdbId(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new ValidationError('TMDB ID must be a valid integer'));
    }

    next();
}

export function validateSearchFilm(req, res, next) {
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
