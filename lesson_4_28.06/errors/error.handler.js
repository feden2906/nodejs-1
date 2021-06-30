class ErrorHandler extends Error {
    constructor(status, message, customCode) {
        super(message);
        this.massage = message;
        this.status = status;
        this.customCode = customCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
