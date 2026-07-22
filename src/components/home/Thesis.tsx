import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { milestones } from "@/content/organisation";

/**
 * The argument, stated once: fragmentation is what costs a programme its
 * timeline, and the answer is a single custodian. The milestones that back it
 * follow as a quiet set of columns — grouped by whitespace, not boxed in
 * rules.
 */
export function Thesis() {
  return (
    <section className="bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div data-reveal>
            <Eyebrow index="01">Why one laboratory</Eyebrow>

            <h2 className="mt-6 font-display text-d2 text-ink-950">
              A study is only as strong as its weakest handover.
            </h2>

            <ActionLink href="/about" variant="text" className="mt-6">
              How the laboratory is organised
            </ActionLink>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            className="space-y-5 text-lead text-neutral-700"
          >
            <p>
              Most preclinical programmes are assembled from three or four vendors. Every boundary
              between them is a place where material is re-shipped, methods are re-validated,
              context is re-explained, and weeks disappear into email.
            </p>
            <p>
              We built the alternative. Thirteen scientific divisions share one campus, one quality
              system, one archive and one chain of custody. Chemistry establishes the identity of a
              test item; toxicology doses it; pathology reads the tissue; the radioisotope
              laboratory follows where it went. Nothing is handed over, because nothing leaves.
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone, i) => (
            <div
              key={milestone.title}
              data-reveal
              style={{ "--reveal-delay": `${0.05 * i}s` } as React.CSSProperties}
            >
              <span className="label-mono text-meniscus-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="mt-3 font-display text-h2 text-ink-950">{milestone.title}</dt>
              <dd className="mt-2 text-small text-neutral-600">{milestone.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
