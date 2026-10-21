import type { Metadata } from "next";

import { articles } from "@/content/news";
import { pad } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionBody } from "@/components/ui/Section";
import { NewsroomVisual } from "@/components/news/NewsroomVisual";
import { ArchiveEntry } from "@/components/news/ArchiveEntry";
import { EventsBand } from "@/components/news/EventsBand";

export const metadata: Metadata = pageMetadata({
  title: "News & Events — Notes from the Laboratory",
  description:
    "The NSRL newsroom: long-form notes on preclinical drug discovery and laboratory capability, plus where to follow conference appearances and updates as they happen.",
  path: "/news",
  keywords: ["NSRL news", "preclinical research news", "laboratory updates", "CRO events"],
});

const longestRead = Math.max(...articles.map((article) => article.readingMinutes));

/** Published notes only: the bodyless records are no longer listed. */
const totalRecords = articles.length;

export default function NewsIndexPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        index="N.01"
        title="Notes from the laboratory, written up in full."
        lead="A short archive by design. What is here is a complete note rather than a headline — and anything that moves faster than a written note is posted to LinkedIn as it happens."
        crumbs={[{ label: "Home", href: "/" }, { label: "News & events" }]}
        meta={[
          { label: "Notes published", value: pad(totalRecords) },
          { label: "Longest read", value: `${longestRead} min` },
          { label: "Live updates", value: "LinkedIn" },
        ]}
        visual={<NewsroomVisual />}
      />

      <Section tone="canvas" id="archive">
        <SectionBody>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <Eyebrow index="01">The archive</Eyebrow>
              <h2 className="mt-6 font-display text-d4 text-ink-950">
                Everything the laboratory has published here.
              </h2>
              {/* This paragraph used to explain the bodyless records that
                  were listed below it. They are not listed any more, so the
                  explanation went with them — copy describing behaviour the
                  page no longer has is worse than no copy at all. */}
              <p className="measure mt-6 text-body text-neutral-600">
                Every note here is reproduced in full, as published. Nothing is written up
                after the fact.
              </p>
            </div>
            <p className="label-mono text-neutral-600">
              {pad(totalRecords)} {totalRecords === 1 ? "note" : "notes"}
            </p>
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-col gap-[clamp(3rem,6vw,5rem)]">
            <ArchiveEntry article={lead} position={1} variant="lead" />

            {rest.map((article, i) => (
              <ArchiveEntry
                key={article.slug}
                article={article}
                position={i + 2}
                variant="record"
              />
            ))}

            {/*
              The bodyless archive records are no longer listed publicly.

              Showing a real, dated headline beside a dashed "No note filed"
              panel was the honest way to carry a record whose body was never
              published — but on a launch newsroom holding two entries it
              read as an unfinished page rather than as scrupulousness, which
              is the opposite of what it was for. The records stay in
              `content/news.ts` with their TODO: supply the body and they
              become articles, or delete them. Nothing was invented either
              way.
            */}
          </div>

          {/* End-of-archive marker: the short archive is stated, not hidden. */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--rule)] pt-6">
            <span aria-hidden className="h-2.5 w-px bg-ink-900" />
            <p className="label-mono text-neutral-500">
              End of archive — {pad(totalRecords)} {totalRecords === 1 ? "note" : "notes"}
            </p>
            <p className="label-mono text-neutral-600">Newer updates are posted to LinkedIn</p>
          </div>
        </SectionBody>
      </Section>

      <EventsBand />
    </>
  );
}
