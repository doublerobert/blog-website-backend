import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import env from "../config/env.ts";

export interface JwtPayload {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authorization = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(createHttpError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(createHttpError(401, "Unauthorized"));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = payload;
    next();
  } catch (error) {
    // next(createHttpError(401, "Invalid or expired token", { errors: [error] }));
    next(createHttpError(401, "Invalid or expired token"));
  }
};
