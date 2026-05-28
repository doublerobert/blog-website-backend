import express from "express";
import testRoute from "./routes/test.route.ts";
import authRoute from "./routes/auth.route.ts";
import usersRoute from "./routes/users.route.ts"
import morgan from "morgan";
import { notFoundHandler } from "./middleware/notFound.middleware.ts";
import { errorHandler } from "./middleware/errorHandler.middleware.ts";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/", testRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
