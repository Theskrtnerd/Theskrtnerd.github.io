import { NextResponse, type NextRequest } from "next/server";
import { recordVisitor, validVisitorId, visitorCookie, visitorCount, visitorMaxAge } from "@/lib/atlas-visitors";

const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };

export async function GET() {
  try {
    return NextResponse.json({ count: await visitorCount() }, { headers });
  } catch {
    return NextResponse.json({ error: "Visitor count unavailable" }, { status: 503, headers });
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403, headers });
  }
  let id: unknown;
  try {
    const body = await request.text();
    if (body.length > 512) throw new Error("Request too large");
    const supplied = JSON.parse(body)?.visitorId;
    const existing = request.cookies.get(visitorCookie)?.value;
    id = validVisitorId(existing) ? existing : supplied;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers });
  }
  if (!validVisitorId(id)) {
    return NextResponse.json({ error: "Invalid visitor ID" }, { status: 400, headers });
  }
  try {
    // Preview deployments must not increase the production counter.
    const count = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
      ? await visitorCount()
      : await recordVisitor(id);
    const response = NextResponse.json({ count }, { headers });
    response.cookies.set(visitorCookie, id, {
      secure: request.nextUrl.protocol === "https:", sameSite: "lax", path: "/", maxAge: visitorMaxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Visitor count unavailable" }, { status: 503, headers });
  }
}
