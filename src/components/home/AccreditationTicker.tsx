import Link from "next/link";

import { accreditations } from "@/content/accreditations";
import { Marquee } from "@/components/ui/Marquee";

/**
 * The credibility strip. Placed immediately under the hero, because for a
 * regulated laboratory the accreditation list *is* the value proposition — a
 * visitor should not have to scroll to find out whether we are GLP certified.
 */
export function AccreditationTicker() {
  return (
    <section
      data-theme="deep"
      aria-label="Accreditations"
      className="relative border-t border-white/10 bg-deep-raised py-6 text-ink-100"
    >
      <Marquee speed={58} tone="deep">
        {accreditations.map((accreditation) => (
          <Link
            key={accreditation.id}
            href="/downloads"
            className="group flex items-center gap-4 whitespace-nowrap px-7 transition-colors duration-400"
            title={`${accreditation.name} — ${accreditation.issuer}`}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-signal-500 transition-transform duration-500 group-hover:scale-150"
            />
            <span className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-white">
              {accreditation.abbr}
            </span>
            <span className="label-mono text-ink-300 group-hover:text-ink-200">
              {accreditation.category}
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
