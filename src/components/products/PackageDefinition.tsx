import { studyPackages } from "@/content/packages";
import { pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The honesty band.
 *
 * A packaged offer invites the reader to assume new capability, so the page
 * says plainly what a package is before it sells one: the existing catalogue,
 * re-ordered around the submission it has to satisfy.
 */
const clauses = [
  {
    title: "Nothing here is new",
    body: "Every study named in every package is already run by a named division of this laboratory, under the accreditation that division already holds. Packaging changes the order of the list, not the list.",
  },
  {
    title: "Grouped by submission, not by department",
    body: "A registration dossier does not arrive one division at a time. The groupings follow the schedule a regulatory affairs team actually works to, which is why a single package can cross ecotoxicology, chemistry and entomology.",
  },
  {
    title: "A starting point, not a fixed bill",
    body: "Scope is set by the authority reading the dossier and by the properties of the item itself — a surface-contact device should not be paying for implantation work it does not need. Every package is trimmed, and often extended, before it becomes a protocol.",
  },
];

export function PackageDefinition() {
  const studies = studyPackages.reduce(
    (total, pkg) => total + pkg.includes.reduce((n, group) => n + group.items.length, 0),
    0,
  );

  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-sunken py-[var(--section-y)] text-ink-950"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-35"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow index="01">
              What a package is
            </Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              An assembly, not an invention.
            </RevealText>

            <p
              data-reveal
              className="font-display text-editorial mt-7 max-w-[38ch] text-neutral-600"
            >
              The catalogue does not change. Only the order you read it in.
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-14 gap-y-6">
              <div>
                <dt className="label-mono text-neutral-600">Packages</dt>
                <dd className="mt-2 font-display text-h1 text-ink-950">{pad(studyPackages.length)}</dd>
              </div>
              <div>
                <dt className="label-mono text-neutral-600">Studies listed</dt>
                <dd className="mt-2 font-display text-h1 text-ink-950">{studies}</dd>
              </div>
            </dl>

            <ActionLink href="/research" variant="text" className="mt-7">
              The divisions that run them
            </ActionLink>
          </div>

          <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
            {clauses.map((clause, i) => (
              <li
                key={clause.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-[var(--rule)] py-6 transition-colors duration-500 hover:border-ink-900/40"
              >
                <span className="label-mono pt-2 text-neutral-550 transition-colors duration-400 group-hover:text-ink-950">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="font-display text-h1 text-ink-950">{clause.title}</h3>
                  <p className="measure mt-4 text-small text-neutral-600">{clause.body}</p>
                </div>
              </li>
            ))}
            <li aria-hidden className="border-t border-[var(--rule)]" />
          </ol>
        </div>
      </div>
    </section>
  );
}
