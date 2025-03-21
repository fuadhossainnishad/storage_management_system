import { NextFunction, Request, Response } from "express";

export const tryCatchHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  };
