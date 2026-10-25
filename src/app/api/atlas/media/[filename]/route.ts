import type { NextRequest } from "next/server";
import { atlasMediaResponse } from "@/lib/atlas-media";

export const runtime = "nodejs";
export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  return atlasMediaResponse(request, (await params).filename, "public");
}
