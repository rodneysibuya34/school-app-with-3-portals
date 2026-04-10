import { getDatabase } from "./index";

const database = getDatabase();
if (!database) {
  console.log("SQLite database initialized automatically");
  process.exit(0);
}

console.log("Database ready");