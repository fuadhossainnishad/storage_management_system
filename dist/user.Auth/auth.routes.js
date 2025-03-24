"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middleware/validation");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const authRouter = express_1.default.Router();
authRouter.post("/signup", (0, validation_1.validation)(auth_validation_1.signupSchema), auth_controller_1.userSignupController);
authRouter.post("/login", (0, validation_1.validation)(auth_validation_1.loginSchema), auth_controller_1.userLoginController);
authRouter.post("/forgotPassword", (0, validation_1.validation)(auth_validation_1.forgotPasswordSchema), auth_controller_1.forgotPasswordController);
authRouter.patch("/updatepassword", (0, validation_1.validation)(auth_validation_1.newPasswordSchema), auth_controller_1.updatePasswordController);
authRouter.patch("/editProfile", (0, validation_1.validation)(auth_validation_1.editProfileSchema), auth_controller_1.editProfileController);
exports.default = authRouter;
