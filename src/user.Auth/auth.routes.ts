import express from "express";
import { validation } from "../middleware/validation";
import {
  forgotPasswordSchema,
  loginSchema,
  newPasswordSchema,
  signupSchema,
} from "./auth.validation";
import {
  forgotPasswordController,
  updatePasswordController,
  userLoginController,
  userSignupController,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", validation(signupSchema), userSignupController);
authRouter.post("/login", validation(loginSchema), userLoginController);
authRouter.post(
  "/forgotPassword",
  validation(forgotPasswordSchema),
  forgotPasswordController
);
authRouter.post(
  "/updatepassword",
  validation(newPasswordSchema),
  updatePasswordController
);
export default authRouter;
