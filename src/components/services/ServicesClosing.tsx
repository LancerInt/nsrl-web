import { contact } from "@/content/site";
import { studyPackages } from "@/content/packages";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The closing band: the two ways a programme actually starts — an assembled
 * package, or a conversation.
 *
 * The packages are listed rather than linked individually so the visitor lands
 * on the catalogue with the names already in mind.
 */
export function ServicesClosing() {
  return (
    <Section tone="deep-raised" innerClassName="py-[var(--section-y)]">
      <div className="egrid gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow index="03" tone="deep">
            Where to start
          </Eyebrow>

          <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
            Assembled programmes, or a protocol of your own.
          </RevealText>

          <p className="measure mt-8 text-lead text-ink-200">
            {studyPackages.length} study packages are already mapped to the guidelines they
            satisfy. Where no guideline fits, custom study design runs inside the same GLP quality
            system as everything else.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <ActionLink href="/products" variant="solid" tone="deep">
              Study packages
            </ActionLink>
            <ActionLink href="/contact" variant="outline" tone="deep" cursorLabel="Enquire">
              Request a proposal
            </ActionLink>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="label-mono text-ink-200">Pre-assembled study packages</p>

          <dl className="mt-6">
            {studyPackages.map((studyPackage, i) => (
              <div
                key={studyPackage.slug}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-white/12 py-5"
              >
                <span className="label-mono pt-1.5 tabular-nums text-ink-300">
                  {studyPackage.index}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <dt className="font-display text-h3 text-white">{studyPackage.name}</dt>
                  <dd className="label-mono text-signal-400">{studyPackage.audience}</dd>
                </div>
              </div>
            ))}
            <div className="border-t border-white/12" />
          </dl>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-3">
            <a
              href={`tel:${contact.phoneHref}`}
              className="font-display text-h2 text-white transition-colors duration-400 hover:text-signal-300"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-small text-ink-200 underline decoration-white/25 underline-offset-4 transition-colors duration-400 hover:text-white hover:decoration-signal-400"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
