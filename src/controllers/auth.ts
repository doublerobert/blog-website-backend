import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import sql from "../config/db.ts";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (
  req,
  res,
  next,
) => {};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Missing parameters");
    }

    const existingUser = await sql`
      SELECT username, email 
      FROM users
      WHERE username = ${username}
        OR email = ${email}
  `;
    if (existingUser.length > 0) {
      throw createHttpError(409, "User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await sql`
      INSERT INTO users (
        username,
        email,
        password
      )
      VALUES (
        ${username},
        ${email},
        ${hashedPassword}
      )
      RETURNING id, username, email, created_at
    `;
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {};
export const logout: RequestHandler = async (req, res, next) => {};
