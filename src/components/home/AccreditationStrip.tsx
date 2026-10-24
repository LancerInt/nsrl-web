import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { accreditations } from "@/content/accreditations";
import { cn } from "@/lib/utils";

/* Static strings, because Tailwind reads the source and cannot see a class
   name that is assembled at runtime. */
const COLS: Record<string, Record<number, string>> = {
  sm: { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" },
  lg: { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" },
};

/**
 * Pick the column count that divides the register evenly.
 *
 * The strip was fixed at five columns, which was right for the ten records
 * it had. The register is edited from the content layer, and the moment it
 * held four the grid drew an empty fifth cell with a border round it — a
 * blank box in the middle of a credibility strip. Choosing the first
 * candidate that leaves no remainder means the strip stays a full rectangle
 * whatever the register is trimmed to.
 */
function bestFit(count: number, candidates: number[], breakpoint: "sm" | "lg"): string {
  const exact = candidates.find((n) => count % n === 0) ?? candidates[candidates.length - 1];
  return COLS[breakpoint][Math.min(exact, count)] ?? "";
}

/**
 * The credibility strip. Placed immediately under the recorded figures,
 * because for a regulated laboratory the accreditation list *is* the value
 * proposition — a visitor should not have to scroll to find out whether we
 * are GLP certified.
 *
 * Static, never a marquee: every credential on the page at once, readable at
 * the visitor's pace. Each one routes straight to its published certificate
 * where there is one, and to the register where there is not — the two cases
 * look different on purpose, because "we hold this" and "here is the
 * document" are different claims.
 *
 * No official marks are reproduced. None were supplied, and setting a
 * certification body's logo without its permission is the one thing a page
 * about verifiable evidence must not do.
 */
export function AccreditationStrip() {
  return (
    <section
      aria-labelledby="accredited-under"
      className="border-b border-[var(--rule)] bg-canvas"
    >
      <div className="shell py-[var(--section-y-tight)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
          <h2 id="accredited-under" className="label-mono text-neutral-550">
            Accredited, certified and registered under
          </h2>
          <Link
            href="/downloads"
            className="text-small font-medium text-meniscus-600 underline decoration-meniscus-500/35 underline-offset-[5px] transition-colors duration-200 hover:decoration-meniscus-500"
          >
            All certificates on file
          </Link>
        </div>

        <ul
          className={cn(
            "mt-6 grid grid-cols-2 gap-px border border-[var(--rule)] bg-ink-900/8",
            bestFit(accreditations.length, [3, 2], "sm"),
            bestFit(accreditations.length, [5, 4, 3], "lg"),
          )}
        >
          {accreditations.map((accreditation) => {
            const hasCertificate = Boolean(accreditation.certificateUrl);

            const inner = (
              <>
                <span className="font-display text-h3 text-ink-950">{accreditation.abbr}</span>
                {/* The standard, where the accreditation is to one. "NABL"
                    alone does not tell a visitor the laboratory is
                    accredited to ISO/IEC 17025, and that is the string a
                    reviewer scans for. */}
                {accreditation.standard ? (
                  <span className="mt-1 block text-micro leading-snug text-ink-800">
                    {accreditation.standard}
                  </span>
                ) : null}
                <span className="mt-1.5 block text-micro leading-snug text-neutral-550">
                  {hasCertificate ? "Certificate" : "On the register"}
                </span>
                {hasCertificate ? (
                  <ArrowUpRight
                    aria-hidden
                    className="absolute right-4 top-4 h-3.5 w-3.5 text-meniscus-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                ) : null}
              </>
            );

            return (
              <li key={accreditation.id} className="relative bg-canvas">
                {hasCertificate ? (
                  <a
                    href={accreditation.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${accreditation.name} — ${accreditation.issuer}`}
                    className="group row-interactive relative block h-full px-4 py-4 sm:px-5"
                  >
                    {inner}
                    <span className="sr-only">
                      — {accreditation.name}, opens the certificate in a new tab
                    </span>
                  </a>
                ) : (
                  <Link
                    href="/downloads"
                    title={`${accreditation.name} — ${accreditation.issuer}`}
                    className="group row-interactive relative block h-full px-4 py-4 sm:px-5"
                  >
                    {inner}
                    <span className="sr-only">
                      — {accreditation.name}, no certificate published; see the register
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
