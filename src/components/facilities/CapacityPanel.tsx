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
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep py-[var(--section-y)] text-ink-50"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-60"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.03)",
            "--graticule-size": "4rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <div className="egrid gap-y-14">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow index="02" tone="deep">
              Capacity
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              The estate, in numbers that can be counted.
            </RevealText>
            <p className="mt-8 text-small text-ink-200">
              Floor area, instruments, people and clean rooms. Four measurements a sponsor can
              verify on a site visit, which is the only kind worth publishing.
            </p>
          </div>

          {/* Readout panel */}
          <div
            data-reveal
            className="col-span-12 lg:col-span-7 lg:col-start-6"
          >
            <div className="glass rounded-[var(--radius-card)] p-[clamp(1.25rem,2.6vw,2.25rem)]">
              <div className="flex items-center justify-between gap-6 border-b border-white/12 pb-5">
                <p className="label-mono text-signal-400">Capacity readout</p>
                <p className="label-mono text-ink-200">NSRL · three units</p>
              </div>

              <dl>
                {capacityStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    data-reveal
                    style={{ "--reveal-delay": `${0.06 * i}s` } as React.CSSProperties}
                    className="group border-b border-white/10 py-7 transition-colors duration-500 hover:border-signal-400/50"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      <span className="label-mono shrink-0 text-ink-300 transition-colors duration-400 group-hover:text-signal-400">
                        CH {pad(i + 1)}
                      </span>
                      <dt className="font-display text-h2 text-white">{stat.label}</dt>
                      <span
                        aria-hidden
                        className="hidden h-px min-w-8 flex-1 self-center border-b border-dashed border-white/20 sm:block"
                      />
                      <dd className="font-display text-[clamp(2rem,3.4vw,3.25rem)] font-bold leading-none tracking-[-0.04em] text-white">
                        <CountUp value={stat.value} suffix={stat.suffix} />
                      </dd>
                    </div>
                    <p className="mt-3 max-w-[46ch] text-small text-ink-200">{stat.caption}</p>
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
                        ? "block h-3.5 w-px bg-white/28"
                        : "block h-1.5 w-px bg-white/14"
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
