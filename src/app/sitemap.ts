import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { disciplines } from "@/content/disciplines";
import { industries } from "@/content/industries";
import { articles } from "@/content/news";

/**
 * Every URL the site serves, derived from the same typed content modules the
 * pages render from. Adding a discipline, an industry or an article extends the
 * sitemap with no edit here — which is the only way a sitemap stays truthful.
 *
 * `archiveRecords` is deliberately not imported: those entries are listed on
 * /news but have no page, so emitting a URL for one would advertise a 404.
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
    entry("/news", 0.8, "weekly"),
    entry("/careers", 0.8, "weekly"),
    entry("/contact", 0.8, "yearly"),
  ];

  /* Detail pages, generated from content. */
  const disciplinePages: MetadataRoute.Sitemap = disciplines.map((discipline) =>
    entry(`/research/${discipline.slug}`, 0.6, "monthly"),
  );

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) =>
    entry(`/services/${industry.slug}`, 0.6, "monthly"),
  );

  const articlePages: MetadataRoute.Sitemap = articles.map((article) =>
    entry(`/news/${article.slug}`, 0.6, "yearly"),
  );

  return [...home, ...indexes, ...disciplinePages, ...industryPages, ...articlePages];
}
