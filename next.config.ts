import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingIncludes: { "/api/atlas/**": ["./public/atlas/*.enc"] },
  async headers() {
    const headers = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }];
    return [
      { source: "/atlas/:path*", headers },
      { source: "/api/atlas/:path*", headers },
    ];
  },
};

export default nextConfig;
