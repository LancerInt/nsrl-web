import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { images, sectorImage, type ImageKey } from "@/content/imagery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * The shallow projection of an industry this section renders.
 *
 * Declared here and built on the server in `app/page.tsx`. The industry module
 * carries body copy, service group trees and SEO strings none of which this
 * card needs. `frameworks` arrives already trimmed to what the card displays.
 */
export type SectorCard = {
  slug: string;
  index: string;
  name: string;
  promise: string;
  summary: string;
  frameworks: string[];
};

const FALLBACK: ImageKey = "chemistryBench";

/**
 * The five regulated sectors as elevated image cards. Each carries a
 * photograph, lifts on hover, and routes to its sector page — the premium
 * pattern, not a pinned horizontal scroller.
 */
export function SectorScroll({ sectors }: { sectors: SectorCard[] }) {
  return (
    <section className="bg-canvas py-[var(--section-y)] text-ink-950">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5" data-reveal>
          <div>
            <Eyebrow index="03">Sectors we serve</Eyebrow>
            <h2 className="mt-6 font-display text-d2 text-ink-950">
              Five regulatory worlds, one evidence base.
            </h2>
          </div>
          <ActionLink href="/services" variant="text" className="mb-1">
            All sectors
          </ActionLink>
        </div>

        <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <li
              key={sector.slug}
              data-reveal
              style={{ "--reveal-delay": `${0.06 * i}s` } as React.CSSProperties}
            >
              <Link
                href={`/services/${sector.slug}`}
                className="group card-elevated flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SpecimenPlate
                    src={images[sectorImage[sector.slug] ?? FALLBACK].src}
                    alt={images[sectorImage[sector.slug] ?? FALLBACK].alt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="label-mono text-neutral-550">{sector.index}</span>
                  <span className="mt-2 font-display text-h1 text-ink-950">{sector.name}</span>
                  <span className="mt-2 flex-1 text-small text-neutral-600">{sector.promise}</span>
                  <span className="mt-5 inline-flex items-center gap-2 font-sans text-[0.875rem] font-medium text-ink-900">
                    View programmes
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
