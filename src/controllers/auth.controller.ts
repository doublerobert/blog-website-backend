import type { RequestHandler } from "express";
import createHttpError from "http-errors";
import sql from "../config/db.ts";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../config/env.ts";
import { validateLoginBody, validateSignUpBody } from "../utils/validators.ts";
import { generateTokens } from "../utils/generateTokens.ts";
import omitPassword from "../utils/omitPassword.ts";
// import type { JwtPayload } from "../middleware/auth.middleware.ts";

export interface SignUpBody {
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
  try {
    const validatedUser = validateSignUpBody(req.body);

    if (!validatedUser.success) {
      throw createHttpError(401, "Invalid credentials", {
        errors: validatedUser.errors,
      });
    }
    const { username, email, password } = validatedUser.data;

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

    const [newUser] = await sql`
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
      RETURNING id, username, email, created_at, updated_at
    `;
    if (!newUser) {
      throw createHttpError(500, "Failed to create user");
    }

    const { accessToken, refreshToken } = generateTokens(newUser.id);

    req.session.userId = newUser.id;
    req.session.refreshToken = refreshToken;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: newUser,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  try {
    const validatedUser = validateLoginBody(req.body);
    if (!validatedUser.success) {
      throw createHttpError(401, "Invalid credentials");
    }
    const { username, password } = validatedUser.data;
    const [user] = await sql`
      SELECT * FROM users
        WHERE username = ${username}
    `;
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    req.session.userId = user.id;
    req.session.refreshToken = refreshToken;

    const safeUser = omitPassword(user);

    return res.status(201).json({
      success: true,
      message: "Login successful",
      data: {
        user: safeUser,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(createHttpError(500, "Logout failed"));
    } else {
      res.clearCookie("connect.sid");
      res.status(200).json({
        success: true,
        message: "Logged out successful",
      });
    }
  });
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const sessionRefreshToken = req.session.refreshToken;
    if (!sessionRefreshToken) {
      throw createHttpError(401, "Session expired");
    }

    let payload: JwtPayload;
    try {
      payload = jwt.verify(
        sessionRefreshToken,
        env.JWT_REFRESH_SECRET,
      ) as JwtPayload;
    } catch {
      throw createHttpError(401, "Token expired");
    }

    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      env.JWT_REFRESH_SECRET,
      { expiresIn: "10m" },
    );

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};
