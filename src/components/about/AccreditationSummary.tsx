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
    <section
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep-raised py-[var(--section-y)] text-ink-50"
    >
      <div className="shell">
        <div className="egrid gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow index="06" tone="deep">
              Evidence on file
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              Nothing here is asserted without a certificate.
            </RevealText>
            <p className="mt-7 max-w-[38ch] text-small text-ink-200">
              {accreditations.length} accreditations, approvals and registrations,
              each one published in full so a sponsor can verify the scope before
              the first conversation.
            </p>
            <ActionLink
              href="/downloads"
              variant="solid"
              tone="deep"
              className="mt-9"
              cursorLabel="Downloads"
            >
              Open the certificates
            </ActionLink>

            <div className="mt-12">
              <h3 className="label-mono text-ink-200">Reports accepted by</h3>
              <SpecChips items={acceptingAuthorities} tone="deep" className="mt-5" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {groups.map((group, gi) => (
              <div
                key={group.category}
                data-reveal
                style={{ "--reveal-delay": `${gi * 0.06}s` } as React.CSSProperties}
                className="grid grid-cols-12 gap-x-[clamp(1rem,1.8vw,2rem)] gap-y-4 border-t border-white/15 py-8 first:border-t-0 first:pt-0"
              >
                <h3 className="label-mono col-span-12 text-signal-400 lg:col-span-4">
                  {group.category}
                </h3>

                <ul className="col-span-12 lg:col-span-8">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href="/downloads"
                        className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-white/10 py-4 transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] last:border-b-0 hover:border-signal-400/60"
                      >
                        <span className="font-display text-h2 text-white transition-colors duration-500 group-hover:text-signal-300">
                          {item.abbr}
                        </span>
                        <span className="text-small text-ink-200">{item.name}</span>
                        <span className="label-mono w-full text-ink-300">
                          {item.issuer}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
