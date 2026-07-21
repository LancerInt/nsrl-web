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
    <Section tone="deep" aria-labelledby="coverage">
      <SectionBody>
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="04" tone="deep">
              Coverage
            </Eyebrow>
            <h2 id="coverage" className="mt-8 font-display text-d3 text-white">
              <RevealText as="span" className="block">
                Which accreditation governs which division.
              </RevealText>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-ink-200">
              Read down a column to see how far an accreditation reaches; read across a row
              to see what a single division works under. Every certificate is published in
              full.
            </p>
            <ActionLink href="/downloads" variant="text" tone="deep" className="mt-5">
              Certificates on file
            </ActionLink>
          </div>
        </div>

        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Accreditations held by each of the thirteen scientific divisions
            </caption>

            <thead>
              <tr>
                <th
                  scope="col"
                  className="label-mono border-b border-white/20 py-5 pr-6 font-normal text-ink-200"
                >
                  Division
                </th>
                {columns.map((accreditation) => (
                  <th
                    key={accreditation.id}
                    scope="col"
                    className="label-mono border-b border-white/20 px-4 py-5 text-center font-normal text-ink-100"
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
                  className="border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.04]"
                >
                  <th scope="row" className="py-5 pr-6 font-normal">
                    <Link
                      href={`/research/${discipline.slug}`}
                      className="group flex items-baseline gap-4 transition-colors duration-400 hover:text-signal-300"
                    >
                      <span className="label-mono tabular-nums text-ink-300 transition-colors duration-400 group-hover:text-signal-400">
                        {discipline.index}
                      </span>
                      <span className="font-display text-h3 font-semibold text-white transition-colors duration-400 group-hover:text-signal-300">
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
                            className="mx-auto block h-2 w-2 rounded-full bg-signal-400"
                          />
                        ) : (
                          <span aria-hidden className="mx-auto block h-px w-3.5 bg-white/20" />
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
