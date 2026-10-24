import type { Metadata } from "next";

import { site } from "@/content/site";
import { disciplines } from "@/content/disciplines";
import { positioning } from "@/content/organisation";
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
import { AccreditationSummary } from "@/components/about/AccreditationSummary";
import { MilestoneStair } from "@/components/about/MilestoneStair";

const description =
  "NSRL is a one-stop preclinical contract research organisation in Tamil Nadu: seven scientific divisions under one quality system, one archive and one chain of custody, governed by OECD GLP and NABL ISO/IEC 17025 accreditation.";

export const metadata: Metadata = pageMetadata({
  title: "About NSRL — one laboratory, seven divisions",
  description,
  path: "/about",
});

/** The accreditations that govern how every study in the building runs. */
const governing = ["glp", "nabl"]
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
      /* No `founder`. The page no longer names one, and structured data that
         asserts what the page does not say is the kind of claim this site
         does not make. */
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
            Scientific expertise.
            <br />
            Clear regulatory support.
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
          <div className="card-elevated p-6">
            <h2 className="label-mono text-neutral-550">Governed by</h2>
            <dl className="mt-4">
              {governing.map((item) => (
                <div
                  key={item.id}
                  className="border-t border-[var(--rule)] py-3 first:border-t-0 first:pt-0"
                >
                  {/* The heading is the *standard*, not the accrediting
                      body, wherever there is one. "Governed by" asks what
                      governs the work, and what governs it is ISO/IEC
                      17025:2017 — NABL is who assesses against it. Leading
                      with the body buried the standard a reviewer scans
                      for, first out of the card entirely and then as a
                      sub-line. For OECD GLP the two are the same string, so
                      the heading is unchanged. */}
                  <dt className="font-display text-h3 text-ink-950">
                    {item.standard ?? item.abbr}
                  </dt>
                  {/* Two lines, not three. The issuer was the third, and it
                      is stated in full — with the scope and the certificate
                      link — in the Evidence on file section further down
                      this same page. Repeating it here made the panel the
                      tallest thing in the hero without telling a reader
                      anything they would not meet again. */}
                  <dd className="mt-1 text-small leading-snug text-ink-800">
                    {item.standard ? `${item.abbr} accreditation` : item.name}
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
      <AccreditationSummary />
      <MilestoneStair />
    </>
  );
}
