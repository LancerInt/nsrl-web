import Link from "next/link";
import { ArrowRight, ArrowUpLeft } from "lucide-react";

import type { Article } from "@/content/news";
import { pad } from "@/lib/utils";
import { Section, SectionBody } from "@/components/ui/Section";

/**
 * The end of the entry: the next thing to read, and the way back to the
 * archive.
 *
 * The "next" link wraps around the published notes, which is honest — it is
 * labelled as the archive rather than as a queue of unread articles. When there
 * is only one published note the caller passes `null` and the band states that
 * instead of linking the reader back to the page they are already on.
 */
export function NextArticle({
  article,
  position,
}: {
  /** `null` when this is the only note, so the band never links to itself. */
  article: Article | null;
  position: number;
}) {
  return (
    <Section tone="sunken">
      <SectionBody>
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
          <h2 className="label-mono text-neutral-550">
            {article ? "Next in the archive" : "End of the published notes"}
          </h2>
          <Link
            href="/news"
            className="label-mono group inline-flex min-h-9 items-center gap-2.5 text-neutral-550 transition-colors duration-200 hover:text-meniscus-600"
          >
            <ArrowUpLeft
              aria-hidden
              className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
            />
            All news &amp; events
          </Link>
        </div>

        {article ? (
          <Link
            href={`/news/${article.slug}`}
            className="group mt-6 grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-6 border-t border-ink-900/15 pt-9 transition-colors duration-500 hover:border-ink-900/60 lg:grid-cols-[3.5rem_minmax(0,1fr)_auto] lg:items-center"
          >
            <span
              aria-hidden
              className="label-mono tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-700"
            >
              {pad(position)}
            </span>

            <span className="block">
              <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="label-mono text-ink-700">{article.category}</span>
                <span aria-hidden className="h-3 w-px bg-ink-900/15" />
                <time dateTime={article.date} className="label-mono text-neutral-550">
                  {article.dateDisplay}
                </time>
                <span aria-hidden className="h-3 w-px bg-ink-900/15" />
                <span className="label-mono text-neutral-550">
                  {article.readingMinutes} min read
                </span>
              </span>

              <span className="mt-5 block font-display text-d4 text-ink-950 transition-colors duration-500 group-hover:text-ink-700">
                {article.title}
              </span>
            </span>

            <span
              aria-hidden
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-ink-900/15 transition-colors duration-500 group-hover:border-ink-900/60 group-hover:bg-ink-900/8"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1" />
            </span>
          </Link>
        ) : (
          <p className="mt-6 border-t border-ink-900/15 pt-9 text-lead text-neutral-600">
            This is the only note published in full. The rest of the archive is listed on the
            newsroom index.
          </p>
        )}
      </SectionBody>
    </Section>
  );
}
