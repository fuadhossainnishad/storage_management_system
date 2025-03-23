"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPasswordSchema = exports.forgotPasswordSchema = exports.signupSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: "Email must be a valid format",
    })
        .email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6)
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!%?&*$])[A-Za-z\d!@!$%&*?]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one number, and one special character",
    }),
});
exports.signupSchema = zod_1.z.object({
    userName: zod_1.z.string(),
    email: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: "Email must be a valid format",
    })
        .email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6)
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!%?&*$])[A-Za-z\d!@!$%&*?]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one number, and one special character",
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: "Email must be a valid format",
    })
        .email({ message: "Invalid email address" }),
});
exports.newPasswordSchema = zod_1.z.object({
    newpassword: zod_1.z
        .string()
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!$%&*])[A-Za-z\d!@$%&*?]{6,}$/, {
        message: "Email must be a valid format",
    })
        .email({ message: "Invalid email address" }),
});
