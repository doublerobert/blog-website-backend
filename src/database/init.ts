import { createUsersTables } from "./tables.ts";

export default async function initDB() {
  try {
    console.log("Connecting to Database")
    await createUsersTables();
  } catch (error) {
    console.error("Failed to establish connection: ", error);
  } finally {
    console.log("Connection established");
  }
}
