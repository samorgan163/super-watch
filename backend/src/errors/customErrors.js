export class AppError extends Error {
    constructor(message, { statusCode = 500, errors = [], cause = null } = {}) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errors = errors;
        this.cause = cause;
    }
}

export class ValidationError extends AppError {
    constructor(message, options = {}) {
        super(message, { statusCode: 422, ...options });
    }
}

export class ConflictError extends AppError {
    constructor(message, options = {}) {
        super(message, { statusCode: 409, ...options });
    }
}

export class NotFoundError extends AppError {
    constructor(message, options = {}) {
        super(message, { statusCode: 404, ...options });
    }
}

export class NotAuthenticatedError extends AppError {
    constructor(message, options = {}) {
        super(message, { statusCode: 401, ...options });
    }
}

export class ServiceUnavailableError extends AppError {
    constructor(message, options = {}) {
        super(message, { statusCode: 503, ...options });
    }
}

export class RateLimitExceededError extends AppError {
    constructor(message, options = {}) {
        super(message, { statusCode: 429, ...options });
    }
}
