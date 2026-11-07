import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import test from "node:test";
import { neon } from "@neondatabase/serverless";

const origin = process.env.ATLAS_TEST_URL || "http://localhost:3678";
const endpoint = `${origin}/api/atlas/visitors/`;

test("visitor API counts once across refreshes, parallel requests and cookie fallback", async () => {
  const id = randomUUID();
  const hash = createHash("sha256").update(id).digest("hex");
  const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  const post = (body, headers = {}) => fetch(endpoint, {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  try {
    const before = await fetch(endpoint);
    assert.equal(before.status, 200);
    const { count: baseline } = await before.json();
    assert.match(before.headers.get("cache-control"), /no-store/);
    assert.match(before.headers.get("x-robots-tag"), /noindex/);
    const first = await post({ visitorId: id });
    assert.equal(first.status, 200);
    assert.equal((await first.json()).count, baseline + 1);
    assert.match(first.headers.get("set-cookie"), /atlas_visitor=/);
    const cookie = first.headers.get("set-cookie").split(";")[0];
    for (const response of await Promise.all(Array.from({ length: 6 }, () => post({ visitorId: id })))) {
      assert.equal(response.status, 200);
      assert.equal((await response.json()).count, baseline + 1);
    }
    const returning = await post({ visitorId: randomUUID() }, { Cookie: cookie });
    assert.equal(returning.status, 200);
    assert.equal((await returning.json()).count, baseline + 1);
    assert.equal((await post({ visitorId: id }, { Origin: "https://other.example" })).status, 403);
    assert.equal((await post({ visitorId: "invalid" })).status, 400);
    assert.equal((await post({ visitorId: "x".repeat(600) })).status, 400);
    const final = await fetch(endpoint);
    assert.equal((await final.json()).count, baseline + 1, "GET requests never increase the total");
  } finally {
    await sql`DELETE FROM atlas_visitors WHERE counter = 'atlas' AND visitor_hash = ${hash}`;
  }
});
