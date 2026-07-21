import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { getIndustry, industries } from "@/content/industries";
import { getDiscipline, type Discipline } from "@/content/disciplines";
import { PageHero } from "@/components/ui/PageHero";
import { SpecimenPlate, type PlateVariant } from "@/components/visuals/SpecimenPlate";
import { SectorHeroVisual } from "@/components/services/SectorHeroVisual";
import { SectorBrief } from "@/components/services/SectorBrief";
import { ServiceGroupSpec } from "@/components/services/ServiceGroupSpec";
import { SectorDivisions } from "@/components/services/SectorDivisions";
import { SectorClosing } from "@/components/services/SectorClosing";

/** One figure per sector, fixed by position so a sector always draws the same. */
const PLATES: PlateVariant[] = ["wave", "lattice", "orbital", "chromatogram", "gradient-well"];

type SectorPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return pageMetadata({
      title: "Sector not found",
      description: "This sector page does not exist. Browse the five sectors NSRL serves.",
      path: "/services",
    });
  }

  return pageMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: `/services/${industry.slug}`,
    keywords: industry.frameworks,
  });
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  const position = industries.findIndex((entry) => entry.slug === industry.slug);
  const divisions: Discipline[] = industry.divisions
    .map((divisionSlug) => getDiscipline(divisionSlug))
    .filter((division): division is Discipline => Boolean(division));

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `${industry.name} preclinical study programme`,
          description: industry.seo.description,
          path: `/services/${industry.slug}`,
          serviceType: `${industry.name} regulatory testing`,
        })}
      />

      <PageHero
        tone="deep"
        eyebrow="Sector"
        index={industry.index}
        title={
          <>
            <span className="block">{industry.name}</span>
            <span className="mt-6 block max-w-[22ch] font-editorial text-editorial font-normal italic text-signal-300">
              {industry.promise}
            </span>
          </>
        }
        lead={`${industry.summary}.`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: industry.name },
        ]}
        meta={[
          { label: "Study groups", value: String(industry.serviceGroups.length) },
          { label: "Divisions engaged", value: String(divisions.length) },
          { label: "Frameworks", value: String(industry.frameworks.length) },
        ]}
        visual={<SectorHeroVisual />}
        aside={
          <figure className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/12">
            <div className="aspect-[4/3]">
              <SpecimenPlate
                variant={PLATES[position % PLATES.length]}
                seed={position + 3}
                tone="deep"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-deep/90 to-transparent p-5">
              <span className="label-mono text-white/75">Fig. {industry.index}</span>
              <span className="label-mono text-signal-400">{industry.name}</span>
            </figcaption>
          </figure>
        }
      />

      <SectorBrief industry={industry} />
      <ServiceGroupSpec industry={industry} />
      <SectorDivisions divisions={divisions} />
      <SectorClosing industry={industry} />
    </>
  );
}
