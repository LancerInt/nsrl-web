import type { Metadata } from "next";

import { site } from "@/content/site";
import { disciplines } from "@/content/disciplines";
import { leadership, positioning } from "@/content/organisation";
import {
  accreditations,
  getAccreditation,
  type Accreditation,
} from "@/content/accreditations";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { AboutHeroVisual } from "@/components/about/AboutHeroVisual";
import { AboutOpening } from "@/components/about/AboutOpening";
import { ScaleLedger } from "@/components/about/ScaleLedger";
import { QualitySystem } from "@/components/about/QualitySystem";
import { ThreeRsBand } from "@/components/about/ThreeRsBand";
import { LeadershipPanel } from "@/components/about/LeadershipPanel";
import { AccreditationSummary } from "@/components/about/AccreditationSummary";
import { MilestoneStair } from "@/components/about/MilestoneStair";

const description =
  "NSRL is a one-stop preclinical contract research organisation in Tamil Nadu: thirteen scientific divisions under one quality system, one archive and one chain of custody, governed by OECD GLP, NABL ISO/IEC 17025 and AAALAC accreditation.";

export const metadata: Metadata = pageMetadata({
  title: "About NSRL — one laboratory, thirteen divisions",
  description,
  path: "/about",
});

/** The three accreditations that govern how every study in the building runs. */
const governing = ["glp", "nabl", "aaalac"]
  .map((id) => getAccreditation(id))
  .filter((item): item is Accreditation => Boolean(item));

function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}/about#page`,
    url: `${site.url}/about`,
    name: `About ${site.name}`,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organisation` },
    mainEntity: {
      "@type": "Organization",
      "@id": `${site.url}/#organisation`,
      name: site.name,
      legalName: site.legalName,
      slogan: site.tagline,
      description: positioning.lead,
      founder: leadership.map((leader) => ({
        "@type": "Person",
        name: leader.name,
        jobTitle: leader.role,
        description: leader.bio,
        worksFor: { "@id": `${site.url}/#organisation` },
      })),
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />

      <PageHero
        eyebrow="About NSRL"
        title={
          <>
            Who we are, in the terms
            <br />a regulator would use.
          </>
        }
        lead={site.shortDescription}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        meta={[
          { label: "Legal name", value: site.legalName },
          { label: "Divisions", value: String(disciplines.length) },
          { label: "Certificates on file", value: String(accreditations.length) },
        ]}
        visual={<AboutHeroVisual />}
        aside={
          <div className="card-elevated p-7">
            <h2 className="label-mono text-neutral-550">Governed by</h2>
            <dl className="mt-5">
              {governing.map((item) => (
                <div
                  key={item.id}
                  className="border-t border-[var(--rule)] py-4 first:border-t-0 first:pt-0"
                >
                  <dt className="font-display text-h3 text-ink-950">{item.abbr}</dt>
                  <dd className="mt-1.5 text-micro leading-relaxed text-neutral-600">
                    {item.issuer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <AboutOpening />
      <ScaleLedger />
      <QualitySystem />
      <ThreeRsBand />
      <LeadershipPanel />
      <AccreditationSummary />
      <MilestoneStair />
    </>
  );
}
