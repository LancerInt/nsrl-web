import { leadership } from "@/content/organisation";
import { site } from "@/content/site";
import { images } from "@/content/imagery";
import { ActionLink } from "@/components/ui/ActionLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/** The three things Test Facility Management is accountable for under GLP. */
const tfmResponsibilities = ["Resourcing", "Personnel", "Quality system"];

/**
 * One person, given the room a single portrait needs.
 *
 * The laboratory has one named principal, so the section is built as a plate and
 * a statement of office rather than a team grid: a deep-toned figure on the
 * left, the bio and the GLP responsibility that comes with the role on the
 * right. Nobody is invented to fill a second column.
 */
export function LeadershipPanel() {
  const leader = leadership[0];
  if (!leader) return null;

  return (
    <section
      id="leadership"
      className="relative scroll-mt-[calc(var(--nav-h)+2rem)] bg-canvas py-[var(--section-y)]"
    >
      <div className="shell">
        <div className="egrid gap-y-8">
          {/* Figure */}
          <figure
            data-reveal="scale"
            className="col-span-12 sm:col-span-8 lg:col-span-5"
          >
            <div className="relative aspect-[4/5] img-frame">
              <SpecimenPlate
                src={images.team.src}
                alt={images.team.alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <span className="label-mono text-neutral-600">{site.legalName}</span>
              <span className="label-mono text-neutral-600">
                Office of the Managing Director
              </span>
            </figcaption>
          </figure>

          {/* Statement of office */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Eyebrow index="05">Leadership</Eyebrow>

            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              {leader.name}
            </RevealText>

            <p className="label-mono mt-6 text-ink-800">{leader.role}</p>

            <p data-reveal className="measure mt-6 text-lead text-neutral-700">
              {leader.bio}
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
              className="mt-6 rounded-[var(--radius-card)] border border-ink-900/12 bg-canvas-sunken p-[clamp(1.5rem,3vw,2.5rem)]"
            >
              <h3 className="label-mono text-neutral-600">
                Responsibility under OECD GLP
              </h3>
              <p className="mt-4 text-small text-neutral-700">
                Test Facility Management is the office the GLP principles hold
                ultimately accountable. Three things sit with it, and cannot be
                delegated away from it:
              </p>

              <dl className="mt-7">
                {tfmResponsibilities.map((item, i) => (
                  <div
                    key={item}
                    className="group flex items-baseline gap-5 border-t border-ink-900/12 py-4 transition-colors duration-500 hover:border-ink-900/40"
                  >
                    <dt className="label-mono shrink-0 text-neutral-550 transition-colors duration-500 group-hover:text-ink-950">
                      0{i + 1}
                    </dt>
                    <dd className="font-display text-h3 text-ink-950">{item}</dd>
                  </div>
                ))}
              </dl>

              <ActionLink href="#quality-system" variant="text" className="mt-6">
                The system it answers for
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
