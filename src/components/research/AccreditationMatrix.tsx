import Link from "next/link";

import { disciplines } from "@/content/disciplines";
import { accreditations } from "@/content/accreditations";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * Which accreditation governs which division, as a real table.
 *
 * A regulated laboratory is judged on exactly this grid, so it is set as a
 * table rather than a graphic: a screen reader gets row and column headers, a
 * sighted visitor gets a single glance, and nothing is asserted that is not in
 * the division's own `accreditationRefs`.
 */
export function AccreditationMatrix() {
  const held = new Set(disciplines.flatMap((discipline) => discipline.accreditationRefs));
  const columns = accreditations.filter((accreditation) => held.has(accreditation.id));

  return (
    <Section tone="sunken" aria-labelledby="coverage">
      <SectionBody>
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="04">Coverage</Eyebrow>
            <h2 id="coverage" className="mt-6 font-display text-d3 text-ink-950">
              <RevealText as="span" className="block">
                Which accreditation governs which division.
              </RevealText>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Read down a column to see how far an accreditation reaches; read across a row
              to see what a single division works under. Every certificate is published in
              full.
            </p>
            <ActionLink href="/downloads" variant="text" className="mt-5">
              Certificates on file
            </ActionLink>
          </div>
        </div>

        {/* `relative` is load-bearing. Every cell carries an `sr-only` span,
            and `sr-only` is `position: absolute` — so without a positioned
            scroll container those spans resolve against the section instead,
            take their static position from inside a 736px-wide table, and
            push the *document* 330px wider than the viewport on a phone.
            Positioning the scroll box makes it their containing block, and
            the overflow stays where it belongs: inside this div.
            `overscroll-behavior-x` stops a sideways swipe in the table from
            triggering browser back-navigation. */}
        <div className="relative mt-6 overflow-x-auto overscroll-x-contain lg:overflow-x-visible">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Accreditations held by each of the thirteen scientific divisions
            </caption>

            {/* The header sticks to the top of the viewport while the rows
                scroll under it, so a mark ten rows down still names its
                accreditation. The nav auto-hides on scroll-down, so top-0 is
                clear during reading; the inset shadow is the ruled underline
                that a collapsed border would not carry with a sticky cell. */}
            <thead>
              <tr>
                <th
                  scope="col"
                  className="label-mono sticky top-0 z-10 bg-canvas-sunken py-5 pr-6 font-normal text-neutral-550 shadow-[inset_0_-1px_0_var(--rule-strong)]"
                >
                  Division
                </th>
                {columns.map((accreditation) => (
                  <th
                    key={accreditation.id}
                    scope="col"
                    className="label-mono sticky top-0 z-10 bg-canvas-sunken px-4 py-5 text-center font-normal text-ink-700 shadow-[inset_0_-1px_0_var(--rule-strong)]"
                  >
                    {accreditation.abbr}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {disciplines.map((discipline) => (
                <tr
                  key={discipline.slug}
                  className="border-b border-[var(--rule)] transition-colors duration-500 hover:bg-canvas-raised"
                >
                  <th scope="row" className="py-5 pr-6 font-normal">
                    <Link
                      href={`/research/${discipline.slug}`}
                      className="group flex items-baseline gap-4"
                    >
                      <span className="label-mono tabular-nums text-neutral-550">
                        {discipline.index}
                      </span>
                      <span className="font-display text-h3 text-ink-950 underline-offset-4 group-hover:underline">
                        {discipline.name}
                      </span>
                    </Link>
                  </th>

                  {columns.map((accreditation) => {
                    const has = discipline.accreditationRefs.includes(accreditation.id);
                    return (
                      <td key={accreditation.id} className="px-4 py-5 text-center align-middle">
                        <span className="sr-only">
                          {has
                            ? `${accreditation.abbr}: held`
                            : `${accreditation.abbr}: not applicable`}
                        </span>
                        {has ? (
                          <span
                            aria-hidden
                            className="mx-auto block h-2 w-2 rounded-full bg-signal-600"
                          />
                        ) : (
                          <span aria-hidden className="mx-auto block h-px w-3.5 bg-[var(--rule-strong)]" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBody>
    </Section>
  );
}
