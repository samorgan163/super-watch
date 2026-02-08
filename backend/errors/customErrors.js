export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
};

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
};

export class NotAuthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotAuthenticatedError';
    }
};