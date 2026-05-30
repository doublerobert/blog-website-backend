import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.ts";
import createHttpError from "http-errors";
import sql from "../config/db.ts";

export const profile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Unauthorized");
    }
    const userId = req.user.userId;

    const [user] = await sql`
    SELECT id, username, email, created_at, updated_at
    FROM users
      WHERE id = ${userId}
  `;
    if (!user) {
      throw createHttpError(500, "Something went wrong");
    }

    return res.status(200).json({
      success: true,
      message: "Get profile details successful",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
