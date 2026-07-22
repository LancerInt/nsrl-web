import { departmentGroups, departments } from "@/content/careers";
import { pad } from "@/lib/utils";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/** Families with the running index each one starts at, so numbering never restarts. */
const FAMILIES = departmentGroups.map((group, i) => ({
  ...group,
  start: departmentGroups.slice(0, i).reduce((sum, previous) => sum + previous.items.length, 0),
}));

/**
 * The department index: nineteen names, numbered once, straight through.
 *
 * Set as a printed index rather than a grid of tiles — a family heading in the
 * left margin, the names ruled and running-numbered in the right measure. The
 * numbering does not restart per family, so the page can be read as a single
 * ordered register of everything NSRL hires into.
 */
export function DepartmentIndex() {
  return (
    <Section tone="sunken" id="departments">
      <SectionBody>
        <div className="egrid items-end gap-y-7">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="03">Departments</Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              {departments.length} departments, {departmentGroups.length} families, one register.
            </RevealText>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Applications are accepted against any name on this list. Pick the one closest to your
              training — if none of them fits, the register ends with{" "}
              <span className="text-ink-900">Others</span>, and that is a real answer.
            </p>
            <ActionLink href="#apply" variant="text" className="mt-5">
              Go to the application form
            </ActionLink>
          </div>
        </div>

        <div className="mt-[clamp(2rem,3.5vw,3rem)]">
          {FAMILIES.map((group, groupIndex) => (
            <section
              key={group.heading}
              aria-labelledby={`department-family-${groupIndex}`}
              className="egrid gap-y-8 border-t border-ink-900/18 py-[clamp(1.25rem,2.5vw,2rem)]"
            >
              <div className="col-span-12 lg:col-span-3">
                <p className="label-mono text-ink-700">
                  Family {pad(groupIndex + 1)} / {pad(departmentGroups.length)}
                </p>
                <h3
                  id={`department-family-${groupIndex}`}
                  className="mt-4 font-display text-h1 text-ink-950"
                >
                  {group.heading}
                </h3>
                <p className="label-mono mt-4 text-neutral-600">
                  {pad(group.items.length)} departments
                </p>
              </div>

              <ul className="col-span-12 lg:col-span-8 lg:col-start-5">
                {group.items.map((item, itemIndex) => {
                  const number = group.start + itemIndex + 1;
                  return (
                    <li
                      key={item}
                      data-reveal
                      style={{ "--reveal-y": "0.75rem" } as React.CSSProperties}
                      className="group flex items-baseline gap-x-6 border-t border-ink-900/10 py-4 transition-colors duration-500 first:border-t-0 hover:border-ink-900/40"
                    >
                      <span className="label-mono w-8 shrink-0 tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-950">
                        {pad(number)}
                      </span>
                      <span className="flex-1 font-display text-[clamp(1.25rem,2.1vw,1.875rem)] font-medium leading-snug tracking-[-0.012em] text-ink-900 transition-colors duration-500 group-hover:text-ink-950">
                        {item}
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-px w-6 shrink-0 self-center bg-ink-900/15 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:w-12 group-hover:bg-ink-900 sm:block"
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          <div className="border-t border-ink-900/18" />
        </div>
      </SectionBody>
    </Section>
  );
}
