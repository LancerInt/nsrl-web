import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { contact } from "@/content/site";
import { industries, type Industry } from "@/content/industries";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * Closing band for a sector page: the next action on the left, the rest of the
 * sector index on the right, so the page ends by handing the visitor somewhere
 * rather than stopping.
 */
export function SectorClosing({ industry }: { industry: Industry }) {
  const others = industries.filter((entry) => entry.slug !== industry.slug);

  return (
    <Section
      id="proposal"
      tone="canvas"
      innerClassName="py-[var(--section-y)]"
      aria-labelledby="proposal-heading"
    >
      <div className="egrid gap-y-9">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow index="04">Next step</Eyebrow>

          <RevealText
            as="h2"
            id="proposal-heading"
            className="mt-6 font-display text-d3 text-ink-950"
          >
            Scope a programme for this sector.
          </RevealText>

          <p className="measure mt-6 text-lead text-neutral-600">
            Send the substance, the markets you are filing into and the date you need the report
            by. We will map the endpoints and come back with a protocol schedule rather than a
            price list.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ActionLink href="/contact" variant="solid" >
              Request a proposal
            </ActionLink>
            <ActionLink href="/products" variant="outline">
              Study packages
            </ActionLink>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-[var(--rule)] pt-8">
            <a
              href={`tel:${contact.phoneHref}`}
              className="font-display text-h2 text-ink-950 transition-colors duration-400 hover:text-ink-700"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-small text-neutral-600 underline decoration-ink-900/25 underline-offset-4 transition-colors duration-400 hover:text-ink-950 hover:decoration-ink-900"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <nav aria-label="Other sectors" className="col-span-12 lg:col-span-5 lg:col-start-8">
          <p className="label-mono text-neutral-600">The other sectors</p>

          <ul className="mt-6">
            {others.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/services/${entry.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-t border-[var(--rule)] py-6 transition-colors duration-500 hover:border-ink-900/40"
                >
                  <span className="label-mono tabular-nums text-neutral-550">{entry.index}</span>
                  <span>
                    <span className="block font-display text-h2 text-ink-950 transition-colors duration-400 group-hover:text-ink-700">
                      {entry.name}
                    </span>
                    <span className="mt-2 block text-small text-neutral-600">{entry.summary}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 self-center text-neutral-550 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-ink-700"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-[var(--rule)]" />

          <ActionLink href="/services" variant="text" className="mt-6">
            How we work
          </ActionLink>
        </nav>
      </div>
    </Section>
  );
}
