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

  /*
    News & Events was withdrawn deliberately — route, components, content
    and every internal link. Nothing on the site points at /news, so these
    are only for inbound links and anything still in a search index.

    Both go to the homepage because there is no equivalent section to send
    a reader to; the notes were not folded into another page. A 410 Gone
    would tell a crawler more precisely that the article is not coming
    back, but it also gives a human following an old link a dead end, and
    the human matters more here.
  */
  async redirects() {
    return [
      { source: "/news", destination: "/", permanent: true },
      { source: "/news/:slug", destination: "/", permanent: true },
    ];
  },

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
