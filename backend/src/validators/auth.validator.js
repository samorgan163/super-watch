import { body } from 'express-validator';

const USERNAME_MIN_LENGTH = parseInt(process.env.USERNAME_MIN_LENGTH) || 3;
const USERNAME_MAX_LENGTH = parseInt(process.env.USERNAME_MAX_LENGTH) || 20;
const PASSWORD_MIN_LENGTH = parseInt(process.env.PASSWORD_MIN_LENGTH) || 6;
const PASSWORD_MAX_LENGTH = parseInt(process.env.PASSWORD_MAX_LENGTH) || 100;

export const registerRules = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username required')
        .bail()
        .isLength({ min: USERNAME_MIN_LENGTH, max: USERNAME_MAX_LENGTH })
        .withMessage(`Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters`)
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores')
        .bail(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password required')
        .bail()
        .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
        .withMessage(`Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`)
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
];

export const loginRules = [
    body('username')
        .trim()
        .notEmpty()
        .bail()
        .isLength({ min: USERNAME_MIN_LENGTH, max: USERNAME_MAX_LENGTH })
        .bail(),

    body('password')
        .trim()
        .notEmpty()
        .bail()
        .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH }),
];
