"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileController = exports.updatePasswordController = exports.forgotPasswordController = exports.userLoginController = exports.userSignupController = void 0;
const tryCatchHandler_1 = require("../middleware/tryCatchHandler");
const auth_service_1 = require("./auth.service");
const otp_1 = require("../lib/otp");
const resetCode_1 = __importDefault(require("../model/resetCode"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
exports.userSignupController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const signup = yield (0, auth_service_1.signupUserService)(userName, email, password);
    return res.status(200).json(signup);
}));
exports.userLoginController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const finduser = yield (0, auth_service_1.findUserService)({ email });
    if (!finduser) {
        return res.status(400).json({ message: "user not found" });
    }
    const isMatch = yield finduser.comparePasswords(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Password wrong" });
    }
    return res.status(200).json({ message: "Logged in successfully" });
}));
exports.forgotPasswordController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const finduser = yield (0, auth_service_1.findUserService)({ email });
    if (!finduser) {
        return res.status(404).json({ message: "User not found" });
    }
    const code = (0, otp_1.otp)();
    yield resetCode_1.default.deleteOne({ email });
    const resetCode = new resetCode_1.default({ email, code });
    yield resetCode.save();
    const subject = "Password Reset Verification Code";
    const text = `Your verification code is: ${code}. It expires in 10 minutes.`;
    const sendCode = yield (0, sendMail_1.default)(email, subject, text);
    if (!sendCode) {
        return res.status(500).json({ message: "Failed to send email" });
    }
    return res.status(200).json({ message: "Code sent successfully" });
}));
exports.updatePasswordController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newpassword } = req.body;
    const updatePass = yield (0, auth_service_1.updatePasswordService)({ newpassword, email });
    return res.status(200).json({ message: "password updated successfully" });
}));
exports.editProfileController = (0, tryCatchHandler_1.tryCatchHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { uerId, newUserName, email } = req.body;
    if (!uerId) {
        return res.status(404).json({ message: "User not found" });
    }
    const renameUser = yield (0, auth_service_1.editProfileService)(email, newUserName);
    if (!renameUser) {
        return res.status(404).json({ message: "user name doesn't changed" });
    }
    return res.status(200).json({ message: "Profile updated successfully" });
}));
