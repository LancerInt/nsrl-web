import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { images, sectorImage, type ImageKey } from "@/content/imagery";
import { cn } from "@/lib/utils";
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
 * The five regulated sectors, and the first real decision the page asks a
 * visitor to make — which is why it comes early rather than last.
 *
 * Two lead cards then three: five equal cards in a three-column grid leave a
 * two-card orphan row, and the ragged edge reads as a layout that ran out of
 * content. Giving the two largest programmes the wide frames makes the
 * asymmetry a choice. Every card carries the same photographic treatment,
 * the same 16:10 frame and the same link, so the hierarchy is scale alone.
 */
export function SectorGrid({ sectors }: { sectors: SectorCard[] }) {
  const [first, second, ...rest] = sectors;
  const lead = [first, second].filter(Boolean);

  return (
    <section className="bg-canvas py-[var(--section-y)] text-ink-950" aria-labelledby="sectors">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5" data-reveal>
          <div>
            <Eyebrow>Sectors we serve</Eyebrow>
            <h2 id="sectors" className="mt-5 max-w-[20ch] font-display text-d2 text-ink-950">
              Five regulatory worlds, one evidence base.
            </h2>
          </div>
          <p className="max-w-[38ch] text-small text-neutral-600">
            The endpoints, guidelines and species in a programme follow from the authority that
            has to approve it. Start with the dossier you have to file.
          </p>
        </div>

        <ul className="mt-[clamp(2rem,3.2vw,3rem)] grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {lead.map((sector, i) => (
            <SectorTile
              key={sector.slug}
              sector={sector}
              size="lead"
              delay={0.05 * i}
              className="lg:col-span-3"
            />
          ))}
          {rest.map((sector, i) => (
            <SectorTile
              key={sector.slug}
              sector={sector}
              size="rest"
              delay={0.05 * (i + 2)}
              className="lg:col-span-2"
            />
          ))}
        </ul>

        <div className="mt-8" data-reveal>
          <ActionLink href="/services" variant="text">
            How a programme is assembled
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

function SectorTile({
  sector,
  size,
  delay,
  className,
}: {
  sector: SectorCard;
  size: "lead" | "rest";
  delay: number;
  className?: string;
}) {
  const key = sectorImage[sector.slug] ?? FALLBACK;
  const image = images[key];
  const isLead = size === "lead";

  return (
    <li
      data-reveal
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      className={className}
    >
      <Link
        href={`/services/${sector.slug}`}
        className="group card-elevated card-interactive flex h-full flex-col overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <SpecimenPlate
            src={image.src}
            alt={image.alt}
            position={image.position}
            sizes={
              isLead
                ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
          />
          {/* A navy foot on every frame, so photographs of very different
              exposure still hand off to the card below them the same way. */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/55 to-transparent"
          />
        </div>

        <div className={cn("flex flex-1 flex-col", isLead ? "p-6 sm:p-7" : "p-5 sm:p-6")}>
          <span
            className={cn(
              "font-display text-ink-950",
              isLead ? "text-h1" : "text-h2",
            )}
          >
            {sector.name}
          </span>

          {/* `summary`, not `promise`. The promise line is the brochure
              sentence — "growing a sustainable future through innovative
              solutions" — which is true of any agrochemical business and
              tells a registration manager nothing. The summary is the scope:
              what is actually tested, in the words the dossier uses. */}
          <span className="mt-2 text-small leading-snug text-neutral-600">
            {sector.summary}.
          </span>

          {isLead ? (
            <span className="mt-4 flex flex-wrap gap-1.5">
              {sector.frameworks.map((framework) => (
                <span
                  key={framework}
                  className="label-mono rounded-[var(--radius-control)] bg-canvas-sunken px-2 py-1 text-neutral-600"
                >
                  {framework}
                </span>
              ))}
            </span>
          ) : null}

          {/* `mt-auto` rather than a fixed margin: the summaries are close in
              length but not identical, and the links have to sit on one line
              across the row whatever the copy does. */}
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.875rem] font-medium text-meniscus-600">
            View programmes
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </li>
  );
}
