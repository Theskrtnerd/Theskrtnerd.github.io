import { NextResponse, type NextRequest } from "next/server";
import { atlasCookie, validSession } from "@/lib/atlas-auth";
import { atlasEntries } from "@/lib/atlas-collection";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function GET(request: NextRequest) {
  if (!validSession(request.cookies.get(atlasCookie)?.value)) return NextResponse.json({ error: "Password required" }, { status: 401, headers });
  try { return NextResponse.json(atlasEntries("private"), { headers }); }
  catch { return NextResponse.json({ error: "Collection unavailable" }, { status: 503, headers }); }
}
