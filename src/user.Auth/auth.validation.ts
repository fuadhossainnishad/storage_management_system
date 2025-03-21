import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Email must be a valid format",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!%?&*$])[A-Za-z\d!@!$%&*?]{6,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one number, and one special character",
      }
    ),
});

export const signupSchema = z.object({
  userName: z.string(),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Email must be a valid format",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6)
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!%?&*$])[A-Za-z\d!@!$%&*?]{6,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one number, and one special character",
      }
    ),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Email must be a valid format",
    })
    .email({ message: "Invalid email address" }),
});

export const newPasswordSchema = z.object({
  newpassword: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!$%&*])[A-Za-z\d!@$%&*?]{6,}$/,
      {
        message: "Email must be a valid format",
      }
    )
    .email({ message: "Invalid email address" }),
});
