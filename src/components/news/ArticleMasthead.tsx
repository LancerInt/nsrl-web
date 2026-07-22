import type { Article } from "@/content/news";
import { site } from "@/content/site";
import { pad } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RevealText } from "@/components/ui/RevealText";

/**
 * The article masthead.
 *
 * Not `PageHero`: an article opens with its own byline block rather than a lead
 * paragraph and a stat row, and the standfirst has to sit close enough to the
 * title to read as one unit. The breadcrumb position and type scale still match
 * the rest of the site.
 */
export function ArticleMasthead({
  article,
  position,
  total,
}: {
  article: Article;
  /** 1-based position in the archive, printed as the record number. */
  position: number;
  total: number;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-canvas text-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="graticule absolute inset-0 opacity-40"
          style={
            {
              "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
              "--graticule-size": "4rem",
            } as React.CSSProperties
          }
        />
      </div>

      <div className="shell relative pb-[clamp(3rem,6vw,5.5rem)] pt-[clamp(6.25rem,8vw,7.5rem)]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "News & events", href: "/news" },
            { label: article.title },
          ]}
          baseUrl={site.url}
        />

        <div className="egrid mt-6 gap-y-7">
          <div className="col-span-12 lg:col-span-9">
            <p className="label-mono flex flex-wrap items-center gap-x-4 gap-y-2">
              <span aria-hidden className="inline-block h-px w-8 shrink-0 bg-ink-900" />
              <span className="text-ink-800">{article.category}</span>
              <span aria-hidden className="h-3 w-px bg-[var(--rule)]" />
              <span className="text-neutral-550">
                Entry {pad(position)} of {pad(total)}
              </span>
            </p>

            <RevealText
              as="h1"
              trigger="mount"
              className="mt-6 font-display text-d2 text-ink-950"
            >
              {article.title}
            </RevealText>

            <p
              data-reveal
              style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
              className="measure mt-6 text-lead text-neutral-600"
            >
              {article.excerpt}
            </p>
          </div>
        </div>

        <dl
          data-reveal
          style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}
          className="mt-6 grid gap-y-8 border-t border-[var(--rule)] pt-8 sm:grid-cols-3"
        >
          <div>
            <dt className="label-mono text-neutral-550">Written by</dt>
            <dd className="mt-2 font-display text-h3 text-ink-950">{article.author}</dd>
          </div>
          <div>
            <dt className="label-mono text-neutral-550">Published</dt>
            <dd className="mt-2 font-display text-h3 text-ink-950">
              <time dateTime={article.date}>{article.dateDisplay}</time>
            </dd>
          </div>
          <div>
            <dt className="label-mono text-neutral-550">Reading time</dt>
            <dd className="mt-2 font-display text-h3 text-ink-950">
              {article.readingMinutes} min
            </dd>
          </div>
        </dl>
      </div>

      {/* The double rule that ends a report's title page. */}
      <div aria-hidden className="shell rule-double" />
    </header>
  );
}
