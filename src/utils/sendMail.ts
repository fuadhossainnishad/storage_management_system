import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { text } from "express";

dotenv.config();

const sendMail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  const sent = await transporter.sendMail(mailOptions);
  return sent.response;
};
export default sendMail