import { NextResponse } from "next/server";
import { atlasEntries } from "@/lib/atlas-collection";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
  try { return NextResponse.json(atlasEntries(), { headers }); }
  catch { return NextResponse.json({ error: "Collection unavailable" }, { status: 503, headers }); }
}
