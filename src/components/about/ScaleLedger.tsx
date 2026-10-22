import { scaleStats } from "@/content/organisation";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { pad } from "@/lib/utils";

/**
 * Scale, read down rather than across.
 *
 * The homepage sets these numbers as a four-across counter band; here they are
 * a ledger — ruled rows, a column head, the measure on the left and the value
 * right-aligned on the same tabular axis, the way a record book is kept.
 */
export function ScaleLedger() {
  return (
    <section className="relative bg-canvas-sunken py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="02">The record</Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              What the ledger says.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Four running totals, kept because they are the ones a sponsor asks for
              first. Each is a count of work completed and reported, not of capacity
              available.
            </p>
          </div>
        </div>

        {/* Column head */}
        <div className="mt-[clamp(2rem,3.5vw,3rem)] flex items-baseline justify-between border-b border-[var(--rule-strong)] pb-4">
          <p className="label-mono text-neutral-600">Ref. · Measure</p>
          <p className="label-mono text-neutral-600">Recorded</p>
        </div>

        <dl>
          {scaleStats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
              className="group grid grid-cols-12 items-baseline gap-x-[clamp(1rem,1.8vw,2rem)] gap-y-2 border-b border-[var(--rule)] py-[clamp(1.25rem,2.2vw,2rem)] transition-colors duration-500 hover:border-ink-900/40"
            >
              {/* Index inside the term. A bare <span> is not permitted as
                  a direct child of a `dl > div` grouping. */}
              <dt className="col-span-12 flex items-baseline gap-[clamp(1rem,1.8vw,2rem)] lg:col-span-6">
                <span className="label-mono w-8 shrink-0 text-neutral-550 transition-colors duration-200 group-hover:text-ink-700 motion-reduce:transition-none">
                  {pad(i + 1)}
                </span>
                <span className="font-display text-h1 text-ink-950">{stat.label}</span>
              </dt>

              <dd className="col-span-12 col-start-1 text-small text-neutral-600 lg:col-span-3 lg:col-start-auto">
                {stat.caption}
              </dd>

              <dd className="col-span-12 text-left font-display text-[clamp(2.25rem,3.6vw,3.25rem)] font-medium leading-none tracking-[-0.02em] tabular-nums text-ink-950 lg:col-span-3 lg:text-right">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
