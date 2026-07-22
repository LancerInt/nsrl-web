import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  summary: string;
  claim: { value: string; unit?: string; caption: string };
};

/**
 * The thirteen divisions as an airy three-column index. Each entry is a link
 * that lifts on hover; the only rule is a whisper between rows. Every
 * division is visible at once, which is what a directory is for.
 */
export function DivisionIndex({ divisions }: { divisions: DivisionRow[] }) {
  return (
    <section className="bg-canvas-sunken py-[var(--section-y)] text-ink-950">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5" data-reveal>
          <div>
            <Eyebrow index="02">Scientific divisions</Eyebrow>
            <h2 className="mt-6 font-display text-d2 text-ink-950">
              Thirteen divisions, one chain of custody.
            </h2>
          </div>
          <ActionLink href="/research" variant="text" className="mb-1">
            All divisions
          </ActionLink>
        </div>

        <ul
          data-reveal
          style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
          className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {divisions.map((discipline) => (
            <li key={discipline.slug}>
              <Link
                href={`/research/${discipline.slug}`}
                className="group flex items-center gap-4 rounded-[var(--radius-card)] px-4 py-4 transition-colors duration-300 hover:bg-canvas-raised"
              >
                <span className="label-mono w-7 shrink-0 tabular-nums text-neutral-550">
                  {discipline.index}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-h2 text-ink-950">
                    {discipline.name}
                  </span>
                  <span className="label-mono mt-1 block text-neutral-550">
                    {discipline.family}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-neutral-400 transition-all duration-300 group-hover:text-ink-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
