"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const zod_1 = require("zod");
const validation = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next({
                statusCode: 400,
                message: "validation error",
                errors: error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message,
                })),
            });
        }
        next(error);
    }
};
exports.validation = validation;
