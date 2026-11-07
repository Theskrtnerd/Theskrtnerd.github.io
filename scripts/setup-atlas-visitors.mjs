import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) throw new Error("Set DATABASE_URL before initializing visitor storage.");
const sql = neon(url);
await sql`CREATE TABLE IF NOT EXISTS atlas_visitors (
  counter text NOT NULL,
  visitor_hash char(64) NOT NULL,
  PRIMARY KEY (counter, visitor_hash)
)`;
console.log("Atlas visitor storage is ready.");
