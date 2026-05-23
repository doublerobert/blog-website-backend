import postgres from "postgres";
import env from "./env.ts";

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = env;

const DATABASE_URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`;

const sql = postgres(DATABASE_URL, {
  ssl: "require",
});

export default sql;
