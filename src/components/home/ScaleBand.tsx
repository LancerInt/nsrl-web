import { capacityStats } from "@/content/organisation";
import { acceptingCountries } from "@/content/accreditations";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * Physical scale, set on a ruled grid so the numbers read as measurements
 * rather than marketing.
 */
export function ScaleBand() {
  return (
    <section className="relative bg-canvas-sunken py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="06">The estate</Eyebrow>
            <h2 className="mt-8 font-display text-d3 text-ink-950">
              Capability you can walk through.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Three units across Kanchipuram district, roughly an hour from Chennai international
              airport. Sponsors are welcome to audit any of them.
            </p>
            <ActionLink href="/facilities" variant="text" className="mt-5">
              Tour the facilities
            </ActionLink>
          </div>
        </div>

        <dl className="mt-16 grid border-t border-ink-900/12 sm:grid-cols-2 lg:grid-cols-4">
          {capacityStats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
              className="group border-b border-ink-900/12 py-10 pr-8 transition-colors duration-500 hover:border-signal-500/60 sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-l-ink-900/12 sm:[&:nth-child(2n)]:pl-8 lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(n+2)]:border-l-ink-900/12 lg:[&:nth-child(n+2)]:pl-8"
            >
              <dd className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-bold leading-none tracking-[-0.04em] text-ink-950">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-5 font-display text-h3 text-ink-900">{stat.label}</dt>
              <p className="mt-3 max-w-[24ch] text-small text-neutral-600">{stat.caption}</p>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4">
          <p className="label-mono text-neutral-600">Reports accepted in</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {acceptingCountries.map((country) => (
              <li key={country} className="font-display text-h3 text-ink-800">
                {country}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
