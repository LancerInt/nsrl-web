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
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep-raised py-[var(--section-y)] text-ink-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-ink-400) 45%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <Eyebrow index="04" tone="deep">
          Next step
        </Eyebrow>

        <div className="egrid mt-10 gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <RevealText as="h2" className="font-display text-d2 text-white">
              Send us the dossier you have to file.
            </RevealText>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <p data-reveal className="measure text-lead text-ink-200">
              Scoping starts from the authority that will read the submission, not from the study
              list — so the fastest route to a real quotation is telling us the market, the
              submission type and the test item.
            </p>

            {scope ? (
              <p
                data-reveal
                style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
                className="label-mono mt-8 leading-relaxed text-ink-200"
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
              <ActionLink href="/contact" variant="solid" tone="deep" cursorLabel="Enquire">
                Request a scoped proposal
              </ActionLink>
              <ActionLink href="/services" variant="outline" tone="deep">
                How we work
              </ActionLink>
            </div>

            <dl className="mt-12 border-t border-white/12">
              <div className="border-b border-white/12 py-5">
                <dt className="label-mono text-ink-200">Direct line</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="font-display text-h2 text-white transition-colors duration-400 hover:text-signal-300"
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
                    className="font-display text-h2 text-white transition-colors duration-400 hover:text-signal-300"
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
