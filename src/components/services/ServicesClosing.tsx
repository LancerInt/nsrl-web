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
    <Section innerClassName="py-[var(--section-y)]">
      <div className="egrid gap-y-8">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow index="03">
            Where to start
          </Eyebrow>

          <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
            Assembled programmes, or a protocol of your own.
          </RevealText>

          <p className="measure mt-6 text-lead text-neutral-600">
            {studyPackages.length} study packages are already mapped to the guidelines they
            satisfy. Where no guideline fits, custom study design runs inside the same GLP quality
            system as everything else.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ActionLink href="/products" variant="solid">
              Study packages
            </ActionLink>
            <ActionLink href="/contact" variant="outline" >
              Request a proposal
            </ActionLink>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="label-mono text-neutral-600">Pre-assembled study packages</p>

          <dl className="mt-6">
            {studyPackages.map((studyPackage, i) => (
              <div
                key={studyPackage.slug}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
                /* Only `dt` and `dd` may sit inside a `dl > div` group.
                   The index moves into the `dt` and the inner flex wrapper
                   becomes the grid itself. */
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-t border-[var(--rule)] py-5 sm:grid-cols-[auto_1fr_auto]"
              >
                <dt className="col-span-2 flex items-baseline gap-x-5 sm:col-span-1 sm:contents">
                  <span className="label-mono tabular-nums text-neutral-550">
                    {studyPackage.index}
                  </span>
                  <span className="font-display text-h3 text-ink-950">{studyPackage.name}</span>
                </dt>
                <dd className="label-mono col-start-2 text-ink-800 sm:col-start-3 sm:justify-self-end">
                  {studyPackage.audience}
                </dd>
              </div>
            ))}
            <div className="border-t border-[var(--rule)]" />
          </dl>

          <div className="mt-7 flex flex-wrap items-baseline gap-x-10 gap-y-3">
            <a
              href={`tel:${contact.phoneHref}`}
              className="font-display text-h2 text-ink-950 transition-colors duration-400 hover:text-ink-950"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-small text-neutral-600 underline decoration-white/25 underline-offset-4 transition-colors duration-400 hover:text-ink-950 hover:decoration-meniscus-500"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
