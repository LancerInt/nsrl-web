import Image from "next/image";

import { scaleStats } from "@/content/organisation";
import { disciplines } from "@/content/disciplines";
import { heroImage, images } from "@/content/imagery";
import { numberWord } from "@/lib/utils";
import { ActionLink } from "@/components/ui/ActionLink";

const hero = images[heroImage];

/**
 * The opening.
 *
 * A light editorial split, not a dark full-bleed poster: navy type on warm
 * white at the left, the supplied still life at the right, and the whole
 * thing sized so the headline, the scope sentence and both actions are in
 * the first screen on a laptop.
 *
 * Deliberately *not* 100vh. A viewport-height hero makes the first scroll
 * reveal nothing but more hero, and on a short laptop window it pushes the
 * scope sentence under the fold — the one line that says what NSRL
 * actually does.
 *
 * The recorded figures are a separate strip beneath rather than a rail
 * floating on the artwork. They are evidence, and evidence reads as
 * evidence when it is set on paper next to the claim, not overlaid on a
 * photograph of a bench.
 */
export function HomeHero() {
  return (
    <>
      {/*
        Stacked below `lg`, split at and above it — copy on the left half,
        artwork bleeding off the right edge.

        Stacked means copy *then* image, in that order, rather than the copy
        compressed over the subject: the still life has one usable empty
        region and it is at the left, which is no help at all when the frame
        is 390px wide and the text would have to sit on the vials.
      */}
      {/*
        At `lg` the clearance for the fixed bar moves from the copy to the
        section, so *both* columns start below it.

        With the navy artwork back in the right half, the bar is no longer
        sitting on warm white across its whole width — the "Request a
        proposal" button is at the right, and the button is navy. Navy on
        navy loses the button's edge entirely. Pushing the panel down means
        the bar spans one surface again.
      */}
      <section className="border-b border-[--rule] bg-canvas lg:grid lg:grid-cols-2 lg:items-center lg:pb-10 lg:pt-[calc(var(--nav-h)+1.5rem)]">
        {/*
          `.shell` overridden to hug the right of its half rather than
          centre in it. `ml-auto` with a max of half the measure puts the
          copy's left padding edge exactly where every other section's
          content starts, at any width — the alternative, hand-tuned
          padding, drifts the moment the measure changes.
        */}
        {/*
          The top padding clears the bar rather than being chosen for
          rhythm. The header is `fixed`, so the hero starts at y=0 and
          anything less than its height lands underneath it — which is
          exactly what happened at 390px, where a 40px top padding put the
          eyebrow straight through the wordmark.

          Expressed against `--nav-h` rather than as a number, so it cannot
          drift out of step with the bar it is clearing.
        */}
        <div className="shell pb-[clamp(2.5rem,5vw,4rem)] pt-[calc(var(--nav-h)+1.5rem)] lg:ml-auto lg:mr-0 lg:max-w-[calc(var(--shell-max)/2)] lg:py-0 lg:pr-12">
          <div className="max-w-[34rem]">
            <p className="label-mono text-meniscus-600">
              Contract research organisation · Salem, Tamil Nadu
            </p>

            <h1 className="mt-5 text-d1 font-display text-ink-900">
              Complete preclinical research, start to finish.
            </h1>

            {/* The scope sentence. Around 62 characters a line, inside the
                55–70 the brief asks for. */}
            <p className="mt-6 max-w-[33rem] text-lead text-neutral-600">
              One accredited laboratory, {numberWord(disciplines.length)} scientific
              divisions. A substance that arrives for chemistry moves through
              toxicology, ecotoxicology and entomology without leaving our custody.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ActionLink href="/contact" variant="solid">
                Request a proposal
              </ActionLink>
              <ActionLink href="/research" variant="outline">
                Explore divisions
              </ActionLink>
            </div>
          </div>
        </div>

        {/*
          A set height rather than an aspect ratio, because the frame is
          half the viewport and a ratio ties its height to the window's
          width — at 1920 a 4:3 half-screen frame is 720px tall, which is a
          poster, and at 1024 it is 384px, which is a banner. A clamped
          height holds the hero inside the brief's 620–700px band from 1280
          up and degrades gracefully either side.

          The crop is held right. The still life keeps its left third
          deliberately empty, so that is the third to spend; the bottle,
          the vial rack and the seed dish stay in frame.

          `priority` only here. This is the LCP element, and it is the only
          image on the site that gets it.
        */}
        <div className="relative h-[clamp(14rem,56vw,20rem)] overflow-hidden border-t border-[--rule] bg-canvas-sunken lg:h-[clamp(24rem,44vw,38rem)] lg:border-l lg:border-t-0">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectPosition: hero.position }}
            className="object-cover"
          />
        </div>
      </section>

      {/* Recorded figures. Compact, and its own band. */}
      <section aria-label="NSRL in numbers" className="border-b border-[--rule] bg-canvas-sunken">
        <div className="shell">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 py-8 lg:grid-cols-4 lg:py-9">
            {/* The caption lives inside the <dd>, not as a sibling <p>.
                A <dl> may contain only <dt>, <dd> and grouping <div>s, and
                a <p> among them is a structure error a screen reader can
                trip on — the caption is part of the description, so that is
                where it goes. */}
            {scaleStats.map((stat) => (
              <div key={stat.label}>
                <dt className="label-mono text-neutral-550">{stat.label}</dt>
                <dd className="mt-1.5">
                  <span className="block font-display text-d4 font-[500] leading-none text-ink-900">
                    {stat.value.toLocaleString("en-GB")}
                    {stat.suffix}
                  </span>
                  <span className="mt-2 block text-micro leading-relaxed text-neutral-600">
                    {stat.caption}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
