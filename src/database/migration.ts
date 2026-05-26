import path from "path";
import fs from "fs/promises";
import sql from "../config/db.ts";
import { pathToFileURL } from "url";

const migrationDir = path.join(process.cwd(), "src/database/migrations");
// console.log(migrationDir);

export default async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    )
  `;

  const fileNames = (await fs.readdir(migrationDir))
    .filter((file) => file.endsWith(".ts"))
    .sort();
  // console.log(fileNames);

  const executedMigrations = await sql`
    SELECT * FROM migrations
  `;

  const executedFileNames = executedMigrations.map(
    (migration) => migration.filename,
  );

  const pendingMigrations = fileNames.filter(
    (fileName) => !executedFileNames.includes(fileName),
  );

  if (pendingMigrations.length === 0) {
    console.log("No Migration To Run");
    return;
  }

  for (const migrationName of pendingMigrations) {
    console.log(`Running migration: ${migrationName}`);

    const filePath = path.join(migrationDir, migrationName);
    const migration = await import(pathToFileURL(filePath).href);

    await migration.up(sql);

    await sql`
      INSERT INTO migrations (filename)
      VALUES (${migrationName})
    `;
    console.log(`Migration completed: ${migrationName}`);
  }
  console.log("Migrations completed");
}

// migrate()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.log("Migration failed: ", error);
//     process.exit(1);
//   });
