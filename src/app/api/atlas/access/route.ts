import { NextResponse, type NextRequest } from "next/server";
import { atlasCookie, checkPassword, configured, createSession, sessionSeconds } from "@/lib/atlas-auth";

const headers = { "Cache-Control": "private, no-store" };
function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403, headers });
  if (!configured()) return NextResponse.json({ error: "Access unavailable" }, { status: 503, headers });
  let value: unknown;
  try {
    const body = await request.text();
    if (body.length > 2048) return NextResponse.json({ error: "Invalid request" }, { status: 400, headers });
    value = JSON.parse(body)?.password;
  } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400, headers }); }
  if (typeof value !== "string" || value.length > 256 || !checkPassword(value)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401, headers });
  }
  const response = NextResponse.json({ ok: true }, { headers });
  response.cookies.set(atlasCookie, createSession(), { httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "strict", path: "/", maxAge: sessionSeconds });
  return response;
}
export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403, headers });
  const response = NextResponse.json({ ok: true }, { headers });
  response.cookies.set(atlasCookie, "", { httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
