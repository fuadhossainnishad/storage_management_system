import express from "express";
import { validation } from "../middleware/validation";
import {
  editProfileSchema,
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
authRouter.patch(
  "/updatepassword",
  validation(newPasswordSchema),
  updatePasswordController
);
authRouter.patch("/editProfile", validation(editProfileSchema), editProfileController)
export default authRouter;
