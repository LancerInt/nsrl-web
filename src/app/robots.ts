import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/**
 * Nothing here is private, so nothing is disallowed. The one job this file has
 * is pointing crawlers at the sitemap and declaring the canonical host.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
