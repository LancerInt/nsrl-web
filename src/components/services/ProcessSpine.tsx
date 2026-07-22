import { studyLifecycle } from "@/content/organisation";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The stages of a study, laid out as a compact grid rather than a tall
 * vertical spine — the full width carries the process across a few short rows
 * instead of one long scroll. A large, faint index anchors each stage.
 */
export function ProcessSpine() {
  return (
    <Section tone="sunken">
      <div className="py-[var(--section-y)]">
        {/* Header */}
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div data-reveal>
            <Eyebrow>The working method</Eyebrow>
            <h2 className="mt-6 font-display text-d2 text-ink-950">
              What happens between your first call and your report.
            </h2>
          </div>
          <div
            data-reveal
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            className="lg:pt-3"
          >
            <p className="text-lead text-neutral-600">
              We start from the authority that will read the dossier, not from a study list.
              Divisions run in parallel wherever the science allows, and the record stays unbroken
              from receipt through to the tenth year of archival.
            </p>
            <ActionLink href="/about#quality-system" variant="text" className="mt-6">
              How the quality system governs it
            </ActionLink>
          </div>
        </div>

        {/* Process grid */}
        <ol className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {studyLifecycle.map((stage, i) => (
            <li
              key={stage.index}
              data-reveal
              style={{ "--reveal-delay": `${0.05 * (i % 3)}s` } as React.CSSProperties}
              className="border-t border-[var(--rule-strong)] pt-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-h2 tabular-nums text-neutral-300">
                  {stage.index}
                </span>
                <h3 className="font-display text-h1 text-ink-950">{stage.title}</h3>
              </div>
              <p className="mt-3 text-body text-neutral-600">{stage.body}</p>
              {stage.detail ? (
                <p className="label-mono mt-4 leading-relaxed text-neutral-550">{stage.detail}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
