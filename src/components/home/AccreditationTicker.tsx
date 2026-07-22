import Link from "next/link";

import { accreditations } from "@/content/accreditations";

/**
 * The credibility strip. Placed immediately under the hero, because for a
 * regulated laboratory the accreditation list *is* the value proposition — a
 * visitor should not have to scroll to find out whether we are GLP certified.
 *
 * Set as a static register, not a marquee: every credential on the page at
 * once, readable at the visitor's pace, each one a route to its certificate.
 */
export function AccreditationTicker() {
  return (
    <section aria-label="Accreditations" className="bg-canvas">
      <div className="shell flex flex-col gap-x-10 gap-y-5 py-8 lg:flex-row lg:items-center">
        <p className="label-mono shrink-0 text-neutral-550">Accredited under</p>

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {accreditations.map((accreditation) => (
            <li key={accreditation.id}>
              <Link
                href="/downloads"
                title={`${accreditation.name} — ${accreditation.issuer}`}
                className="font-display text-h3 text-ink-800 underline-offset-4 transition-colors duration-300 hover:text-ink-950 hover:underline"
              >
                {accreditation.abbr}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
