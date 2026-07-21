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
    <header
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep text-ink-50"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="graticule absolute inset-0 opacity-70"
          style={
            {
              "--graticule-color": "rgba(255,255,255,0.03)",
              "--graticule-size": "4rem",
            } as React.CSSProperties
          }
        />
        <div
          className="absolute left-[-14rem] top-[-10rem] h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-ink-500) 50%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="shell relative pb-[clamp(3rem,6vw,5.5rem)] pt-[clamp(8rem,13vw,12rem)]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "News & events", href: "/news" },
            { label: article.title },
          ]}
          tone="deep"
          baseUrl={site.url}
        />

        <div className="egrid mt-12 gap-y-10">
          <div className="col-span-12 lg:col-span-9">
            <p className="label-mono flex flex-wrap items-center gap-x-4 gap-y-2">
              <span aria-hidden className="inline-block h-px w-8 shrink-0 bg-signal-400" />
              <span className="text-signal-400">{article.category}</span>
              <span aria-hidden className="h-3 w-px bg-white/20" />
              <span className="text-ink-200">
                Entry {pad(position)} of {pad(total)}
              </span>
            </p>

            <RevealText
              as="h1"
              trigger="mount"
              className="mt-8 font-display text-d2 text-white"
            >
              {article.title}
            </RevealText>

            <p
              data-reveal
              style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
              className="measure mt-9 text-lead text-ink-200"
            >
              {article.excerpt}
            </p>
          </div>
        </div>

        <dl
          data-reveal
          style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}
          className="mt-14 grid gap-y-8 border-t border-white/12 pt-8 sm:grid-cols-3"
        >
          <div>
            <dt className="label-mono text-ink-200">Written by</dt>
            <dd className="mt-2 font-display text-h3 text-white">{article.author}</dd>
          </div>
          <div>
            <dt className="label-mono text-ink-200">Published</dt>
            <dd className="mt-2 font-display text-h3 text-white">
              <time dateTime={article.date}>{article.dateDisplay}</time>
            </dd>
          </div>
          <div>
            <dt className="label-mono text-ink-200">Reading time</dt>
            <dd className="mt-2 font-display text-h3 text-white">
              {article.readingMinutes} min
            </dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
