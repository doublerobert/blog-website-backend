import jwt from "jsonwebtoken";
import env from "../config/env.ts";

export function generateTokens(userId: string) {
  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const accessToken = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "10m",
  });

  return { accessToken, refreshToken };
}
