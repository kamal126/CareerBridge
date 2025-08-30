class ApiError extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        isOperational = true,
        stack = ''
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.errors = errors
        this.isOperational = isOperational
        this.stack = stack || Error.captureStackTrace(this, this.constructor)
    }
}

export {ApiError}