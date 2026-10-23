import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { disciplines } from "@/content/disciplines";
import { industries } from "@/content/industries";

/**
 * Every URL the site serves, derived from the same typed content modules the
 * pages render from. Adding a discipline or an industry extends the sitemap
 * with no edit here — which is the only way a sitemap stays truthful.
 */

/** One timestamp for the whole build, so entries never disagree with each other. */
const builtAt = new Date();

type Entry = MetadataRoute.Sitemap[number];

const entry = (
  path: string,
  priority: number,
  changeFrequency: NonNullable<Entry["changeFrequency"]>,
): Entry => ({
  url: `${site.url}${path}`,
  lastModified: builtAt,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  /* Landing page. */
  const home: MetadataRoute.Sitemap = [entry("/", 1, "monthly")];

  /* Section indexes — the pages navigation points at. */
  const indexes: MetadataRoute.Sitemap = [
    entry("/about", 0.8, "monthly"),
    entry("/research", 0.8, "monthly"),
    entry("/facilities", 0.8, "monthly"),
    entry("/services", 0.8, "monthly"),
    entry("/products", 0.8, "monthly"),
    entry("/downloads", 0.8, "monthly"),
    entry("/contact", 0.8, "yearly"),
  ];

  /* Detail pages, generated from content. */
  const disciplinePages: MetadataRoute.Sitemap = disciplines.map((discipline) =>
    entry(`/research/${discipline.slug}`, 0.6, "monthly"),
  );

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) =>
    entry(`/services/${industry.slug}`, 0.6, "monthly"),
  );

  return [...home, ...indexes, ...disciplinePages, ...industryPages];
}
