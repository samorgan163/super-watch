import { body } from 'express-validator';

export const registerRules = [
    body('username')
        .notEmpty().withMessage('Username required'),

    body('password')
        .notEmpty().withMessage('Password required')
];

export const loginRules = [
    body('username')
        .notEmpty().withMessage('Username required'),   
    body('password')
        .notEmpty().withMessage('Password required'),
];
