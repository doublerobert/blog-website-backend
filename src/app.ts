import express from "express";
import testRoute from "./routes/test.route.ts";
import authRoute from "./routes/auth.route.ts";
import usersRoute from "./routes/users.route.ts"
import morgan from "morgan";
import { notFoundHandler } from "./middleware/notFound.middleware.ts";
import { errorHandler } from "./middleware/errorHandler.middleware.ts";
import { sessionMiddleware as session } from "./config/session.ts";
import { authorization } from "./middleware/auth.middleware.ts";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/", testRoute);
app.use("/api/v1/auth", session, authRoute);
app.use("/api/v1/users", authorization, usersRoute);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
