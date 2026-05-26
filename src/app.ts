import express from "express";
import testRoute from "./routes/test.ts";
import authRoute from "./routes/auth.ts";
import morgan from "morgan";
import { notFoundHandler } from "./middleware/notFound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/", testRoute);
app.use("/auth", authRoute);
// app.use("/users", usersRoute);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
