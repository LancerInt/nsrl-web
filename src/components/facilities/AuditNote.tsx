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
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep-raised py-[var(--section-y)] text-ink-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-signal-500) 34%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <div className="egrid gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="05" tone="deep">
              Open to inspection
            </Eyebrow>

            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              Sponsors are welcome to audit any of the three units.
            </RevealText>

            <p
              data-reveal
              className="font-editorial text-editorial mt-10 max-w-[46ch] italic text-ink-100"
            >
              An estate you can walk through is the only kind worth describing.
            </p>

            <p
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
              className="measure mt-8 text-body text-ink-200"
            >
              Client services sit at the head office, roughly an hour from Chennai international
              airport, and every laboratory function on this page is within a short drive of it.
              Tell us which unit and which study type you need to see, and we will scope the visit
              from there.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <ActionLink href="/contact" variant="solid" tone="deep" cursorLabel="Enquire">
                Arrange a site visit
              </ActionLink>
              <ActionLink href="/about#quality-system" variant="outline" tone="deep">
                The quality system
              </ActionLink>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-white/12">
              <div className="flex items-baseline justify-between gap-6 border-b border-white/12 py-5">
                <dt className="label-mono text-ink-200">Units open</dt>
                <dd className="font-display text-h2 text-white">{pad(locations.length)}</dd>
              </div>
              <div className="border-b border-white/12 py-5">
                <dt className="label-mono text-ink-200">Direct line</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="font-display text-h3 text-white transition-colors duration-400 hover:text-signal-300"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="border-b border-white/12 py-5">
                <dt className="label-mono text-ink-200">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-display text-h3 text-white transition-colors duration-400 hover:text-signal-300"
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
