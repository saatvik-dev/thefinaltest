import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/db");
export const db = drizzle(sql);
