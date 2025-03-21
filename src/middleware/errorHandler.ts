import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
  errors?: any;
}
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    ...(error.errors && { errors: error.errors }),
  });
};
