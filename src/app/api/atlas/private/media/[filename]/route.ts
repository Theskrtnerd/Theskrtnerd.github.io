import { NextResponse, type NextRequest } from "next/server";
import { atlasCookie, validSession } from "@/lib/atlas-auth";
import { atlasMediaResponse } from "@/lib/atlas-media";

export const runtime = "nodejs";
export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  if (!validSession(request.cookies.get(atlasCookie)?.value)) return new NextResponse("Password required", { status: 401, headers: { "Cache-Control": "private, no-store" } });
  return atlasMediaResponse(request, (await params).filename, "private");
}
