import type { ArchiveRecord } from "@/content/news";
import { pad } from "@/lib/utils";

/**
 * An archive entry that has no published body.
 *
 * The same honesty the downloads register uses for an accreditation with no
 * filed certificate: the record keeps its place in the sequence, its number and
 * its date, and where the link would be it carries an explicit note instead.
 * Giving the row somewhere to go would mean writing a body for it, and a body
 * written here would be invented prose under a real date.
 *
 * Set as a ruled record rather than a card, so it sits in the same column
 * rhythm as the published note above it and reads as part of one archive.
 */
export function ArchiveRecordEntry({
  record,
  position,
}: {
  record: ArchiveRecord;
  /** 1-based position in the archive, printed as the record number. */
  position: number;
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
      className="grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-8 border-t border-ink-900/15 py-[clamp(1.25rem,2vw,1.875rem)] lg:grid-cols-[3.5rem_minmax(0,7fr)_minmax(0,4fr)]"
    >
      <span aria-hidden className="label-mono tabular-nums text-neutral-600">
        {pad(position)}
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="label-mono text-neutral-550">{record.category}</span>
          <span aria-hidden className="h-3 w-px bg-ink-900/15" />
          <time dateTime={record.date} className="label-mono text-neutral-550">
            {record.dateDisplay}
          </time>
          <span aria-hidden className="h-3 w-px bg-ink-900/15" />
          <span className="label-mono text-neutral-550">{record.author}</span>
        </div>

        <h3 className="mt-6 font-display text-d4 text-ink-800">{record.title}</h3>

        <p className="measure mt-5 text-body text-neutral-600">
          Listed for the record. The text of this entry is not published here, so there is
          nothing to link to — and a page written to fill the gap would not be the entry.
        </p>
      </div>

      <div className="lg:justify-self-end">
        <p className="inline-flex flex-col items-start gap-2 rounded-[0.875rem] border border-dashed border-ink-900/15 px-5 py-4">
          <span className="font-sans text-[0.9375rem] font-medium text-neutral-550">
            No note filed
          </span>
          <span className="label-mono text-neutral-600">Listed without a page</span>
        </p>
      </div>
    </article>
  );
}
