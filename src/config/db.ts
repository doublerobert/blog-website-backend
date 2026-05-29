import postgres from "postgres";
import env from "./env.ts";

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGSSLMODE } = env;

export const DATABASE_URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`;

const sql = postgres(DATABASE_URL, {
  ssl: PGSSLMODE,
  onnotice: (notice) => {
    if (notice.code && notice.code !== "42P07") {
      console.log(notice);
    }
  },
});

export default sql;
