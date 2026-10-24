import { environments } from "@/content/facilities";
import { numberWord } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * The controlled environments as a specification schedule.
 *
 * A real <table>, because this is tabular data: every environment has a stated
 * specification, and putting the spec in its own column is what lets a reader
 * scan down the values instead of hunting for them inside prose.
 */
export function EnvironmentTable() {
  return (
    <section id="environments" className="relative bg-canvas-sunken py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="03">Controlled environments</Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              {numberWord(environments.length, { capitalise: true })} conditions, each held to
              a stated specification.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Studies here run for days or for years. The specification column is the part that has
              to survive the whole duration — and be demonstrable afterwards.
            </p>
          </div>
        </div>

        {/*
          `tabIndex={0}` with a role and a name because this scrolls
          horizontally below about 52rem. A region that only a pointer can
          pan is unreachable by keyboard: there is nothing focusable inside
          the table, so without this a keyboard user can see the first three
          columns of the schedule and has no way to reach the rest.

          `relative` is load-bearing and separate: the row labels inside use
          `sr-only`, which is absolutely positioned, and without a positioned
          ancestor here they resolve against the section and push the page
          wider than the viewport at 390px.
        */}
        <div
          data-reveal
          tabIndex={0}
          role="region"
          aria-label="Controlled environments — specification schedule"
          className="relative mt-6 overflow-x-auto rounded-[var(--radius-card)] border border-[var(--rule)] bg-canvas-raised"
        >
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <caption className="label-mono border-b border-[var(--rule)] px-6 py-5 text-left text-neutral-550">
              Controlled environments — specification schedule
            </caption>

            <thead>
              <tr className="border-b border-[var(--rule)]">
                <th scope="col" className="label-mono w-16 px-6 py-4 font-medium text-neutral-600">
                  Ref
                </th>
                <th scope="col" className="label-mono w-56 px-6 py-4 font-medium text-neutral-600">
                  Environment
                </th>
                <th scope="col" className="label-mono w-48 px-6 py-4 font-medium text-neutral-600">
                  Specification
                </th>
                <th scope="col" className="label-mono px-6 py-4 font-medium text-neutral-600">
                  What is held, and for what
                </th>
              </tr>
            </thead>

            <tbody>
              {environments.map((environment) => (
                <tr
                  key={environment.index}
                  className="group border-b border-[var(--rule)] align-top transition-colors duration-400 last:border-b-0 hover:bg-canvas-sunken/70"
                >
                  <td className="label-mono px-6 py-5 tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-700">
                    {environment.index}
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-5 text-left font-display text-h2 font-semibold text-ink-950"
                  >
                    {environment.title}
                  </th>
                  <td className="px-6 py-5">
                    <span className="label-mono inline-block rounded-[var(--radius-control)] border border-meniscus-500/35 bg-meniscus-500/6 px-3 py-1.5 text-meniscus-600">
                      {environment.spec}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-small text-neutral-600">{environment.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
