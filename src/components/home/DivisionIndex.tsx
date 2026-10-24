import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { numberWord } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The shallow projection of a discipline this section renders.
 *
 * Declared here and built on the server in `app/page.tsx`: the discipline
 * module carries long-form body copy, capability trees and SEO strings that
 * this component never reads, and the page narrows each record to the fields
 * that actually render.
 */
export type DivisionRow = {
  slug: string;
  index: string;
  name: string;
  family: string;
  /**
   * The plain-language description, not the division's distinguishing
   * claim. A reader on the homepage is still deciding which division owns
   * their question, and "26 species across water, soil and air" answers a
   * question they have not asked yet.
   */
  overview: string;
  claim: { value: string; unit?: string; caption: string };
};

/**
 * The divisions, under the three headings the laboratory actually organises
 * them by.
 *
 * A flat grid is a list a visitor has to read end to end before they know
 * whether their question is in it. Grouped, the three headings answer it
 * first — a toxicologist, a chemist and a crop protection registrant each
 * find their column before they read a single division name. The groups are
 * the families declared in `content/disciplines.ts`, so the menu, this
 * section and the research register all name them identically.
 *
 * Rows, not cards: a card per division is a field of boxes, and the eye has
 * to work out that they are the same kind of thing. A ruled row with the
 * summary underneath carries more information in less space, and the hover
 * and focus states are the same one the rest of the site uses.
 */
export function DivisionIndex({ divisions }: { divisions: DivisionRow[] }) {
  const families = Array.from(new Set(divisions.map((d) => d.family)));

  return (
    <section className="bg-canvas py-[var(--section-y)] text-ink-950" aria-labelledby="divisions">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5" data-reveal>
          <div>
            <Eyebrow>Scientific divisions</Eyebrow>
            <h2 id="divisions" className="mt-5 max-w-[20ch] font-display text-d2 text-ink-950">
              {numberWord(divisions.length, { capitalise: true })} divisions, one chain of
              custody.
            </h2>
          </div>
          <ActionLink href="/research" variant="text" className="mb-1">
            Explore all divisions
          </ActionLink>
        </div>

        <div className="mt-[clamp(2rem,3.2vw,3rem)] grid gap-x-10 gap-y-10 lg:grid-cols-3">
          {families.map((family, familyIndex) => (
            <section
              key={family}
              data-reveal
              style={{ "--reveal-delay": `${0.05 * familyIndex}s` } as React.CSSProperties}
              aria-labelledby={`family-${familyIndex}`}
            >
              <h3
                id={`family-${familyIndex}`}
                className="label-mono border-b border-[var(--rule)] pb-3 text-meniscus-600"
              >
                {family}
              </h3>

              <ul className="mt-1">
                {divisions
                  .filter((division) => division.family === family)
                  .map((division) => (
                    <li key={division.slug} className="border-b border-[var(--rule)] last:border-b-0">
                      <Link
                        href={`/research/${division.slug}`}
                        className="group row-interactive -mx-3 block rounded-[var(--radius-control)] px-3 py-3.5"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="flex-1 font-display text-h3 text-ink-950 transition-colors duration-200 group-hover:text-meniscus-600">
                            {division.name}
                          </span>
                          <ArrowRight
                            aria-hidden
                            className="h-4 w-4 shrink-0 -translate-x-1 self-center text-meniscus-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                          />
                        </span>
                        <span className="mt-1 block text-small leading-snug text-neutral-600">
                          {division.overview}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
