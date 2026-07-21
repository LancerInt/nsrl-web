import type { Article } from "@/content/news";
import { pad } from "@/lib/utils";
import { Section, SectionBody } from "@/components/ui/Section";

/**
 * The reading layout.
 *
 * A narrow measure held off-centre, with a monospace rail in the left margin
 * carrying the record metadata and the takeaways set as a highlighted aside in
 * the right margin. The opening paragraph is set large so the eye has an
 * obvious entry point, and a hairline closes it off from the body.
 */
export function ArticleReader({
  article,
  position,
}: {
  article: Article;
  /** 1-based position in the archive, printed in the margin rail. */
  position: number;
}) {
  const [opening, ...body] = article.body;

  return (
    <Section tone="canvas">
      <SectionBody>
        <div className="egrid gap-y-14">
          {/* ---- Margin rail ------------------------------------------- */}
          <div className="col-span-12 lg:col-span-2">
            <div className="lg:rail-sticky">
              <p className="label-mono tabular-nums text-neutral-500">{pad(position)}</p>
              <div aria-hidden className="mt-4 h-8 w-px bg-signal-500" />
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-5 lg:block">
                <div>
                  <dt className="label-mono text-neutral-600">Filed under</dt>
                  <dd className="label-mono mt-1.5 text-ink-900">{article.category}</dd>
                </div>
                <div className="lg:mt-6">
                  <dt className="label-mono text-neutral-600">Date</dt>
                  <dd className="label-mono mt-1.5 text-ink-900">
                    <time dateTime={article.date}>{article.dateDisplay}</time>
                  </dd>
                </div>
                <div className="lg:mt-6">
                  <dt className="label-mono text-neutral-600">Length</dt>
                  <dd className="label-mono mt-1.5 text-ink-900">
                    {article.readingMinutes} min
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* ---- Body -------------------------------------------------- */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-4">
            <p className="measure text-[clamp(1.3125rem,2.1vw,1.75rem)] leading-[1.5] tracking-[-0.015em] text-ink-900">
              {opening}
            </p>

            <hr className="mt-11 border-ink-900/12" />

            <div className="measure mt-11 space-y-7 text-body text-neutral-700">
              {body.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 48)}
                  data-reveal
                  style={{ "--reveal-delay": `${Math.min(i, 4) * 0.05}s` } as React.CSSProperties}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="label-mono mt-14 flex items-center gap-3 text-neutral-600">
              <span aria-hidden className="inline-block h-px w-8 bg-neutral-300" />
              End of entry — {article.author}
            </p>
          </div>

          {/* ---- Takeaways --------------------------------------------- */}
          {article.takeaways?.length ? (
            <aside
              aria-labelledby="takeaways-heading"
              data-reveal
              className="col-span-12 sm:col-span-8 lg:col-span-3 lg:col-start-10"
            >
              <div className="lg:rail-sticky">
                <div className="rounded-[var(--radius-card)] border border-signal-500/25 bg-signal-50/60 p-7">
                  <h2 id="takeaways-heading" className="label-mono text-signal-700">
                    What the note covers
                  </h2>
                  <ul className="mt-6">
                    {article.takeaways.map((takeaway, i) => (
                      <li
                        key={takeaway}
                        className="flex items-baseline gap-4 border-t border-signal-700/15 py-3.5 first:border-t-0 first:pt-0"
                      >
                        <span className="label-mono shrink-0 tabular-nums text-signal-700">
                          {pad(i + 1)}
                        </span>
                        <span className="text-small text-ink-900">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </SectionBody>
    </Section>
  );
}
