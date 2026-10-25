import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Encrypted storage is read by the server; browsers use the scoped media APIs.
  if (request.nextUrl.pathname.endsWith(".enc")) {
    return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow, noimageindex" } });
  }
  return NextResponse.next();
}
export const config = { matcher: "/atlas/:path*" };
