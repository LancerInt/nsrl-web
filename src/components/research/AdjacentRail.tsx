import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { contact } from "@/content/site";
import { getDiscipline, type Discipline } from "@/content/disciplines";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The divisions this one most often runs beside, plus the way out of the page.
 *
 * Adjacency is the whole argument of the site — a programme that needs three
 * divisions should never need three vendors — so it is stated as navigation
 * rather than as a claim.
 */
export function AdjacentRail({
  slugs,
  index,
}: {
  slugs: string[];
  index: string;
}) {
  const neighbours = slugs
    .map(getDiscipline)
    .filter((entry): entry is Discipline => Boolean(entry));

  return (
    <Section tone="canvas" aria-labelledby="alongside">
      <SectionBody>
        <div className="egrid gap-y-9">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow index={index}>Runs alongside</Eyebrow>

            <h2 id="alongside" className="mt-6 font-display text-d4 text-ink-950">
              <RevealText as="span" className="block">
                Nothing here works alone.
              </RevealText>
            </h2>

            <p className="mt-6 max-w-[32ch] text-small text-neutral-600">
              Most programmes cross three or four divisions. On one campus, under one
              quality system, that crossing costs a corridor rather than a shipment.
            </p>

            <div className="mt-6 border-t border-[var(--rule)] pt-9">
              <p className="label-mono text-neutral-600">Talk to a study director</p>
              <a
                href={`tel:${contact.phoneHref}`}
                className="mt-4 block font-display text-h2 text-ink-950 transition-colors duration-400 hover:text-ink-700"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block text-small text-neutral-600 transition-colors duration-400 hover:text-ink-700"
              >
                {contact.email}
              </a>

              <div className="mt-6 flex flex-wrap gap-3">
                <ActionLink href="/contact" variant="solid" >
                  Request a proposal
                </ActionLink>
                <ActionLink href="/research" variant="outline">
                  All divisions
                </ActionLink>
              </div>
            </div>
          </div>

          <ol className="col-span-12 lg:col-span-7 lg:col-start-6">
            {neighbours.map((neighbour, i) => (
              <li key={neighbour.slug}>
                <Link
                  href={`/research/${neighbour.slug}`}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
                  className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-5 border-t border-[var(--rule)] py-6 transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:border-ink-900/40 sm:gap-x-8"
                >
                  <span className="label-mono pt-2 tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-700">
                    {neighbour.index}
                  </span>

                  <span className="min-w-0">
                    <span className="block font-display text-h1 text-ink-950 transition-colors duration-500 group-hover:text-ink-700">
                      {neighbour.name}
                    </span>
                    <span className="measure mt-3 block text-small text-neutral-600">
                      {neighbour.summary}
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden
                    className="mt-1.5 h-5 w-5 shrink-0 text-neutral-550 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-700"
                  />
                </Link>
              </li>
            ))}
            <li aria-hidden className="border-t border-[var(--rule)]" />
          </ol>
        </div>
      </SectionBody>
    </Section>
  );
}
