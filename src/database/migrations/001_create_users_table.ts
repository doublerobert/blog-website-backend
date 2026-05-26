import type { Sql } from "postgres";

export async function up(sql: Sql) {
  await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
  `;
}

export async function down(sql: Sql) {
  await sql`
      DROP TABLE IF EXISTS users
    `;
}
