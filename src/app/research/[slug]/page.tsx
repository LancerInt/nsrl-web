import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { disciplines, getDiscipline } from "@/content/disciplines";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn, pad } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { DivisionHeroField } from "@/components/research/DivisionHeroField";
import { ClaimStatement } from "@/components/research/ClaimStatement";
import { CapabilityLedger } from "@/components/research/CapabilityLedger";
import { SpecificationBand } from "@/components/research/SpecificationBand";
import { CredentialStrip } from "@/components/research/CredentialStrip";
import { AdjacentRail } from "@/components/research/AdjacentRail";
import { divisionVariation, methodCount } from "@/components/research/variation";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return disciplines.map((discipline) => ({ slug: discipline.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const discipline = getDiscipline(slug);

  if (!discipline) {
    return { title: "Division not found", robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: discipline.seo.title,
    description: discipline.seo.description,
    path: `/research/${discipline.slug}`,
    keywords: [
      discipline.name,
      discipline.family,
      ...(discipline.guidelines?.slice(0, 6) ?? []),
    ],
  });
}

export default async function DivisionPage({ params }: PageProps) {
  const { slug } = await params;
  const discipline = getDiscipline(slug);
  if (!discipline) notFound();

  const variation = divisionVariation(discipline);
  const methods = methodCount(discipline);

  const hasSpecs = Boolean(
    discipline.guidelines?.length ||
      discipline.species?.length ||
      discipline.instruments?.length,
  );

  /* Section numbering is computed so an absent band never leaves a gap. */
  const order = [
    "overview",
    "claim",
    "capabilities",
    ...(hasSpecs ? ["specifications"] : []),
    "credentials",
    "alongside",
  ];
  const step = (key: string) => pad(order.indexOf(key) + 1);

  /* Hero facts: the claim first, then whatever specification counts exist. */
  const meta: { label: string; value: string }[] = [
    { label: discipline.claim.unit ?? "Claim", value: discipline.claim.value },
    { label: "Listed methods", value: String(methods) },
  ];
  if (discipline.guidelines?.length) {
    meta.push({ label: "Guidelines", value: String(discipline.guidelines.length) });
  }
  if (discipline.species?.length) {
    meta.push({ label: "Species", value: String(discipline.species.length) });
  }
  if (discipline.instruments?.length) {
    meta.push({ label: "Instruments", value: String(discipline.instruments.length) });
  }

  const railFirst = variation.railSide === "left";

  /* Both blocks are built up front so the DOM order always matches the
     visual order, whichever side the orientation rail lands on. */
  const railBlock = (
    <div
      key="rail"
      className={cn(
        "col-span-12 lg:col-span-3",
        railFirst ? "lg:col-start-1" : "lg:col-start-10",
      )}
    >
      <div className="lg:rail-sticky">
        <Eyebrow index={step("overview")}>Overview</Eyebrow>

        <h2 id="overview" className="mt-8 font-display text-d4 text-ink-950">
          <RevealText as="span" className="block">
            The work,{" "}
            <span className="font-editorial font-normal italic tracking-[-0.02em] text-signal-700">
              in outline.
            </span>
          </RevealText>
        </h2>

        <p className="label-mono mt-8 text-neutral-600">Family</p>
        <p className="mt-2 font-display text-h3 text-ink-900">{discipline.family}</p>

        <p className="label-mono mt-7 text-neutral-600">Capability groups</p>
        <p className="mt-2 font-display text-h3 tabular-nums text-ink-900">
          {discipline.capabilities.length}
        </p>
      </div>
    </div>
  );

  const proseBlock = (
    <div
      key="prose"
      className={cn(
        "col-span-12 lg:col-span-8",
        railFirst ? "lg:col-start-5" : "lg:col-start-1",
      )}
    >
      <div className="measure space-y-8 text-lead text-neutral-700">
        {discipline.body.map((paragraph, i) => (
          <p
            key={paragraph.slice(0, 24)}
            data-reveal
            style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: discipline.name,
          description: discipline.seo.description,
          path: `/research/${discipline.slug}`,
          serviceType: discipline.family,
        })}
      />

      <PageHero
        eyebrow={discipline.family}
        index={discipline.index}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: discipline.name },
        ]}
        title={discipline.name}
        lead={discipline.summary}
        meta={meta.slice(0, 4)}
        visual={<DivisionHeroField kind={variation.field} seed={variation.seed} />}
        aside={
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-white/12">
              <SpecimenPlate variant={variation.plate} seed={variation.seed} tone="deep" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-deep/85 to-transparent p-6">
                <span className="label-mono text-white/70">Fig. {discipline.index}</span>
                <span className="label-mono text-signal-400">
                  {variation.plate.replace("-", " ")}
                </span>
              </div>
            </div>
            <figcaption className="label-mono mt-4 text-ink-200">
              Division {discipline.index} of {disciplines.length}
            </figcaption>
          </figure>
        }
      />

      {/* Overview — the orientation rail swaps sides with the division index. */}
      <Section tone="canvas" aria-labelledby="overview">
        <SectionBody>
          <div className="egrid gap-y-12">
            {railFirst ? [railBlock, proseBlock] : [proseBlock, railBlock]}
          </div>
        </SectionBody>
      </Section>

      <ClaimStatement
        claim={discipline.claim}
        align={variation.claimAlign}
        index={step("claim")}
      />

      <Section tone={variation.capabilityTone} aria-labelledby="capabilities">
        <SectionBody>
          <div className="egrid items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow index={step("capabilities")}>Capabilities</Eyebrow>

              <h2 id="capabilities" className="mt-8 font-display text-d3 text-ink-950">
                <RevealText as="span" className="block">
                  {discipline.capabilities.length} groups, {methods} listed methods.
                </RevealText>
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-small text-neutral-600">
                Every method below runs inside the same quality system, against the same
                archive, with the same chain of custody. Study designs are assembled from
                this catalogue rather than improvised around it.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <CapabilityLedger
              groups={discipline.capabilities}
              mode={variation.capabilityMode}
            />
          </div>
        </SectionBody>
      </Section>

      {hasSpecs ? (
        <SpecificationBand
          discipline={discipline}
          index={step("specifications")}
          tone={variation.specTone}
        />
      ) : null}

      <CredentialStrip
        refs={discipline.accreditationRefs}
        index={step("credentials")}
        divisionName={discipline.name}
      />

      <AdjacentRail slugs={discipline.adjacent} index={step("alongside")} />
    </>
  );
}
