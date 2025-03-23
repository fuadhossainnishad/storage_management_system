import { NextFunction, Request, Response, text } from "express";
import { tryCatchHandler } from "../middleware/tryCatchHandler";
import {
  editProfileService,
  findUserService,
  signupUserService,
  updatePasswordService,
} from "./auth.service";
import { otp } from "../lib/otp";
import ResetCode from "../model/resetCode";
import sendMail from "../utils/sendMail";
import { renameServices } from "../file/file.service";

export const userSignupController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, password } = req.body;
    const signup = await signupUserService(userName, email, password);
    return res.status(200).json(signup);
  }
);

export const userLoginController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const finduser = await findUserService({ email });
    if (!finduser) {
      return res.status(400).json({ message: "user not found" });
    }
    const isMatch = await finduser.comparePasswords(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password wrong" });
    }

    return res.status(200).json({ message: "Logged in successfully" });
  }
);

export const forgotPasswordController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const finduser = await findUserService({ email });
    if (!finduser) {
      return res.status(404).json({ message: "User not found" });
    }
    const code = otp();
    await ResetCode.deleteOne({ email });
    const resetCode = new ResetCode({ email, code });
    await resetCode.save();

    const subject = "Password Reset Verification Code";
    const text = `Your verification code is: ${code}. It expires in 10 minutes.`;
    const sendCode = await sendMail(email, subject, text);
    if (!sendCode) {
      return res.status(500).json({ message: "Failed to send email" });
    }
    return res.status(200).json({ message: "Code sent successfully" });
  }
);

export const updatePasswordController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, newpassword } = req.body;
    const updatePass = await updatePasswordService({ newpassword, email });
    return res.status(200).json({ message: "password updated successfully" });
  }
);

export const editProfileController = tryCatchHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { uerId, newUserName, email } = req.body
    if (!uerId) {
      return res.status(404).json({ message: "User not found" });
    }
    const renameUser = await editProfileService(email, newUserName)
    if (!renameUser) {
      return res.status(404).json({ message: "user name doesn't changed" });
    }
    return res.status(200).json({ message: "Profile updated successfully" });
  }
)