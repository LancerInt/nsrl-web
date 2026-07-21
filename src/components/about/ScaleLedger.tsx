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
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
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
        <div className="mt-[clamp(3rem,6vw,5rem)] flex items-baseline justify-between border-b border-ink-900/22 pb-4">
          <p className="label-mono text-neutral-600">Ref. · Measure</p>
          <p className="label-mono text-neutral-600">Recorded</p>
        </div>

        <dl>
          {scaleStats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
              className="group grid grid-cols-12 items-baseline gap-x-[clamp(1rem,1.8vw,2rem)] gap-y-3 border-b border-ink-900/12 py-[clamp(1.75rem,3.4vw,3rem)] transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:border-signal-500/60"
            >
              <span className="label-mono col-span-2 text-neutral-550 transition-colors duration-500 group-hover:text-signal-700">
                {pad(i + 1)}
              </span>

              <dt className="col-span-10 font-display text-h1 text-ink-950 lg:col-span-4">
                {stat.label}
              </dt>

              <dd className="col-span-12 col-start-1 text-small text-neutral-600 lg:col-span-3 lg:col-start-auto">
                {stat.caption}
              </dd>

              <dd className="col-span-12 text-left font-display text-[clamp(2.75rem,5.6vw,5rem)] font-bold leading-[0.9] tracking-[-0.045em] tabular-nums text-ink-950 lg:col-span-3 lg:text-right">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
