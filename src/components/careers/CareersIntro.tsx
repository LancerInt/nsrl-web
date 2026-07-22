import { careersIntro } from "@/content/careers";
import { instrumentEstate, units } from "@/content/facilities";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecChips } from "@/components/ui/SpecList";

/**
 * The proposition, followed by the estate a new starter actually walks into.
 *
 * Two beats in one chapter: an asymmetric statement (5 columns of heading
 * against 6 of prose) resolving into a ruled three-unit strip, so the argument
 * lands somewhere physical instead of ending on adjectives.
 */
export function CareersIntro() {
  return (
    <Section tone="canvas">
      <SectionBody>
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow index="01">{careersIntro.eyebrow}</Eyebrow>

            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              {careersIntro.title}
            </RevealText>

            <p className="measure mt-6 text-lead text-neutral-600">{careersIntro.lead}</p>
          </div>

          <div className="col-span-12 space-y-5 text-lead text-neutral-700 lg:col-span-6 lg:col-start-7">
            {careersIntro.body.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24)}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Where the work happens */}
        <div className="mt-[clamp(2rem,4vw,3.25rem)]">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h3 className="font-display text-h1 text-ink-950">Where the work happens</h3>
            <p className="label-mono text-neutral-600">Three sites · Tamil Nadu</p>
          </div>

          <dl className="mt-7 grid border-t border-ink-900/12 md:grid-cols-3">
            {units.map((unit, i) => (
              <div
                key={unit.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
                className="group border-b border-ink-900/12 py-6 pr-8 transition-colors duration-500 hover:border-ink-900/40 md:[&:nth-child(n+2)]:border-l md:[&:nth-child(n+2)]:border-l-ink-900/12 md:[&:nth-child(n+2)]:pl-8"
              >
                <dt className="label-mono text-neutral-550">{unit.label}</dt>
                <dd>
                  <p className="mt-4 font-display text-h2 text-ink-950">{unit.title}</p>
                  <p className="mt-4 text-small text-neutral-600">{unit.body}</p>
                  <p className="label-mono mt-6 leading-relaxed text-neutral-600">
                    {unit.houses.join(" · ")}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-4">
            <p className="label-mono shrink-0 text-neutral-600">Instrument families in service</p>
            <SpecChips items={instrumentEstate.map((group) => group.title)} />
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
