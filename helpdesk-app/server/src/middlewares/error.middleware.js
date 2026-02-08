import { ApiError } from '../utils/apiResponse.js';

export const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message).join(', ');
            error = new ApiError(400, message);
        } else {
            console.error("Internal Server Error:", err); // Log the original error
            const statusCode = error.statusCode || 500;
            const message = error.message || "Internal Server Error";
            error = new ApiError(statusCode, message, [], err.stack);
        }
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
    };

    return res.status(error.statusCode).json(response);
};
