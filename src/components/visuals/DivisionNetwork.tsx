"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

import { disciplines } from "@/content/disciplines";
import { cn } from "@/lib/utils";

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
 * It is also a selector rather than a diagram. The supplied
 * `shared-quality-network.svg` is a static version of the same idea, and
 * the kit's `SampleJourney.tsx` is the behaviour reference: choosing a
 * division highlights it and states what it holds in common with the
 * others. Selection is the one interaction here that carries meaning, so
 * it is the one thing that animates.
 *
 * What the links mean is stated on the page, not left to the reader:
 * shared quality system, shared record, shared archive. Not an order of
 * work. Every radial diagram of a laboratory implies a pipeline, and the
 * pipeline reading is the one thing that is untrue — which divisions a
 * programme engages, and in what order, follows from the dossier it has to
 * satisfy.
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

const missing = disciplines.filter((d) => !ICON_SLUGS.includes(d.slug as (typeof ICON_SLUGS)[number]));
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

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8", className)}>
      {/*
        Real buttons in a plain grid, not nodes positioned around a ring.
        A ring looks more like the supplied SVG and is worse in every way
        that counts: it needs absolute positioning that breaks at 390px, it
        gives a keyboard user a tab order that matches nothing visual, and
        it implies the circular flow the caption then has to deny.
      */}
      <div role="group" aria-label="Choose a division" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                "flex items-center gap-3 rounded-[--radius-control] border px-4 py-3 text-left",
                "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-out-quart)]",
                "motion-reduce:transition-none",
                active
                  ? "border-meniscus-500 bg-meniscus-100 text-ink-900"
                  : "border-[--rule] bg-canvas-raised text-neutral-600 hover:border-neutral-300 hover:text-ink-900",
              )}
            >
              <Image
                src={`/icons/divisions/icon-${division.slug}.svg`}
                alt=""
                width={28}
                height={28}
                unoptimized
                className="shrink-0"
              />
              <span className="text-small font-medium leading-snug">
                {division.shortName ?? division.name}
              </span>
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
        className="flex flex-col rounded-[--radius-card] border border-[--rule] bg-canvas-sunken p-6 sm:p-7"
      >
        <p className="label-mono text-meniscus-600">One shared quality system</p>
        <h3 className="mt-3 font-display text-d4 text-ink-900">{current.name}</h3>
        <p className="mt-3 text-body text-neutral-600">{current.summary}.</p>

        <dl className="mt-5 border-t border-[--rule] pt-4 text-small">
          <div className="flex gap-3 py-1">
            <dt className="w-28 shrink-0 text-neutral-550">Shares</dt>
            <dd className="text-ink-900">One test-item record, one archive, one quality system</dd>
          </div>
          <div className="flex gap-3 py-1">
            <dt className="w-28 shrink-0 text-neutral-550">Runs with</dt>
            <dd className="text-ink-900">
              {current.adjacent
                .map((slug) => disciplines.find((d) => d.slug === slug)?.name ?? slug)
                .join(", ")}
            </dd>
          </div>
        </dl>

        <Link
          href={`/research/${current.slug}`}
          className="mt-5 self-start text-small font-medium text-meniscus-600 underline decoration-meniscus-300 underline-offset-4 transition-colors duration-200 hover:decoration-meniscus-600 motion-reduce:transition-none"
        >
          {current.name} in detail
        </Link>
      </div>
    </div>
  );
}
