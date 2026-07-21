import { contact } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { Section, SectionBody } from "@/components/ui/Section";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * Closing note. The register can only ever hold what has been published, so the
 * page ends by naming that limit and giving the direct route past it.
 */
export function RegisterOutro() {
  return (
    <Section tone="sunken">
      <SectionBody>
        <div className="egrid gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="03">Anything else</Eyebrow>

            <h2 className="measure mt-9 font-editorial text-editorial font-normal italic text-ink-900">
              A register can only hold what has been published.
            </h2>

            <p className="measure mt-8 text-lead text-neutral-600">
              Scope detail, quality documentation or a certificate that is not linked above —
              ask directly and we will point you to it. The phone is the fastest route.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              <a
                href={`tel:${contact.phoneHref}`}
                className="font-display text-h1 text-ink-950 underline-offset-8 transition-colors duration-400 hover:text-signal-700 hover:underline"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-small text-neutral-600 underline-offset-4 transition-colors duration-400 hover:text-signal-700 hover:underline"
              >
                {contact.email}
              </a>
            </div>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <ActionLink href="/contact" variant="solid" cursorLabel="Enquire">
                Talk to the laboratory
              </ActionLink>
              <ActionLink href="/about#quality-system" variant="outline">
                The quality system
              </ActionLink>
            </div>
          </div>

          <div
            data-reveal="scale"
            className="relative col-span-12 aspect-[4/3] self-end overflow-hidden rounded-[var(--radius-card)] sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:aspect-[3/4]"
          >
            <SpecimenPlate variant="lattice" seed={5} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/70 to-transparent p-6">
              <p className="label-mono text-white/80">Fig. 01 — Lattice</p>
              <p className="label-mono text-ink-100">NSRL</p>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
