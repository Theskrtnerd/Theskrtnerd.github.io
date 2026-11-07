import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { neon } from "@neondatabase/serverless";
import { recordVisitor, validVisitorId, visitorCount } from "../src/lib/atlas-visitors.ts";
import { savedVisitor } from "../src/lib/atlas-visitor-id.ts";

test("browser identity survives reloads and falls back safely when storage is blocked", () => {
  const originals = Object.fromEntries(["document", "localStorage", "location"].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  let cookie = "";
  let blockCookie = false;
  let blockStorage = false;
  const storage = new Map();
  const fakeDocument = {
    get cookie() { if (blockCookie) throw new Error("Blocked"); return cookie; },
    set cookie(value) { if (blockCookie) throw new Error("Blocked"); cookie = value.split(";")[0]; },
  };
  Object.defineProperties(globalThis, {
    document: { configurable: true, value: fakeDocument },
    location: { configurable: true, value: { protocol: "https:" } },
    localStorage: { configurable: true, value: {
      getItem(key) { if (blockStorage) throw new Error("Blocked"); return storage.get(key) || null; },
      setItem(key, value) { if (blockStorage) throw new Error("Blocked"); storage.set(key, value); },
    } },
  });
  try {
    const id = savedVisitor();
    assert.ok(validVisitorId(id));
    for (let i = 0; i < 5; i++) assert.equal(savedVisitor(), id);
    cookie = "";
    assert.equal(savedVisitor(), id, "local storage restores a missing cookie");
    storage.clear();
    assert.equal(savedVisitor(), id, "cookie restores local storage");
    blockStorage = true;
    assert.equal(savedVisitor(), id, "cookies alone prevent duplicate counts");
    blockStorage = false;
    blockCookie = true;
    assert.equal(savedVisitor(), id, "local storage alone prevents duplicate counts");
    blockStorage = true;
    assert.equal(savedVisitor(), null, "fully blocked storage never registers a new visit");
  } finally {
    for (const [key, descriptor] of Object.entries(originals)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});

test("visitor IDs reject missing, malformed and non-random identifiers", () => {
  for (const value of [null, undefined, "", "hello", "' OR 1=1", 123]) assert.equal(validVisitorId(value), false);
  assert.equal(validVisitorId(randomUUID()), true);
});

test("persistent counter deduplicates reloads, retries, concurrent tabs and casing", async () => {
  const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  const counter = `test-${randomUUID()}`;
  const first = randomUUID();
  try {
    assert.equal(await visitorCount(counter), 0);
    assert.equal(await recordVisitor(first, counter), 1);
    assert.equal(await recordVisitor(first, counter), 1);
    await Promise.all(Array.from({ length: 8 }, () => recordVisitor(first, counter)));
    assert.equal(await recordVisitor(first.toUpperCase(), counter), 1);
    assert.equal(await visitorCount(counter), 1);
    const newcomers = Array.from({ length: 5 }, () => randomUUID());
    await Promise.all(newcomers.flatMap(id => [recordVisitor(id, counter), recordVisitor(id, counter)]));
    assert.equal(await visitorCount(counter), 6);
    await assert.rejects(recordVisitor("invalid", counter));
    assert.equal(await visitorCount(counter), 6);
  } finally {
    await sql`DELETE FROM atlas_visitors WHERE counter = ${counter}`;
  }
});
