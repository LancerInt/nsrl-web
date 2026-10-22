"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { contact } from "@/content/site";

/**
 * The searchable projection of a division. Built on the server in
 * `app/research/page.tsx` so the capability trees, body copy and SEO strings
 * the register renders from never cross into the client bundle — only the
 * handful of strings a query is matched against.
 */
export type FinderEntry = {
  slug: string;
  name: string;
  family: string;
  summary: string;
  /** Guideline numbers, species and method names, lower-cased and joined. */
  terms: string;
};

export type FinderFamily = {
  /** Anchor on the register section for this family. */
  id: string;
  name: string;
  count: number;
};

/**
 * Two ways into the division register, offered together.
 *
 * Jump links for the visitor who knows which family they want — plain
 * anchors, so they work with the bundle blocked and they survive a page that
 * never hydrates. Search for the visitor who knows the endpoint but not the
 * department, which is the more common case: "earthworm", "OECD 203" and
 * "sterility" all land on the division that runs them.
 *
 * The register itself is always rendered below this, whatever the query. The
 * finder adds a route into the page; it never becomes the only one.
 */
export function DivisionFinder({
  entries,
  families,
}: {
  entries: FinderEntry[];
  families: FinderFamily[];
}) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const resultsId = useId();

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (trimmed.length < 2) return null;
    // Every whitespace-separated word must appear somewhere in the record, so
    // "oecd earthworm" narrows rather than widens.
    const words = trimmed.split(/\s+/);
    return entries.filter((entry) => {
      const haystack = `${entry.name} ${entry.family} ${entry.summary} ${entry.terms}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [entries, trimmed]);

  return (
    <section
      aria-label="Find a division"
      className="border-y border-ink-900/8 bg-canvas-sunken"
    >
      <div className="shell py-[var(--section-y-tight)]">
        <div className="grid gap-x-12 gap-y-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Search */}
          <div>
            <label htmlFor={inputId} className="label-mono text-neutral-600">
              Search the divisions
            </label>
            <div className="relative mt-3">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-550"
              />
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Earthworm, OECD 203, sterility…"
                autoComplete="off"
                aria-describedby={`${inputId}-hint`}
                aria-controls={resultsId}
                className="h-[var(--control-h)] w-full rounded-[var(--radius-control)] border border-ink-900/15 bg-canvas-raised pl-11 pr-11 text-small text-ink-950 transition-colors duration-200 placeholder:text-neutral-550 hover:border-ink-900/30 focus:border-meniscus-500 focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-[var(--radius-control)] text-neutral-550 transition-colors duration-200 hover:bg-ink-900/6 hover:text-ink-900"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            <p id={`${inputId}-hint`} className="mt-2.5 text-micro text-neutral-600">
              Matches division names, summaries, guideline numbers, species and method names.
            </p>

            {/* The route out for a visitor whose study does not land on one
                division — most cross three or four. This used to be a
                closing band at the foot of the page, which put it after
                everything and directly above the site-wide proposal
                section. It belongs here, at the moment the question is
                actually being asked. */}
            <p className="mt-4 text-small text-neutral-600">
              Most programmes touch three or four divisions. If yours does not land on one,{" "}
              <a
                href={`tel:${contact.phoneHref}`}
                className="font-medium text-meniscus-600 underline decoration-meniscus-500/35 underline-offset-[5px] transition-colors duration-200 hover:decoration-meniscus-500"
              >
                call {contact.phoneDisplay}
              </a>{" "}
              or{" "}
              <Link
                href="/contact"
                className="font-medium text-meniscus-600 underline decoration-meniscus-500/35 underline-offset-[5px] transition-colors duration-200 hover:decoration-meniscus-500"
              >
                tell us what you need to prove
              </Link>
              .
            </p>
          </div>

          {/* Jump links */}
          <nav aria-label="Division families">
            <p className="label-mono text-neutral-600">Or jump to a family</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {families.map((family) => (
                <li key={family.id}>
                  <a
                    href={`#${family.id}`}
                    className="group card-elevated card-interactive flex h-full flex-col justify-between gap-3 px-4 py-3.5"
                  >
                    <span className="font-display text-h3 text-ink-950 transition-colors duration-200 group-hover:text-meniscus-600">
                      {family.name}
                    </span>
                    <span className="label-mono text-neutral-550">
                      {family.count} divisions
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Results. Rendered in place rather than replacing the register, and
            announced politely so a screen-reader user hears the count change
            without losing their place in the field. */}
        <div id={resultsId} aria-live="polite" className="empty:hidden">
          {results ? (
            <div className="mt-8 border-t border-ink-900/10 pt-6">
              <p className="label-mono text-neutral-600">
                {results.length === 0
                  ? "No division matches that"
                  : `${results.length} ${results.length === 1 ? "division" : "divisions"} match “${query.trim()}”`}
              </p>

              {results.length === 0 ? (
                <p className="mt-3 max-w-[56ch] text-small text-neutral-600">
                  Try a guideline number, a species or an endpoint — or{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-meniscus-600 underline decoration-meniscus-500/35 underline-offset-[5px] hover:decoration-meniscus-500"
                  >
                    ask us which division owns the question
                  </Link>
                  .
                </p>
              ) : (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((entry) => (
                    <li key={entry.slug}>
                      <Link
                        href={`/research/${entry.slug}`}
                        className={cn(
                          "group card-elevated card-interactive flex h-full flex-col gap-1.5 px-4 py-3.5",
                        )}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-display text-h3 text-ink-950 transition-colors duration-200 group-hover:text-meniscus-600">
                            {entry.name}
                          </span>
                          <ArrowRight
                            aria-hidden
                            className="h-4 w-4 shrink-0 -translate-x-1 text-meniscus-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                          />
                        </span>
                        <span className="label-mono text-neutral-550">{entry.family}</span>
                        <span className="text-small leading-snug text-neutral-600">
                          {entry.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
