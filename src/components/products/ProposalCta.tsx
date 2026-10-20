import { contact } from "@/content/site";
import { studyLifecycle } from "@/content/organisation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * Closing band. The only thing a package page can honestly promise is a scoped
 * proposal, so the page ends by naming the first stage of the study lifecycle
 * rather than a price.
 */
export function ProposalCta() {
  const scope = studyLifecycle[0];

  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-sunken py-[var(--section-y)] text-ink-950"
    >
      <div className="shell relative">
        <Eyebrow index="04">
          Next step
        </Eyebrow>

        <div className="egrid mt-7 gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <RevealText as="h2" className="font-display text-d2 text-ink-950">
              Send us the dossier you have to file.
            </RevealText>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <p data-reveal className="measure text-lead text-neutral-600">
              Scoping starts from the authority that will read the submission, not from the study
              list — so the fastest route to a real quotation is telling us the market, the
              submission type and the test item.
            </p>

            {scope ? (
              <p
                data-reveal
                style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
                className="label-mono mt-6 leading-relaxed text-neutral-600"
              >
                Stage {scope.index} · {scope.title}
                {scope.detail ? ` — ${scope.detail}` : ""}
              </p>
            ) : null}
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div
              data-reveal
              style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
              className="flex flex-wrap items-center gap-4"
            >
              <ActionLink href="/contact" variant="solid" >
                Request a scoped proposal
              </ActionLink>
              <ActionLink href="/services" variant="outline">
                How we work
              </ActionLink>
            </div>

            <dl className="mt-6 border-t border-[var(--rule)]">
              <div className="border-b border-[var(--rule)] py-5">
                <dt className="label-mono text-neutral-600">Direct line</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="inline-flex min-h-9 items-center font-display text-h2 text-ink-950 transition-colors duration-200 hover:text-meniscus-600"
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
                    className="inline-flex min-h-9 items-center font-display text-h2 text-ink-950 transition-colors duration-200 hover:text-meniscus-600"
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
