import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { disciplines, getDiscipline } from "@/content/disciplines";
import { imageFor, divisionImage } from "@/content/imagery";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn, numberWord, pad } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { PageNav, type PageNavItem } from "@/components/ui/PageNav";
import { ActionLink } from "@/components/ui/ActionLink";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { DivisionHeroField } from "@/components/research/DivisionHeroField";
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
  const divisionPhoto = imageFor(divisionImage, discipline.slug);

  const hasSpecs = Boolean(
    discipline.guidelines?.length ||
      discipline.species?.length ||
      discipline.instruments?.length,
  );

  /* Section numbering is computed so an absent band never leaves a gap. */
  const order = [
    "overview",
    "capabilities",
    ...(hasSpecs ? ["specifications"] : []),
    "credentials",
    "alongside",
  ];
  const step = (key: string) => pad(order.indexOf(key) + 1);

  /* The contents strip is derived from the same `order` array, so a division
     with no specification band never offers a link to one. */
  const NAV_LABELS: Record<string, string> = {
    overview: "Overview",
    capabilities: "Capabilities",
    specifications: "Specifications",
    credentials: "Accreditations",
    alongside: "Works alongside",
  };
  const navItems: PageNavItem[] = order.map((key) => ({
    href: `#${key}`,
    label: NAV_LABELS[key],
  }));

  /* Hero facts: the claim first, then whatever specification counts exist. */
  const meta: { label: string; value: string }[] = [
    { label: discipline.claim.unit ?? "Key capability", value: discipline.claim.value },
    { label: "Listed methods", value: String(methods) },
  ];
  if (discipline.guidelines?.length) {
    meta.push({ label: "Guidelines", value: String(discipline.guidelines.length) });
  }
  /* `> 1` for the same reason as the register: entomology's entry is one
     general statement, so the hero was reporting "Species · 1". A count is
     only worth showing when it counts something. */
  if (discipline.species && discipline.species.length > 1) {
    meta.push({ label: discipline.speciesLabel ?? "Species", value: String(discipline.species.length) });
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

        <h2 id="overview" className="mt-6 font-display text-d4 text-ink-950">
          <RevealText as="span" className="block">
            {discipline.name},{" "}
            <span className="font-display text-ink-800">in overview.</span>
          </RevealText>
        </h2>

        <p className="label-mono mt-6 text-neutral-600">Discipline group</p>
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
      <div className="measure space-y-6 text-lead text-neutral-700">
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
        visual={<DivisionHeroField family={discipline.family} />}
        /* Named for the division rather than a generic "Contact us", so a
           reader on the Ecotoxicology page is offered an ecotoxicology
           conversation. The destination is the existing enquiry route; no
           new submission behaviour is implied. */
        actions={
          <ActionLink href="/contact" variant="solid">
            {/* "an ecotoxicology study", not "a". Chosen on the sound of the
                division's first letter rather than hardcoded, so the seventh
                division to be added gets it right too. Vowel-letter is the
                right test here because every division name that begins with
                one also begins with a vowel sound. */}
            Discuss {/^[aeiou]/i.test(discipline.name) ? "an" : "a"}{" "}
            {discipline.name.toLowerCase()} study
          </ActionLink>
        }
        aside={
          <figure className="mx-auto max-w-[17rem] self-start lg:mx-0">
            {/*
              Still 4:5 — the delivered ratio of the editorial stills
              (1122×1402) and the kit's recommendation for this slot — but
              presented smaller rather than cropped.

              At the column's full 364px a 4:5 frame is 455px tall, and
              with its caption the figure ran to 528px against a left
              column of text that needed rather less. The grid row took the
              taller of the two, so the surplus showed as dead space under
              the heading, lead, metrics and action.

              Capping the figure at 19rem brings the image to about 380px,
              inside the 340–400 asked for, and keeps the full portrait
              composition: the microscope, the fish tank and the root
              system are all still whole. Cropping to a landscape at this
              width would have cut the subject out of three of the images
              to save the same 70px.

              `sizes` follows the new rendered width — about 19rem at
              desktop rather than 32vw — so the slot stops asking for a
              file wider than it can show.
            */}
            <div className="relative aspect-[4/5] img-frame">
              <SpecimenPlate
                src={divisionPhoto.src}
                alt={divisionPhoto.alt}
                position={divisionPhoto.position}
                sizes="(min-width: 1024px) 17rem, (min-width: 640px) 40vw, 90vw"
                priority
              />
            </div>
            <figcaption className="mt-3 space-y-1">
              <span className="label-mono block text-neutral-600">
                Division {discipline.index} of {disciplines.length}
              </span>
              {/* Stated, not implied. None of this artwork documents NSRL's
                  premises or equipment, and a microscope photographed on a
                  bench beside the words "our laboratory" will be read as
                  one unless it says otherwise. */}
              <span className="block text-micro text-neutral-550">
                Conceptual illustration — not a photograph of NSRL equipment or premises.
              </span>
            </figcaption>
          </figure>
        }
      />

      <PageNav items={navItems} />

      {/* Overview — the orientation rail swaps sides with the division index. */}
      <Section tone="canvas" aria-labelledby="overview">
        <SectionBody>
          <div className="egrid gap-y-8">
            {railFirst ? [railBlock, proseBlock] : [proseBlock, railBlock]}
          </div>
        </SectionBody>
      </Section>

      <Section tone={variation.capabilityTone} aria-labelledby="capabilities">
        <SectionBody>
          <div className="egrid items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow index={step("capabilities")}>Capabilities</Eyebrow>

              <h2 id="capabilities" className="mt-6 font-display text-d3 text-ink-950">
                <RevealText as="span" className="block">
                  {numberWord(discipline.capabilities.length, { capitalise: true })}{" "}
                  capability groups. {methods} listed methods.
                </RevealText>
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-small text-neutral-600">
                {discipline.capabilitiesIntro ??
                  "Every method below runs inside the same quality system, against the same archive, with the same chain of custody. Study designs are assembled from this catalogue rather than improvised around it."}
              </p>
            </div>
          </div>

          <div className="mt-6">
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
