import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { getIndustry, industries } from "@/content/industries";
import { getDiscipline, type Discipline } from "@/content/disciplines";
import { imageFor, sectorImage } from "@/content/imagery";
import { PageHero } from "@/components/ui/PageHero";
import { PageNav } from "@/components/ui/PageNav";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { SectorHeroVisual } from "@/components/services/SectorHeroVisual";
import { SectorBrief } from "@/components/services/SectorBrief";
import { ServiceGroupSpec } from "@/components/services/ServiceGroupSpec";
import { SectorDivisions } from "@/components/services/SectorDivisions";
import { SectorClosing } from "@/components/services/SectorClosing";

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
      description: "This sector page does not exist. Browse the sectors NSRL serves.",
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

  const divisions: Discipline[] = industry.divisions
    .map((divisionSlug) => getDiscipline(divisionSlug))
    .filter((division): division is Discipline => Boolean(division));

  const photo = imageFor(sectorImage, industry.slug);

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
        eyebrow="Sector"
        index={industry.index}
        title={
          <>
            <span className="block">{industry.name}</span>
            <span className="mt-6 block max-w-[22ch] font-display text-editorial text-ink-800">
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
          <figure className="relative img-frame aspect-[4/3]">
            <SpecimenPlate
              src={photo.src}
              alt={photo.alt}
              position={photo.position}
              sizes="(min-width: 1024px) 33vw, 100vw"
              priority
            />
          </figure>
        }
      />

      <PageNav
        items={[
          { href: "#programme", label: "The programme" },
          { href: "#catalogue", label: "Study catalogue" },
          { href: "#divisions", label: "Divisions" },
          { href: "#proposal", label: "Request a proposal" },
        ]}
      />

      <SectorBrief industry={industry} />
      <ServiceGroupSpec industry={industry} />
      <SectorDivisions divisions={divisions} />
      <SectorClosing industry={industry} />
    </>
  );
}
