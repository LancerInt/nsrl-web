import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root. Without this Next walks up and finds an unrelated
  // package-lock.json in the user profile directory, and infers the wrong root.
  turbopack: {
    root: __dirname,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
