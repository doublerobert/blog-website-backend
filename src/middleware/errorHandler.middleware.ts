import type { Request, Response, NextFunction } from "express";
import { isHttpError } from "http-errors";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorMessage = "Internal server error";
  let statusCode = 500;
  let errors: unknown[] = [];

  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;

    if (error.errors) {
      errors = error.errors;
    }
  }

  if (statusCode >= 500) {
    console.error(error);
  }
  res
    .status(statusCode)
    .json({ success: false, message: errorMessage, errors });
};
