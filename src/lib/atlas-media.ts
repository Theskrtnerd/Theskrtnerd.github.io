import { NextResponse, type NextRequest } from "next/server";
import { atlasMedia } from "./atlas-collection";
import type { AtlasAudience } from "@/components/atlas/data";

export function atlasMediaResponse(request: NextRequest, filename: string, audience: AtlasAudience) {
  const headers: Record<string, string> = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
  try {
    const media = atlasMedia(filename, audience);
    if (!media) return new NextResponse("Not found", { status: 404, headers });
    const { bytes, mime } = media;
    headers["Content-Type"] = mime; headers["Accept-Ranges"] = "bytes";
    const range = request.headers.get("range");
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      const start = match?.[1] ? Number(match[1]) : Math.max(0, bytes.length - Number(match?.[2]));
      const end = match?.[1] && match[2] ? Math.min(bytes.length - 1, Number(match[2])) : bytes.length - 1;
      if (!match || (!match[1] && !match[2]) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= bytes.length || start > end) {
        return new NextResponse(null, { status: 416, headers: { ...headers, "Content-Range": `bytes */${bytes.length}` } });
      }
      headers["Content-Range"] = `bytes ${start}-${end}/${bytes.length}`;
      headers["Content-Length"] = String(end - start + 1);
      return new NextResponse(new Uint8Array(bytes.subarray(start, end + 1)), { status: 206, headers });
    }
    headers["Content-Length"] = String(bytes.length);
    return new NextResponse(new Uint8Array(bytes), { headers });
  } catch { return new NextResponse("Media unavailable", { status: 503, headers }); }
}
