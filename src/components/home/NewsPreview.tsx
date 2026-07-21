import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { archiveRecords, articles } from "@/content/news";
import { pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";

const [lead] = articles;
const totalRecords = articles.length + archiveRecords.length;

/**
 * Newsroom preview.
 *
 * Not a card grid. The archive holds one published note and one dated record
 * with no page, so the section is set the way the archive actually reads: the
 * note as a single editorial spread against a label rail, and the record listed
 * beneath it under a hairline — numbered and dated, with no link, because
 * inventing a page for it would be worse than showing the gap.
 */
export function NewsPreview() {
  return (
    <section className="relative bg-canvas-sunken py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-12">
          {/* Label rail. */}
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow index="08">Newsroom</Eyebrow>
            <h2 className="mt-8 font-display text-d3 text-ink-950">
              Notes from the laboratory.
            </h2>
            <p className="mt-7 max-w-[34ch] text-small text-neutral-600">
              Written up in full, or not written up at all. The archive is short on purpose —
              faster updates go to LinkedIn.
            </p>
            <ActionLink href="/news" variant="outline" className="mt-9">
              All news &amp; events
            </ActionLink>
          </div>

          {/* The note itself, given the whole right-hand field. */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <article data-reveal>
              <Link
                href={`/news/${lead.slug}`}
                className="group block border-t border-ink-900/22 pt-9 transition-colors duration-500 hover:border-signal-500"
              >
                <div className="flex items-baseline gap-6">
                  <span
                    aria-hidden
                    className="label-mono tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-signal-700"
                  >
                    {pad(1)}
                  </span>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="label-mono text-signal-700">{lead.category}</span>
                    <span aria-hidden className="h-3 w-px bg-ink-900/15" />
                    <time dateTime={lead.date} className="label-mono text-neutral-550">
                      {lead.dateDisplay}
                    </time>
                    <span aria-hidden className="h-3 w-px bg-ink-900/15" />
                    <span className="label-mono text-neutral-550">
                      {lead.readingMinutes} min read
                    </span>
                  </div>
                </div>

                <h3 className="mt-8 font-display text-d4 text-ink-950 transition-colors duration-500 group-hover:text-signal-700">
                  {lead.title}
                </h3>

                <p className="measure mt-7 text-lead text-neutral-600">{lead.excerpt}</p>

                <span className="mt-9 inline-flex items-center gap-2.5 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink-950 transition-colors duration-400 group-hover:text-signal-700">
                  Read the note
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </article>

            {/* Dated records with no published body — listed, never linked. */}
            {archiveRecords.map((record, i) => (
              <article
                key={`${record.date}-${record.title}`}
                data-reveal
                style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
                className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t border-ink-900/15 pt-7"
              >
                <span aria-hidden className="label-mono tabular-nums text-neutral-600">
                  {pad(articles.length + i + 1)}
                </span>
                <time dateTime={record.date} className="label-mono text-neutral-550">
                  {record.dateDisplay}
                </time>
                <h3 className="font-display text-h2 text-ink-800">{record.title}</h3>
                <p className="label-mono text-neutral-600">Listed without a page</p>
              </article>
            ))}

            <p className="label-mono mt-10 text-neutral-600">
              {pad(totalRecords)} records in the archive
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
