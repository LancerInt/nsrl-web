import type { Metadata } from "next";

import { contact } from "@/content/site";
import {
  disciplineFamilies,
  disciplines,
  disciplinesByFamily,
} from "@/content/disciplines";
import { pageMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";
import { RegisterHeroField } from "@/components/research/RegisterHeroField";
import { FamilyLedger } from "@/components/research/FamilyLedger";
import { AccreditationMatrix } from "@/components/research/AccreditationMatrix";
import { methodCount } from "@/components/research/variation";

export const metadata: Metadata = pageMetadata({
  title: "Scientific Divisions | Thirteen Accredited Research Departments",
  description:
    "The thirteen NSRL research divisions — toxicology, genetic toxicology, ecotoxicology, safety pharmacology, pathology, chemistry, drug discovery, microbiology, radioisotope, entomology, medical device testing, vivarium and custom studies — with the accreditations each works under.",
  path: "/research",
  keywords: [
    "preclinical research divisions",
    "GLP toxicology laboratory",
    "ecotoxicology testing",
    "medical device testing",
    "contract research organisation India",
  ],
});

/* Counts are derived from the content module, never asserted independently. */
const listedMethods = disciplines.reduce(
  (total, discipline) => total + methodCount(discipline),
  0,
);
const citedGuidelines = new Set(
  disciplines.flatMap((discipline) => discipline.guidelines ?? []),
).size;

export default function ResearchIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Scientific divisions"
        index={String(disciplines.length)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
        title="Thirteen divisions, set out in full."
        lead="Each division holds its own accreditations, its own instrument estate and its own species list. They share one campus, one quality system and one archive — which is why a programme can cross between them without a handover."
        meta={[
          { label: "Divisions", value: String(disciplines.length) },
          { label: "Families", value: String(disciplineFamilies.length) },
          { label: "Listed methods", value: String(listedMethods) },
          { label: "Guidelines cited", value: String(citedGuidelines) },
        ]}
        visual={<RegisterHeroField />}
      />

      {/* The register, family by family. Chapters alternate light and sunken. */}
      {disciplineFamilies.map((family, i) => (
        <FamilyLedger
          key={family}
          family={family}
          index={pad(i + 1)}
          items={disciplinesByFamily(family)}
          tone={i % 2 === 0 ? "canvas" : "sunken"}
        />
      ))}

      <AccreditationMatrix />

      <Section tone="canvas" aria-labelledby="route-in">
        <SectionBody>
          <div className="egrid items-end gap-y-8">
            <div className="col-span-12 lg:col-span-6">
              <Eyebrow index="05">Where to start</Eyebrow>

              <h2 id="route-in" className="mt-6 font-display text-d3 text-ink-950">
                <RevealText as="span" className="block">
                  Not sure which division owns your question?
                </RevealText>
              </h2>

              <p className="measure mt-6 text-lead text-neutral-600">
                Most of them touch three or four. Tell us what you need to prove and to
                which authority, and we will map it back to the divisions that can prove it
                — and to the guideline numbers a reviewer will look for.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ActionLink href="/contact" variant="solid" >
                  Request a proposal
                </ActionLink>
                <ActionLink href="/products" variant="outline">
                  Study packages
                </ActionLink>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div className="border-t border-ink-900/12 pt-8">
                <p className="label-mono text-neutral-600">Direct line</p>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="mt-4 block font-display text-h1 text-ink-950 transition-colors duration-400 hover:text-ink-700"
                >
                  {contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 block text-small text-neutral-600 transition-colors duration-400 hover:text-ink-950"
                >
                  {contact.email}
                </a>
                <p className="mt-6 max-w-[30ch] text-small text-neutral-600">
                  {contact.formNote}
                </p>
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>
    </>
  );
}
