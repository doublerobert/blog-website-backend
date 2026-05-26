import express from "express";
import type { Request, Response, NextFunction } from "express";
import testRoute from "./routes/test.ts";
import usersRoute from "./routes/users.ts";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/", testRoute);
app.use("/users", usersRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "Internal server error";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  res.status(statusCode).json({ success: false, error: errorMessage });
});

export default app;
