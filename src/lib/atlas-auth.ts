import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const atlasCookie = "atlas_access";
export const sessionSeconds = 24 * 60 * 60;
export function configured() { return !!process.env.ATLAS_PASSWORD && !!process.env.ATLAS_SESSION_SECRET; }
export function checkPassword(value: string) {
  if (!configured()) return false;
  return timingSafeEqual(createHash("sha256").update(value).digest(), createHash("sha256").update(process.env.ATLAS_PASSWORD!).digest());
}
function signature(payload: string) {
  return createHmac("sha256", process.env.ATLAS_SESSION_SECRET!)
    .update(process.env.ATLAS_PASSWORD!).update("\0").update(payload).digest("base64url");
}
export function createSession() {
  if (!configured()) throw new Error("Atlas access is not configured.");
  const payload = `${Math.floor(Date.now() / 1000) + sessionSeconds}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${signature(payload)}`;
}
export function validSession(value?: string) {
  if (!configured() || !value || value.length > 256) return false;
  const parts = value.split(".");
  if (parts.length !== 3 || !/^\d+$/.test(parts[0])) return false;
  const expiry = Number(parts[0]);
  const now = Math.floor(Date.now() / 1000);
  if (expiry <= now || expiry > now + sessionSeconds) return false;
  const actual = Buffer.from(parts[2], "base64url");
  const expected = Buffer.from(signature(`${parts[0]}.${parts[1]}`), "base64url");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
