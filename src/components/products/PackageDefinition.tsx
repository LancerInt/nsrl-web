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
    body: "A registration dossier does not arrive one division at a time. The groupings follow the schedule a regulatory affairs team actually works to, which is why a single package can cross ecotoxicology, chemistry and the radioisotope laboratory.",
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
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep py-[var(--section-y)] text-ink-50"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-50"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.03)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <div className="egrid gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow index="01" tone="deep">
              What a package is
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              An assembly, not an invention.
            </RevealText>

            <p
              data-reveal
              className="font-editorial text-editorial mt-10 max-w-[38ch] italic text-ink-100"
            >
              The catalogue does not change. Only the order you read it in.
            </p>

            <dl className="mt-12 flex flex-wrap gap-x-14 gap-y-6">
              <div>
                <dt className="label-mono text-ink-200">Packages</dt>
                <dd className="mt-2 font-display text-h1 text-white">{pad(studyPackages.length)}</dd>
              </div>
              <div>
                <dt className="label-mono text-ink-200">Studies listed</dt>
                <dd className="mt-2 font-display text-h1 text-white">{studies}</dd>
              </div>
            </dl>

            <ActionLink href="/research" variant="text" tone="deep" className="mt-10">
              The divisions that run them
            </ActionLink>
          </div>

          <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
            {clauses.map((clause, i) => (
              <li
                key={clause.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-white/12 py-9 transition-colors duration-500 hover:border-signal-400/60"
              >
                <span className="label-mono pt-2 text-ink-300 transition-colors duration-400 group-hover:text-signal-400">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="font-display text-h1 text-white">{clause.title}</h3>
                  <p className="measure mt-4 text-small text-ink-200">{clause.body}</p>
                </div>
              </li>
            ))}
            <li aria-hidden className="border-t border-white/12" />
          </ol>
        </div>
      </div>
    </section>
  );
}
