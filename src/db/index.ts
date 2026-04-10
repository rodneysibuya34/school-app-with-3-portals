import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof createDatabase<typeof schema>> | null = null;

export function getDb() {
  if (dbInstance) return dbInstance;
  
  const DB_URL = process.env.DB_URL;
  const DB_TOKEN = process.env.DB_TOKEN;
  
  if (!DB_URL || !DB_TOKEN) {
    return null;
  }
  
  dbInstance = createDatabase(schema);
  return dbInstance;
}

export const db = getDb();