import { ArrowUpRight } from "lucide-react";

import { accreditations, type Accreditation } from "@/content/accreditations";
import { pad, slugify } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { Section, SectionBody } from "@/components/ui/Section";

type Group = { category: Accreditation["category"]; items: Accreditation[] };

/**
 * Groups in order of first appearance in the content module, so the register
 * order is owned by the content and never re-declared here.
 */
function groupByCategory(): Group[] {
  const groups: Group[] = [];
  for (const record of accreditations) {
    const existing = groups.find((group) => group.category === record.category);
    if (existing) existing.items.push(record);
    else groups.push({ category: record.category, items: [record] });
  }
  return groups;
}

/**
 * The register itself.
 *
 * Deliberately not a card grid: this is a document register, so it is set as a
 * ruled ledger — a continuous record number down the left margin, the issuing
 * authority and scope in the body of the row, and the certificate itself as the
 * right-hand column. Rows without a published certificate keep their place in
 * the register and simply carry no link, because a dead download is worse than
 * an honest gap.
 */
export function CertificateRegister() {
  const groups = groupByCategory();
  const filed = accreditations.filter((record) => record.certificateUrl).length;

  return (
    <Section tone="canvas" id="register">
      <SectionBody>
        {/* ---- Register head + jump index -------------------------------- */}
        <div className="egrid items-end gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow index="01">The register</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Every record, filed by category.
            </RevealText>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="text-small text-neutral-600">
              Each record carries the abbreviation the certificate is known by, the authority
              that issued it and the scope it covers. Where the laboratory has published the
              certificate, the record links straight to it.
            </p>
            <p className="label-mono mt-6 flex flex-wrap gap-x-8 gap-y-2 text-neutral-600">
              <span>
                Records <span className="text-ink-900">{pad(accreditations.length)}</span>
              </span>
              <span>
                Certificates filed <span className="text-signal-700">{pad(filed)}</span>
              </span>
              <span>
                Categories <span className="text-ink-900">{pad(groups.length)}</span>
              </span>
            </p>
          </div>
        </div>

        {/* The jump anchors carry a 40px target (WCAG 2.5.8) as padding on the
            anchor itself; the rule's own padding is reduced by the same amount
            so the band keeps the height it had at 11px label-mono. */}
        <nav
          aria-label="Register categories"
          className="mt-14 border-y border-ink-900/12 py-1.5"
        >
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-0">
            {groups.map((group, i) => (
              <li key={group.category} className="flex items-center gap-3">
                <span aria-hidden className="label-mono text-neutral-300">
                  {pad(i + 1)}
                </span>
                <a
                  href={`#${slugify(group.category)}`}
                  className="label-mono inline-flex min-h-10 items-center py-3 text-ink-700 underline-offset-[6px] transition-colors duration-400 hover:text-signal-700 hover:underline"
                >
                  {group.category}
                </a>
                <span aria-hidden className="label-mono text-neutral-300">
                  ({group.items.length})
                </span>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- Ledger ---------------------------------------------------- */}
        <div className="mt-[clamp(3.5rem,6vw,6rem)] flex flex-col gap-[clamp(3.5rem,6vw,6rem)]">
          {groups.map((group, groupIndex) => (
            <section
              key={group.category}
              id={slugify(group.category)}
              aria-labelledby={`${slugify(group.category)}-heading`}
              className="scroll-mt-[calc(var(--nav-h)+3rem)]"
            >
              <div className="egrid gap-y-8">
                {/* Category margin */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="lg:rail-sticky">
                    <div className="flex items-center gap-4">
                      <span aria-hidden className="h-px w-6 bg-signal-500" />
                      <span className="label-mono text-neutral-600">
                        S.{pad(groupIndex + 1)}
                      </span>
                    </div>
                    <h3
                      id={`${slugify(group.category)}-heading`}
                      className="mt-5 font-display text-h1 text-ink-950"
                    >
                      {group.category}
                    </h3>
                    <p className="label-mono mt-4 text-neutral-600">
                      {pad(group.items.length)}{" "}
                      {group.items.length === 1 ? "record" : "records"}
                    </p>
                  </div>
                </div>

                {/* Records */}
                <ol className="col-span-12 lg:col-span-9">
                  {group.items.map((record, i) => (
                    <li
                      key={record.id}
                      data-reveal
                      style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
                      className="group border-t border-ink-900/12 transition-colors duration-500 hover:border-signal-500/60"
                    >
                      <RegisterRow
                        record={record}
                        number={accreditations.indexOf(record) + 1}
                      />
                    </li>
                  ))}
                  <li aria-hidden className="border-t border-ink-900/12" />
                </ol>
              </div>
            </section>
          ))}
        </div>
      </SectionBody>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function RegisterRow({ record, number }: { record: Accreditation; number: number }) {
  return (
    <div className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-6 py-[clamp(1.75rem,3vw,2.75rem)] lg:grid-cols-[3rem_minmax(0,6fr)_minmax(0,8fr)_minmax(0,6fr)]">
      {/* Record number + tick */}
      <div className="flex items-center gap-3 lg:block">
        <span className="label-mono tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-signal-700">
          {pad(number)}
        </span>
        <span
          aria-hidden
          className="mt-3 hidden h-3.5 w-px bg-ink-900/15 transition-colors duration-500 group-hover:bg-signal-500 lg:block"
        />
      </div>

      {/* Identity */}
      <div>
        <h4 className="font-display text-h1 tracking-[-0.02em] text-ink-950">{record.abbr}</h4>
        <p className="mt-2 text-small text-ink-800">{record.name}</p>
      </div>

      {/* Issuer + scope */}
      <div>
        <p className="label-mono text-neutral-600">Issued by</p>
        <p className="mt-2 text-small text-ink-800">{record.issuer}</p>
        <p className="mt-5 text-small text-neutral-600">{record.scope}</p>
      </div>

      {/* Certificate */}
      <div className="lg:justify-self-end">
        {record.certificateUrl ? (
          <a
            href={record.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cert inline-flex flex-col items-start gap-2 rounded-[0.875rem] border border-ink-900/15 px-5 py-4 transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:border-signal-500 hover:bg-signal-500/8"
          >
            <span className="flex items-center gap-2 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink-950 transition-colors duration-400 group-hover/cert:text-signal-700">
              Open certificate
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/cert:-translate-y-0.5 group-hover/cert:translate-x-0.5"
              />
            </span>
            {/* Visible to everyone and present in the accessibility tree, so the
                external destination is never a surprise. */}
            <span className="label-mono text-neutral-500">
              External link — opens in a new tab
            </span>
          </a>
        ) : (
          <p className="inline-flex flex-col items-start gap-2 rounded-[0.875rem] border border-dashed border-ink-900/15 px-5 py-4">
            <span className="font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-neutral-500">
              No certificate filed
            </span>
            <span className="label-mono text-neutral-600">Listed without a link</span>
          </p>
        )}
      </div>
    </div>
  );
}
