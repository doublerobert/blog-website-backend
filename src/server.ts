import app from "./app.ts";
import sql from "./config/db.ts";
import env from "./config/env.ts";
import migrate from "./database/migration.ts";

const { PORT } = env;

async function startServer() {
  try {
    await sql`SELECT 1`;

    console.log("Database connected")

    await migrate()

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server")
    console.error(error)
    process.exit(1)
  }
}

startServer()