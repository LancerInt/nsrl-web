import { environments } from "@/content/facilities";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * The six controlled environments as a specification schedule.
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
              Six conditions, each held to a stated specification.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Studies here run for days or for years. The specification column is the part that has
              to survive the whole duration — and be demonstrable afterwards.
            </p>
          </div>
        </div>

        <div
          data-reveal
          className="mt-6 overflow-x-auto rounded-[var(--radius-card)] border border-ink-900/12 bg-canvas-raised"
        >
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <caption className="label-mono border-b border-ink-900/12 px-6 py-5 text-left text-neutral-500">
              Controlled environments — specification schedule
            </caption>

            <thead>
              <tr className="border-b border-ink-900/12">
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
                  className="group border-b border-ink-900/10 align-top transition-colors duration-400 last:border-b-0 hover:bg-canvas-sunken/70"
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
                    <span className="label-mono inline-block rounded-full border border-signal-600/30 px-3 py-2 text-signal-700">
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
