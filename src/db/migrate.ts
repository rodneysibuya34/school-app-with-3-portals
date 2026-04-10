import { runMigrations } from "@kilocode/app-builder-db";
import { getDb } from "./index";

const database = getDb();
if (!database) {
  console.log("Database not configured - skipping migrations");
  process.exit(0);
}

await runMigrations(database, {}, { migrationsFolder: "./src/db/migrations" });
console.log("Migrations completed");