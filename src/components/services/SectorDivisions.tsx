import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Discipline } from "@/content/disciplines";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The divisions that execute the sector's work, offset in two columns so the
 * eye steps down the page rather than reading a grid of equal tiles. Each entry
 * carries its own claim, because that is the thing a sponsor is buying.
 */
export function SectorDivisions({ divisions }: { divisions: Discipline[] }) {
  return (
    <Section tone="deep" bleed className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-14%] top-1/4 h-[34rem] w-[34rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-ink-500) 45%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative py-[var(--section-y)]">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="03" tone="deep">
              Who runs the work
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              The divisions that carry it.
            </RevealText>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-ink-200">
              Every division below sits inside the same building, the same quality system and the
              same archive, so a programme moves between them without a transfer.
            </p>
            <ActionLink href="/research" variant="text" tone="deep" className="mt-5">
              All thirteen divisions
            </ActionLink>
          </div>
        </div>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-[clamp(2rem,4vw,4.5rem)] md:grid-cols-2">
          {divisions.map((division, i) => (
            <li
              key={division.slug}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
              className="md:[&:nth-child(even)]:mt-[clamp(2rem,5vw,5rem)]"
            >
              <Link
                href={`/research/${division.slug}`}
                className="group flex h-full flex-col border-t border-white/12 py-8 transition-colors duration-500 hover:border-signal-400/60"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="label-mono tabular-nums text-signal-400">
                    {division.index}
                  </span>
                  <span className="label-mono text-ink-300">{division.family}</span>
                </span>

                <span className="mt-6 block font-display text-d4 text-white transition-colors duration-500 group-hover:text-signal-300">
                  {division.shortName ?? division.name}
                </span>

                <span className="mt-4 flex-1 text-small text-ink-200">{division.summary}</span>

                <span className="mt-8 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-small font-medium text-white/85">
                  {division.claim.value}
                  {division.claim.unit ? (
                    <span className="label-mono text-ink-200">{division.claim.unit}</span>
                  ) : null}
                  <ArrowUpRight
                    aria-hidden
                    className="ml-auto h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
