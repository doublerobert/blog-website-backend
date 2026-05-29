import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import { DATABASE_URL } from "./db.ts";
import env from "./env.ts";

const { Pool } = pg;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const pgStore = connectPgSimple(session);

export const sessionMiddleware = session({
  store: new pgStore({
    pool,
    tableName: "sessions",
    createTableIfMissing: true,
  }),

  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
