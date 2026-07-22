import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Article } from "@/content/news";
import { images, type ImageKey } from "@/content/imagery";
import { cn, pad } from "@/lib/utils";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

const FIGURES: ImageKey[] = ["chemistryBench", "microscope", "pipetting", "team"];

/**
 * One entry in the newsroom archive.
 *
 * Two shapes, not one: the first entry opens as a full editorial spread with a
 * plate and its own summary rail, and everything after it is set as a ruled
 * record. With a short archive that difference is what keeps the page from
 * looking like a two-card grid waiting for a third card.
 *
 * The whole entry is a single link — one target for the pointer, one stop for a
 * keyboard, and the call to action inside it is text rather than a nested
 * anchor.
 */
export function ArchiveEntry({
  article,
  position,
  variant,
}: {
  article: Article;
  /** 1-based position in the archive, printed as the record number. */
  position: number;
  variant: "lead" | "record";
}) {
  const figure = images[FIGURES[(position - 1) % FIGURES.length]];

  const meta = (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="label-mono text-ink-700">{article.category}</span>
      <span aria-hidden className="h-3 w-px bg-ink-900/15" />
      <time dateTime={article.date} className="label-mono text-neutral-500">
        {article.dateDisplay}
      </time>
      <span aria-hidden className="h-3 w-px bg-ink-900/15" />
      <span className="label-mono text-neutral-500">{article.readingMinutes} min read</span>
    </div>
  );

  const cta = (
    <span className="mt-6 inline-flex items-center gap-2.5 font-sans text-[0.9375rem] font-medium text-ink-950 transition-colors duration-400 group-hover:text-ink-700">
      Read the note
      <ArrowRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
      />
    </span>
  );

  if (variant === "lead") {
    return (
      <article data-reveal>
        <Link
          href={`/news/${article.slug}`}
          className="group block border-t border-ink-900/15 pt-9 transition-colors duration-500 hover:border-ink-900/60"
        >
          <div className="egrid gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-baseline gap-6">
                <span
                  aria-hidden
                  className="label-mono tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-700"
                >
                  {pad(position)}
                </span>
                {meta}
              </div>

              <h3 className="mt-6 font-display text-d3 text-ink-950 transition-colors duration-500 group-hover:text-ink-700">
                {article.title}
              </h3>

              <p className="measure mt-6 text-lead text-neutral-600">{article.excerpt}</p>

              {cta}
            </div>

            <div className="col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-9">
              <div className="relative aspect-[4/5] img-frame">
                <SpecimenPlate
                  src={figure.src}
                  alt={figure.alt}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  priority
                />
              </div>

              {article.takeaways?.length ? (
                <div className="mt-6">
                  <p className="label-mono text-neutral-600">In this note</p>
                  <ul className="mt-4">
                    {article.takeaways.slice(0, 3).map((takeaway) => (
                      <li
                        key={takeaway}
                        className="flex items-baseline gap-3 border-t border-ink-900/10 py-3 text-small text-ink-800"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-900"
                        />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
      <Link
        href={`/news/${article.slug}`}
        className={cn(
          "group grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-8 border-t border-ink-900/15 py-[clamp(1.25rem,2vw,1.875rem)] transition-colors duration-500 hover:border-ink-900/60",
          "lg:grid-cols-[3.5rem_minmax(0,7fr)_minmax(0,4fr)]",
        )}
      >
        <span
          aria-hidden
          className="label-mono tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-700"
        >
          {pad(position)}
        </span>

        <div>
          {meta}
          <h3 className="mt-6 font-display text-d4 text-ink-950 transition-colors duration-500 group-hover:text-ink-700">
            {article.title}
          </h3>
          <p className="measure mt-5 text-body text-neutral-600">{article.excerpt}</p>
          {cta}
        </div>

        <div className="relative aspect-[3/2] img-frame lg:aspect-[4/3]">
          <SpecimenPlate
            src={figure.src}
            alt={figure.alt}
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
      </Link>
    </article>
  );
}
