"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otp = void 0;
const otp = () => {
    return Math.floor(100000 + Math.random() * 100000).toString();
};
exports.otp = otp;
