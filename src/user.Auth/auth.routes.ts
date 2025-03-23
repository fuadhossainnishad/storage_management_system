import express from "express";
import { validation } from "../middleware/validation";
import {
  forgotPasswordSchema,
  loginSchema,
  newPasswordSchema,
  signupSchema,
} from "./auth.validation";
import {
  editProfileController,
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
authRouter.post("/editProfile", validation(loginSchema), editProfileController)
export default authRouter;
