import { instrumentEstate } from "@/content/facilities";
import { capacityStats } from "@/content/organisation";
import { pad } from "@/lib/utils";
import { CountUp } from "@/components/ui/CountUp";
import { Disclosure } from "@/components/ui/Disclosure";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecChips } from "@/components/ui/SpecList";

/**
 * The instrument estate, presented as an equipment register.
 *
 * Five groups, each a disclosure so the page stays scannable, with the named
 * instruments as chips inside. The headline count comes from `capacityStats`
 * and the named count is derived from the register itself, so the two can never
 * drift apart.
 */
export function InstrumentRegister() {
  const instrumentStat = capacityStats.find((stat) => stat.label === "Instruments");
  const named = instrumentEstate.reduce((total, group) => total + group.instruments.length, 0);

  return (
    <section id="instruments" className="relative bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-8">
          {/* Register head — stays beside the groups while they are opened. */}
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:rail-sticky">
              <Eyebrow index="04">Instrument estate</Eyebrow>
              <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
                Every instrument, entered on one register.
              </RevealText>

              {instrumentStat ? (
                <p className="mt-7 font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.014em] text-ink-950">
                  <CountUp value={instrumentStat.value} suffix={instrumentStat.suffix} />
                </p>
              ) : null}

              <dl className="mt-6 border-t border-[var(--rule)] pt-6">
                <div className="flex items-baseline justify-between gap-6 py-2">
                  <dt className="label-mono text-neutral-600">Groups</dt>
                  <dd className="label-mono text-ink-800">{pad(instrumentEstate.length)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-2">
                  <dt className="label-mono text-neutral-600">Named below</dt>
                  <dd className="label-mono text-ink-800">{pad(named)}</dd>
                </div>
              </dl>

              <p className="measure-tight mt-6 text-small text-neutral-600">
                The register names the instrument classes a protocol is most often written around.
                The estate in service is larger, and every unit on it is qualified, calibrated and
                logged against the study that used it.
              </p>
            </div>
          </div>

          {/* Groups */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {instrumentEstate.map((group, i) => (
              <Disclosure
                key={group.title}
                defaultOpen={i === 0}
                title={
                  <span className="flex flex-wrap items-baseline gap-x-4">
                    <span className="label-mono text-neutral-550">R-{pad(i + 1)}</span>
                    <span>{group.title}</span>
                  </span>
                }
                meta={`${pad(group.instruments.length)} named`}
              >
                <p className="measure mb-7 text-small text-neutral-600">{group.caption}</p>
                <SpecChips items={group.instruments} />
              </Disclosure>
            ))}
            <div className="border-t border-[var(--rule)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
