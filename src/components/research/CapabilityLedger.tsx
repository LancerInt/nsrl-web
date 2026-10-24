import { pad } from "@/lib/utils";
import type { CapabilityGroup } from "@/content/disciplines";
import { Disclosure } from "@/components/ui/Disclosure";
import { SpecList } from "@/components/ui/SpecList";

/**
 * The capability catalogue, in one of two registers.
 *
 * Divisions carrying six or more groups (toxicology, safety pharmacology,
 * microbiology, medical devices) would run to several screens if every method
 * were open, so those collapse into disclosures. Shorter sets stay open as a
 * ruled two-column specification, which is the better read when it fits.
 */
export function CapabilityLedger({
  groups,
  mode,
}: {
  groups: CapabilityGroup[];
  mode: "disclosure" | "ruled";
}) {
  if (mode === "disclosure") {
    return (
      <div>
        {groups.map((group, i) => (
          <Disclosure
            key={group.title}
            title={group.title}
            meta={`${group.items.length} methods`}
            defaultOpen={i === 0}
          >
            {group.blurb ? (
              <p className="measure mb-8 text-small text-neutral-600">{group.blurb}</p>
            ) : null}
            <SpecList
              items={group.items}
              columns={group.items.length > 6 ? 3 : 2}
              numbered={false}
            />
          </Disclosure>
        ))}
        <div className="border-t border-[var(--rule)]" />
      </div>
    );
  }

  return (
    <div>
      {groups.map((group, i) => (
        <div
          key={group.title}
          data-reveal
          style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
          className="egrid gap-y-7 border-t border-[var(--rule)] py-[clamp(2rem,3.6vw,3.25rem)]"
        >
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-baseline gap-4">
              <span className="label-mono shrink-0 pt-1 tabular-nums text-neutral-550">
                {pad(i + 1)}
              </span>
              <h3 className="font-display text-h1 text-ink-950">{group.title}</h3>
            </div>

            <div className="lg:ml-[2.5rem]">
              {group.blurb ? (
                <p className="mt-4 max-w-[34ch] text-small text-neutral-600">{group.blurb}</p>
              ) : null}
              <p className="label-mono mt-5 text-ink-700">
                {group.items.length} methods
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <SpecList
              items={group.items}
              columns={group.items.length > 5 ? 2 : 1}
              numbered={false}
            />
          </div>
        </div>
      ))}
      <div className="border-t border-[var(--rule)]" />
    </div>
  );
}
