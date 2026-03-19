import { param, query } from 'express-validator';

export const tmdbIdRules = [
    param('tmdbId')
        .isInt({ min: 1, max: 10000000 })
        .toInt()
];

export const searchFilmRules = [
    query('title')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 150 })
        .withMessage('Invalid title'),

    query('page')
        .optional()
        .isInt({ min: 1, max: 1000 })
        .toInt()
        .withMessage('Invalid page number')
];
