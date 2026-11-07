import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";

export const visitorCookie = "atlas_visitor";
export const visitorMaxAge = 60 * 60 * 24 * 400;

export function validVisitorId(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function database() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("Visitor storage unavailable");
  return neon(url);
}

export async function visitorCount(counter = "atlas"): Promise<number> {
  const sql = database();
  const [row] = await sql`SELECT count(*)::integer AS count FROM atlas_visitors WHERE counter = ${counter}`;
  return row.count;
}

export async function recordVisitor(id: string, counter = "atlas"): Promise<number> {
  if (!validVisitorId(id)) throw new Error("Invalid visitor ID");
  const hash = createHash("sha256").update(id.toLowerCase()).digest("hex");
  const sql = database();
  // The primary key makes retries, refreshes and concurrent requests idempotent.
  // Use a separate SELECT in the transaction so it sees the successful INSERT.
  const [, rows] = await sql.transaction([
    sql`INSERT INTO atlas_visitors (counter, visitor_hash) VALUES (${counter}, ${hash}) ON CONFLICT DO NOTHING`,
    sql`SELECT count(*)::integer AS count FROM atlas_visitors WHERE counter = ${counter}`,
  ]);
  return rows[0].count;
}
