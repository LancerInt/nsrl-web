import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Discipline } from "@/content/disciplines";
import { slugify } from "@/lib/utils";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { methodCount } from "./variation";

type Family = Discipline["family"];

/**
 * Editorial framing only — every number and name on this page comes from the
 * content module. These three lines say what the grouping means, nothing more.
 */
const FAMILY_NOTES: Record<Family, string> = {
  "Safety & toxicology":
    "The divisions that establish what a substance does to a living system, and the dose at which it starts doing it.",
  "Analytical & discovery":
    "The divisions that identify, quantify and trace. Every safety conclusion elsewhere in the laboratory rests on a number produced here.",
  "Applied & specialist":
    "Divisions built around a particular problem — an insect, a device, an animal facility, or a study no guideline was written to cover.",
};

/**
 * One family of divisions, set as a ruled register rather than a card grid.
 *
 * The heading rail is sticky so the family stays named while the visitor reads
 * down the rows; each row is a single link carrying the division's number,
 * name, summary, headline claim and its specification counts.
 */
export function FamilyLedger({
  family,
  index,
  items,
  tone,
}: {
  family: Family;
  index: string;
  items: Discipline[];
  tone: "canvas" | "sunken";
}) {
  // The anchor is derived from the family name, not its position, so the jump
  // links in the finder keep working if a family is ever reordered.
  const id = slugify(family);

  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-heading`} className="scroll-mt-[var(--nav-h)]">
      <SectionBody>
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:rail-sticky">
              <Eyebrow index={index}>Family</Eyebrow>

              <h2 id={`${id}-heading`} className="mt-7 font-display text-d4 text-ink-950">
                <RevealText as="span" className="block">
                  {family}
                </RevealText>
              </h2>

              <p className="label-mono mt-6 text-ink-700">
                {items.length} divisions
              </p>
              <p className="mt-6 max-w-[34ch] text-small text-neutral-600">
                {FAMILY_NOTES[family]}
              </p>
            </div>
          </div>

          <ol className="col-span-12 lg:col-span-8 lg:col-start-5">
            {items.map((discipline, i) => (
              <li key={discipline.slug}>
                <LedgerRow discipline={discipline} delay={i * 0.06} />
              </li>
            ))}
            <li aria-hidden className="border-t border-ink-900/12" />
          </ol>
        </div>
      </SectionBody>
    </Section>
  );
}

function LedgerRow({ discipline, delay }: { discipline: Discipline; delay: number }) {
  const facts: { label: string; value: string }[] = [
    {
      label: discipline.claim.unit ?? "Claim",
      value: discipline.claim.value,
    },
    { label: "Methods", value: String(methodCount(discipline)) },
  ];

  if (discipline.guidelines?.length) {
    facts.push({ label: "Guidelines", value: String(discipline.guidelines.length) });
  }
  if (discipline.species?.length) {
    facts.push({ label: "Species", value: String(discipline.species.length) });
  }

  return (
    <Link
      href={`/research/${discipline.slug}`}
      data-reveal
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-5 border-t border-ink-900/12 py-[clamp(1.75rem,3.2vw,2.75rem)] transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:border-ink-900/40 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-x-8"
    >
      <span className="label-mono pt-2 tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-700">
        {discipline.index}
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-[clamp(1.5rem,2.7vw,2.375rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink-950 transition-colors duration-500 group-hover:text-ink-700">
          {discipline.name}
        </h3>

        <p className="measure mt-3.5 text-small text-neutral-600">{discipline.summary}</p>

        <dl className="mt-7 flex flex-wrap items-baseline gap-x-9 gap-y-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-baseline gap-2.5">
              <dt className="label-mono text-neutral-600">{fact.label}</dt>
              <dd className="font-display text-h3 tabular-nums text-ink-900">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ArrowUpRight
        aria-hidden
        className="mt-2 hidden h-5 w-5 shrink-0 text-neutral-550 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-700 sm:block"
      />
    </Link>
  );
}
