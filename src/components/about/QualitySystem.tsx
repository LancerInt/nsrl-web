import { qualityPillars, qualitySystems } from "@/content/organisation";
import { ActionLink } from "@/components/ui/ActionLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { pad } from "@/lib/utils";

/**
 * The quality system, set as a controlled document.
 *
 * Two sheets offset against one another — commitments in Part A, the mechanisms
 * that deliver them in Part B — each ruled like a specification rather than
 * dressed as a card. The anchor is the target of the site-wide
 * `/about#quality-system` link, so the scroll margin clears the fixed header.
 */
export function QualitySystem() {
  return (
    <section
      id="quality-system"
      className="relative scroll-mt-[calc(var(--nav-h)+2rem)] bg-canvas py-[var(--section-y)]"
    >
      <div className="shell">
        <div className="egrid items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="03">Quality system</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Written down, audited, and kept.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Five commitments and three mechanisms. Nothing here is aspirational —
              each line is something an auditor can ask us to evidence on the day
              they walk in.
            </p>
            <ActionLink href="/downloads" variant="text" className="mt-5">
              Certificates on file
            </ActionLink>
          </div>
        </div>

        <div className="egrid mt-[clamp(3.5rem,7vw,6rem)] gap-y-8">
          {/* Part A — the commitments. */}
          <div
            data-reveal
            className="col-span-12 overflow-hidden rounded-[var(--radius-card)] border border-ink-900/12 bg-canvas-raised lg:col-span-11"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-ink-900/12 px-[clamp(1.25rem,3vw,2.75rem)] py-5">
              <h3 className="label-mono text-ink-700">Part A — Commitments</h3>
              <p className="label-mono text-neutral-600">
                {pad(qualityPillars.length)} clauses
              </p>
            </div>

            <dl>
              {qualityPillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="group grid grid-cols-12 gap-x-[clamp(1rem,1.8vw,2rem)] gap-y-2 border-b border-ink-900/10 px-[clamp(1.25rem,3vw,2.75rem)] py-7 transition-colors duration-500 last:border-b-0 hover:bg-canvas-sunken/70"
                >
                  <span className="label-mono col-span-2 pt-1 text-neutral-550 transition-colors duration-500 group-hover:text-signal-700 lg:col-span-1">
                    A.{i + 1}
                  </span>
                  <dt className="col-span-10 font-display text-h2 text-ink-950 lg:col-span-4">
                    {pillar.title}
                  </dt>
                  <dd className="col-span-12 col-start-1 text-small text-neutral-600 lg:col-span-7 lg:col-start-6">
                    {pillar.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Part B — the mechanisms, shifted one column right. */}
          <div
            data-reveal
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            className="col-span-12 overflow-hidden rounded-[var(--radius-card)] border border-ink-900/12 bg-canvas-sunken lg:col-span-11 lg:col-start-2"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-ink-900/12 px-[clamp(1.25rem,3vw,2.75rem)] py-5">
              <h3 className="label-mono text-ink-700">Part B — Mechanisms</h3>
              <p className="label-mono text-neutral-600">
                {pad(qualitySystems.length)} systems
              </p>
            </div>

            <dl>
              {qualitySystems.map((system, i) => (
                <div
                  key={system.title}
                  className="group grid grid-cols-12 gap-x-[clamp(1rem,1.8vw,2rem)] gap-y-2 border-b border-ink-900/10 px-[clamp(1.25rem,3vw,2.75rem)] py-7 transition-colors duration-500 last:border-b-0 hover:bg-canvas-raised"
                >
                  <span className="label-mono col-span-2 pt-1 text-neutral-550 transition-colors duration-500 group-hover:text-signal-700 lg:col-span-1">
                    B.{i + 1}
                  </span>
                  <dt className="col-span-10 lg:col-span-4">
                    <span className="block font-display text-h2 text-ink-950">
                      {system.title}
                    </span>
                    <span className="label-mono mt-2.5 block text-signal-700">
                      {system.subtitle}
                    </span>
                  </dt>
                  <dd className="col-span-12 col-start-1 text-small text-neutral-600 lg:col-span-7 lg:col-start-6">
                    {system.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
