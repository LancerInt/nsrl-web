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
 * The artwork fills the section and the copy sits on it. The illustration
 * was composed for exactly this — a 2560×1332 field whose left half is
 * empty navy and whose right half carries the rising platforms and the
 * NSRL plinth — so the empty half is where the headline goes.
 *
 * The recorded figures are a band at the foot, inside the section rather
 * than on paper beneath it.
 *
 * ── Why a two-row grid ─────────────────────────────────────────────────
 *
 * The artwork is `object-contain`, which fits it to its frame. If that
 * frame were the whole section the artwork's lower edge — the plinth
 * carrying the NSRL wordmark — would finish underneath the figures band
 * and be hidden by it. Making the section a grid of `1fr auto` gives the
 * artwork a row that stops exactly where the band starts, so the whole
 * illustration sits above it and nothing has to be guessed about the
 * band's height.
 *
 * `data-theme="deep"` is not decoration: focus rings key off it, so a
 * keyboard user tabbing the actions gets a ring visible on navy rather
 * than one tuned for paper.
 */
export function HomeHero() {
  return (
    <section
      data-theme="deep"
      /*
        `bg-deep` below `lg`, where the artwork is a cropped band and the
        copy sits on the section's own navy.

        At `lg` the fill is the artwork's own ground colour, so the
        `object-contain` letterbox is invisible and the hero can show the
        illustration entire instead of cropping a third of it away.

        That colour is #030f26 and it has to be measured in a browser, not
        read off the file. Decoding the bytes with sharp gives #1a2b42;
        Chromium decodes the identical bytes — same URL, same response — to
        #030f26, and a canvas `getImageData` inside the page confirms it is
        the decode and not the screenshot pipeline, with no filter, opacity
        or blend anywhere in the ancestry. The browser's answer is the one a
        visitor sees. Fill it with #1a2b42 and the join is a hard
        twenty-level step.

        Not a token, deliberately: this is one file's rendered edge, not a
        surface the design system owns. If the hero artwork is ever
        replaced, re-measure it in a browser — `getImageData` on the served
        URL, not `sharp` on the source.
      */
      className="relative isolate overflow-hidden bg-deep text-white lg:grid lg:min-h-svh lg:grid-rows-[1fr_auto] lg:bg-[#030f26]"
    >
      {/* The stage: artwork and copy. Stretches to fill whatever height is
          left above the figures band. */}
      <div className="relative flex flex-col lg:block">
        {/*
          Two layouts, because one composition cannot serve both.

          From `lg` the artwork is the background and the copy sits on its
          empty left half, which is what it was drawn for.

          Below `lg` the frame is portrait and the artwork is a 1.9:1
          landscape, so `cover` would show roughly a quarter of its width:
          a slice of platforms with no plinth, no wordmark and no subject,
          under the headline. Stacking gives the copy a clean navy field
          and the artwork its own 16:10 band where the whole composition is
          visible. `order` does the swap, so the heading stays first in the
          markup either way.

          The frame starts below the bar rather than at the top of the
          section. The navy still runs the full height — it is the
          background — but `contain` fits the artwork to its frame, and a
          frame including the 5rem hidden behind an opaque header spends
          5rem of artwork on something nobody can see.
        */}
        <div className="relative order-2 aspect-[16/10] w-full overflow-hidden lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[var(--nav-h)] lg:order-none lg:-z-10 lg:aspect-auto">
          {/*
            `contain`, anchored right, from `lg` up. At full width the
            section is wider than the artwork is tall, so `cover` scales to
            the width and then crops about 29% off the height — taking the
            top platform and the base of the plinth with it.

            The crop is set by class rather than by the record's inline
            `objectPosition`, because an inline declaration beats every
            class including responsive ones, and the two breakpoints need
            different answers: `cover` held right on the mobile band,
            `contain` held right on the desktop field.
          */}
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover [object-position:68%_50%] lg:object-contain lg:[object-position:100%_50%]"
          />
          {/* No wash at `lg`. The artwork's left half is a flat field drawn
              to hold type, and white on it measures 19:1 — there is nothing
              for a scrim to rescue. */}
        </div>

        <div className="shell order-1 w-full pb-[clamp(2.5rem,5vw,3.5rem)] pt-[calc(var(--nav-h)+1.5rem)] lg:order-none lg:flex lg:h-full lg:items-center lg:py-14">
          <div className="max-w-[36rem]">
            <p className="label-mono text-meniscus-300">
              Contract research organisation · Salem, Tamil Nadu
            </p>

            <h1 className="mt-5 text-d1 font-display text-white">
              Complete preclinical research, start to finish.
            </h1>

            {/* The scope sentence. Around 62 characters a line, inside the
                55–70 the brief asks for. */}
            <p className="mt-6 max-w-[33rem] text-lead text-ink-100">
              One accredited laboratory, {numberWord(disciplines.length)} scientific
              divisions. A substance that arrives for chemistry moves through
              toxicology, ecotoxicology and entomology without leaving our custody.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ActionLink href="/contact" variant="solid" tone="deep">
                Request a proposal
              </ActionLink>
              <ActionLink href="/research" variant="outline" tone="deep">
                Explore divisions
              </ActionLink>
            </div>
          </div>
        </div>
      </div>

      {/* Recorded figures, at the foot of the hero. */}
      <div aria-label="NSRL in numbers" role="group" className="border-t border-white/15">
        <div className="shell">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 py-7 lg:grid-cols-4 lg:py-8">
            {/* The caption lives inside the <dd>, not as a sibling <p>. A
                <dl> may contain only <dt>, <dd> and grouping <div>s, and a
                <p> among them is a structure error a screen reader can
                trip on — the caption is part of the description. */}
            {scaleStats.map((stat) => (
              <div key={stat.label}>
                <dt className="label-mono text-ink-200">{stat.label}</dt>
                <dd className="mt-1.5">
                  <span className="block font-display text-d4 font-[500] leading-none text-white">
                    {stat.value.toLocaleString("en-GB")}
                    {stat.suffix}
                  </span>
                  <span className="mt-2 block text-micro leading-relaxed text-ink-200">
                    {stat.caption}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
