"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json(Object.assign({ success: false, message: error.message || "Internal Server Error" }, (error.errors && { errors: error.errors })));
};
exports.errorHandler = errorHandler;
