import { capacityStats } from "@/content/organisation";
import { pad } from "@/lib/utils";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * Capacity, read off a panel.
 *
 * The homepage sets the same four figures on a light four-up rule; here they
 * are stacked as channel readouts with dotted leaders, which is how a
 * specification sheet — rather than a marketing band — presents a number.
 */
export function CapacityPanel() {
  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-sunken py-[var(--section-y)] text-ink-950"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "4rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow index="02">
              Capacity
            </Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              The estate, in numbers that can be counted.
            </RevealText>
            <p className="mt-6 text-small text-neutral-600">
              Floor area, instruments, people and clean rooms. Four measurements a sponsor can
              verify on a site visit, which is the only kind worth publishing.
            </p>
          </div>

          {/* Readout panel */}
          <div
            data-reveal
            className="col-span-12 lg:col-span-7 lg:col-start-6"
          >
            <div className="title-block rounded-[var(--radius-card)] p-[clamp(1.25rem,2.6vw,2.25rem)]">
              <div className="flex items-center justify-between gap-6 border-b border-[var(--rule)] pb-5">
                <p className="label-mono text-ink-800">Capacity readout</p>
                <p className="label-mono text-neutral-600">NSRL · Salem</p>
              </div>

              <dl>
                {capacityStats.map((stat, i) => (
                  /*
                    A `dl > div` grouping may contain only `dt` and `dd`.
                    This row previously wrapped its term and value in a
                    further flex `div` and hung the caption off a sibling
                    `p`, which put three disallowed children inside the
                    group and detached the `dt` from its list as far as
                    assistive technology was concerned.

                    The baseline row survives as a two-column grid on the
                    group itself, and the caption becomes a second `dd` —
                    one term may have more than one description, which is
                    exactly what a value and its note are.
                  */
                  <div
                    key={stat.label}
                    data-reveal
                    style={{ "--reveal-delay": `${0.06 * i}s` } as React.CSSProperties}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 border-b border-[var(--rule)] py-5 transition-colors duration-200 hover:border-neutral-300 motion-reduce:transition-none"
                  >
                    <dt className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      <span className="label-mono shrink-0 text-neutral-550 transition-colors duration-200 group-hover:text-ink-900 motion-reduce:transition-none">
                        CH {pad(i + 1)}
                      </span>
                      <span className="font-display text-h2 text-ink-950">{stat.label}</span>
                      <span
                        aria-hidden
                        className="hidden h-px min-w-8 flex-1 self-center border-b border-dashed border-[var(--rule)] sm:block"
                      />
                    </dt>
                    <dd className="font-display text-d2 leading-none text-ink-950">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dd className="col-span-2 mt-3 max-w-[46ch] text-small text-neutral-600">
                      {stat.caption}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Decorative graduation strip — the panel's baseline scale. */}
              <div aria-hidden className="mt-6 flex items-end gap-1.5">
                {Array.from({ length: 40 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i % 5 === 0
                        ? "block h-3.5 w-px bg-canvas-raised"
                        : "block h-1.5 w-px bg-canvas-raised"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
