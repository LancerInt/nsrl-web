import type { Metadata } from "next";

import { archiveRecords, articles } from "@/content/news";
import { pad } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionBody } from "@/components/ui/Section";
import { NewsroomVisual } from "@/components/news/NewsroomVisual";
import { ArchiveEntry } from "@/components/news/ArchiveEntry";
import { ArchiveRecordEntry } from "@/components/news/ArchiveRecordEntry";
import { EventsBand } from "@/components/news/EventsBand";

export const metadata: Metadata = pageMetadata({
  title: "News & Events — Notes from the Laboratory",
  description:
    "The NSRL newsroom: long-form notes on preclinical drug discovery and laboratory capability, plus where to follow conference appearances and updates as they happen.",
  path: "/news",
  keywords: ["NSRL news", "preclinical research news", "laboratory updates", "CRO events"],
});

const longestRead = Math.max(...articles.map((article) => article.readingMinutes));

/** Everything the archive holds — published notes and listed records alike. */
const totalRecords = articles.length + archiveRecords.length;

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
          { label: "Records", value: pad(totalRecords) },
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
              <p className="measure mt-6 text-body text-neutral-600">
                Notes with a published body are reproduced in full. An entry whose text was
                never published here keeps its number and its date in the sequence and is listed
                without a page, rather than being written up after the fact or dropped from the
                record.
              </p>
            </div>
            <p className="label-mono text-neutral-600">
              {pad(totalRecords)} records · {pad(articles.length)} with a note
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

            {/* Listed, dated, numbered — and deliberately unlinked. */}
            {archiveRecords.map((record, i) => (
              <ArchiveRecordEntry
                key={`${record.date}-${record.title}`}
                record={record}
                position={articles.length + i + 1}
              />
            ))}
          </div>

          {/* End-of-archive marker: the short archive is stated, not hidden. */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--rule)] pt-6">
            <span aria-hidden className="h-2.5 w-px bg-ink-900" />
            <p className="label-mono text-neutral-500">
              End of archive — {pad(totalRecords)} records
            </p>
            <p className="label-mono text-neutral-600">Newer updates are posted to LinkedIn</p>
          </div>
        </SectionBody>
      </Section>

      <EventsBand />
    </>
  );
}
