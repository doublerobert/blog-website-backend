import app from "./app.ts";
import env from "./config/env.ts";
import initDB from "./database/init.ts";

const { PORT } = env;

(async function() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start");
    console.error(error);
    process.exit(1)
  }
})();
