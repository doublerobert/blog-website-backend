import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({
    default: 3000,
  }),

  SESSION_SECRET: str(),

  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),

  PGHOST: str(),
  PGDATABASE: str(),
  PGUSER: str(),
  PGPASSWORD: str(),
  PGSSLMODE: str(),
});

export default env;
