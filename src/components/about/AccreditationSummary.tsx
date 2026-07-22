import Link from "next/link";

import {
  accreditations,
  acceptingAuthorities,
  type Accreditation,
} from "@/content/accreditations";
import { ActionLink } from "@/components/ui/ActionLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecChips } from "@/components/ui/SpecList";

/** Preserves the order the categories first appear in the source list. */
function groupByCategory(items: Accreditation[]) {
  const groups: { category: string; items: Accreditation[] }[] = [];
  for (const item of items) {
    const existing = groups.find((group) => group.category === item.category);
    if (existing) existing.items.push(item);
    else groups.push({ category: item.category, items: [item] });
  }
  return groups;
}

/**
 * The accreditation summary: a filing index, not a badge wall.
 *
 * Categories run down a left gutter with their certificates ruled beside them,
 * every row a link into /downloads where the certificate itself is published.
 */
export function AccreditationSummary() {
  const groups = groupByCategory(accreditations);

  return (
    <section className="relative isolate overflow-hidden bg-canvas-sunken py-[var(--section-y)] text-ink-950">
      <div className="shell">
        {/* Header */}
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div data-reveal>
            <Eyebrow>Evidence on file</Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              Nothing here is asserted without a certificate.
            </RevealText>
            <ActionLink href="/downloads" variant="solid" className="mt-7">
              Open the certificates
            </ActionLink>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            className="lg:pt-3"
          >
            <p className="text-lead text-neutral-600">
              {accreditations.length} accreditations, approvals and registrations, each one
              published in full so a sponsor can verify the scope before the first conversation.
            </p>
            <div className="mt-6">
              <h3 className="label-mono text-neutral-550">Reports accepted by</h3>
              <SpecChips items={acceptingAuthorities} className="mt-4" />
            </div>
          </div>
        </div>

        {/* Register — full width, category label beside its certificates */}
        <div className="mt-12">
          {groups.map((group, gi) => (
            <div
              key={group.category}
              data-reveal
              style={{ "--reveal-delay": `${(gi % 3) * 0.05}s` } as React.CSSProperties}
              className="grid grid-cols-12 gap-x-[clamp(1rem,1.8vw,2rem)] gap-y-3 border-t border-[var(--rule-strong)] py-7 first:pt-7"
            >
              <h3 className="label-mono col-span-12 text-ink-800 lg:col-span-3">
                {group.category}
              </h3>

              <ul className="col-span-12 grid gap-x-[clamp(1.5rem,3vw,3rem)] sm:grid-cols-2 lg:col-span-9 lg:col-start-4">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href="/downloads"
                      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[var(--rule)] py-4 transition-colors duration-300 last:border-b-0 hover:border-ink-900/40"
                    >
                      <span className="font-display text-h2 text-ink-950 underline-offset-4 group-hover:underline">
                        {item.abbr}
                      </span>
                      <span className="text-small text-neutral-600">{item.name}</span>
                      <span className="label-mono w-full text-neutral-550">{item.issuer}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
