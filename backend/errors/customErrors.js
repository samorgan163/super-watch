export class NotFoundError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'ConflictError';
    }
}

export class NotAuthenticatedError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'NotAuthenticatedError';
    }
}

export class ServiceUnavailableError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'ServiceUnavailableError';
    }
}

export class ValidationError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'ValidationError';
    }
}
