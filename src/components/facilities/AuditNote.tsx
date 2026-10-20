import { contact, locations } from "@/content/site";
import { pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * Closing band: the open invitation to audit.
 *
 * A laboratory that publishes its estate should be willing to have it walked,
 * so the page ends on the visit rather than on a brochure line.
 */
export function AuditNote() {
  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-sunken py-[var(--section-y)] text-ink-950"
    >
      <div className="shell relative">
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="05">
              Open to inspection
            </Eyebrow>

            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              Sponsors are welcome to audit the facility.
            </RevealText>

            <p
              data-reveal
              className="font-display text-editorial mt-7 max-w-[46ch] text-neutral-600"
            >
              A laboratory you can walk through is the only kind worth describing.
            </p>

            <p
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
              className="measure mt-6 text-body text-neutral-600"
            >
              Client services and every laboratory function on this page sit at one accredited
              site in Salem, Tamil Nadu. Tell us which divisions and which study type you need to
              see, and we will scope the visit from there.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
              className="mt-6 flex flex-wrap items-center gap-4"
            >
              <ActionLink href="/contact" variant="solid" >
                Arrange a site visit
              </ActionLink>
              <ActionLink href="/about#quality-system" variant="outline">
                The quality system
              </ActionLink>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-[var(--rule)]">
              <div className="flex items-baseline justify-between gap-6 border-b border-[var(--rule)] py-5">
                <dt className="label-mono text-neutral-600">Units open</dt>
                <dd className="font-display text-h2 text-ink-950">{pad(locations.length)}</dd>
              </div>
              <div className="border-b border-[var(--rule)] py-5">
                <dt className="label-mono text-neutral-600">Direct line</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="inline-flex min-h-9 items-center font-display text-h3 text-ink-950 transition-colors duration-200 hover:text-meniscus-600"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="border-b border-[var(--rule)] py-5">
                <dt className="label-mono text-neutral-600">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-9 items-center font-display text-h3 text-ink-950 transition-colors duration-200 hover:text-meniscus-600"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
