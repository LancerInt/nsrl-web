"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ChevronRight } from "lucide-react";

import { disciplines } from "@/content/disciplines";
import { cn } from "@/lib/utils";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * Seven divisions, one shared quality system.
 *
 * This replaces an illustration of eight glass spheres linked to a central
 * module, which was wrong in the only way that mattered: NSRL has seven
 * divisions. A picture that has to be counted to be checked will drift from
 * the content the first time the content changes, so this is built from
 * `disciplines` instead — the same array the research index and the
 * navigation read. The figure cannot show the wrong number of divisions
 * because it does not know the number; it maps.
 *
 * ── Why it looks like this ─────────────────────────────────────────────
 *
 * The first attempt was seven outlined boxes in a two-column grid beside an
 * outlined panel: everything the same weight, nothing drawing the eye, and
 * the selected state carrying the whole design on a tint. It read as a
 * wireframe.
 *
 * What fixes it is contrast of *material*, not more decoration. The list is
 * quiet — no borders at rest, the chosen row lifting onto white paper with
 * a teal rule down its edge — and the answer it produces is a navy card.
 * One dark element in a light section is the anchor the section was
 * missing, and it also puts the division's name and its headline figure on
 * the strongest surface on the page, which is where they belong.
 *
 * Selection is the one interaction here that carries meaning, so it is the
 * one thing that animates: 200ms, inside the 150–300ms band, and nothing
 * moves except colour and a 3px rule.
 *
 * What the links mean is stated on the page, not left to the reader:
 * shared quality system, shared record, shared archive. Not an order of
 * work. Every radial diagram of a laboratory implies a pipeline, and the
 * pipeline reading is the one thing that is untrue.
 */

/* The icons ship from the kit keyed by division slug. If a slug is ever
   renamed, this throws at module load rather than rendering seven broken
   images on the homepage. */
const ICON_SLUGS = [
  "toxicology",
  "ecotoxicology",
  "chemistry",
  "microbiology",
  "entomology",
  "vivarium",
  "custom-studies",
] as const;

const missing = disciplines.filter(
  (d) => !ICON_SLUGS.includes(d.slug as (typeof ICON_SLUGS)[number]),
);
if (missing.length) {
  throw new Error(
    `DivisionNetwork: no supplied icon for ${missing.map((d) => d.slug).join(", ")}. ` +
      `Add the SVG to public/icons/divisions/ and list its slug in ICON_SLUGS.`,
  );
}

export function DivisionNetwork({ className }: { className?: string }) {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  const current = disciplines[selected];

  const runsWith = current.adjacent
    .map((slug) => disciplines.find((d) => d.slug === slug)?.name ?? slug)
    .join(" · ");

  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-10",
        className,
      )}
    >
      {/*
        A plain list of buttons, not nodes arranged in a ring. A ring looks
        more like a network and is worse in every way that counts: it needs
        absolute positioning that breaks at 390px, it gives a keyboard user
        a tab order matching nothing visual, and it implies the circular
        flow the caption underneath then has to deny.
      */}
      <div role="group" aria-label="Choose a division" className="flex flex-col gap-1">
        {disciplines.map((division, i) => {
          const active = i === selected;
          return (
            <button
              key={division.slug}
              type="button"
              aria-pressed={active}
              aria-controls={panelId}
              onClick={() => setSelected(i)}
              className={cn(
                "group relative flex items-center gap-3.5 rounded-[var(--radius-control)] py-2.5 pl-4 pr-3 text-left",
                "transition-[background-color,color,box-shadow] duration-200 ease-[var(--ease-out-quart)]",
                "motion-reduce:transition-none",
                active
                  ? "bg-canvas-raised text-ink-900 shadow-[var(--shadow-sm)]"
                  : "text-neutral-600 hover:bg-canvas-raised/60 hover:text-ink-900",
              )}
            >
              {/* The selected marker. Opacity rather than width, so nothing
                  reflows when the selection moves down the list. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-2 left-0 w-[3px] rounded-full bg-meniscus-500",
                  "transition-opacity duration-200 motion-reduce:transition-none",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
              <Image
                src={`/icons/divisions/icon-${division.slug}.svg`}
                alt=""
                width={26}
                height={26}
                unoptimized
                className={cn(
                  "shrink-0 transition-opacity duration-200 motion-reduce:transition-none",
                  active ? "opacity-100" : "opacity-55 group-hover:opacity-80",
                )}
              />
              <span className="min-w-0 flex-1 text-small font-medium leading-snug">
                {division.shortName ?? division.name}
              </span>
              <ChevronRight
                aria-hidden
                className={cn(
                  "h-4 w-4 shrink-0 transition-opacity duration-200 motion-reduce:transition-none",
                  active ? "text-meniscus-500 opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      {/*
        `aria-live="polite"` because the panel changes without navigation,
        and a screen-reader user pressing a button needs to hear what it
        did. `aria-atomic` so the whole panel is read, not the one word
        that differs.
      */}
      <div
        id={panelId}
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-col rounded-[var(--radius-lg)] bg-deep p-7 text-white sm:p-9"
      >
        <p className="label-mono text-meniscus-300">One shared quality system</p>
        <h3 className="mt-3 font-display text-d3 text-white">{current.name}</h3>
        <p className="measure mt-4 text-lead text-ink-100">{current.overview}</p>

        <dl className="mt-auto grid gap-x-8 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-2">
          <div>
            {/* "Key capability", not "Claim" — `claim` is the content
                layer's field name, and leaking it into the page makes a
                confident statement sound like a caveat. */}
            <dt className="label-mono text-ink-200">
              {current.claim.unit ?? "Key capability"}
            </dt>
            <dd className="mt-2 font-display text-d4 leading-none text-white">
              {current.claim.value}
            </dd>
          </div>
          <div>
            <dt className="label-mono text-ink-200">Runs with</dt>
            <dd className="mt-2 text-small leading-snug text-white">{runsWith}</dd>
          </div>
        </dl>

        <p className="mt-6 text-micro leading-relaxed text-ink-200">
          Shares one test-item record, one archive and one quality system with every other
          division.
        </p>

        <div className="mt-6">
          <ActionLink
            href={`/research/${current.slug}`}
            variant="outline"
            tone="deep"
            size="compact"
          >
            {current.name} in detail
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
