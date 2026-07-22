import type { Discipline } from "@/content/disciplines";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecChips, SpecList } from "@/components/ui/SpecList";

/**
 * Guidelines, species and instruments — the parts of a division page that a
 * reviewer scans first and a marketer never writes.
 *
 * Reproduced verbatim from the content module. Which blocks appear depends
 * entirely on what the division actually publishes, so no two of these bands
 * are the same shape.
 */
export function SpecificationBand({
  discipline,
  index,
  tone,
}: {
  discipline: Discipline;
  index: string;
  tone: "canvas" | "sunken";
}) {
  const { guidelines, species, instruments } = discipline;
  if (!guidelines?.length && !species?.length && !instruments?.length) return null;

  return (
    <Section tone={tone} aria-labelledby="specifications">
      <SectionBody>
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:rail-sticky">
              <Eyebrow index={index}>Specifications</Eyebrow>

              <h2
                id="specifications"
                className="mt-6 font-display text-d4 text-ink-950"
              >
                <RevealText as="span" className="block">
                  On the record.
                </RevealText>
              </h2>

              <p className="mt-6 max-w-[32ch] text-small text-neutral-600">
                Guideline numbers, test species and instrument names are reproduced exactly
                as the laboratory publishes them, because a method is only portable across
                borders if it can be named precisely.
              </p>
            </div>
          </div>

          <div className="col-span-12 space-y-[clamp(2.5rem,5vw,4rem)] lg:col-span-7 lg:col-start-6">
            {guidelines?.length ? (
              <SpecBlock title="Guidelines worked to" count={`${guidelines.length} on file`}>
                <SpecChips items={guidelines} className="mt-7" />
              </SpecBlock>
            ) : null}

            {species?.length ? (
              <SpecBlock title="Test species" count={`${species.length} maintained`}>
                <SpecChips items={species} className="mt-7" />
              </SpecBlock>
            ) : null}

            {instruments?.length ? (
              <SpecBlock title="Instrument estate" count={`${instruments.length} platforms`}>
                <SpecList
                  items={instruments}
                  columns={instruments.length > 4 ? 2 : 1}
                  className="mt-7"
                />
              </SpecBlock>
            ) : null}
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}

function SpecBlock({
  title,
  count,
  children,
}: {
  title: string;
  count: string;
  children: React.ReactNode;
}) {
  return (
    <div data-reveal className="border-t border-ink-900/12 pt-8 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-h2 text-ink-950">{title}</h3>
        <span className="label-mono text-neutral-600">{count}</span>
      </div>
      {children}
    </div>
  );
}
