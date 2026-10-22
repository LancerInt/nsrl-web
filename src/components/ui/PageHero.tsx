import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * The shared hero frame for interior pages, set like the title page of a
 * study file: paper surface, a ruled field label, the serif headline, and —
 * when the page carries key facts — a bordered title block holding them as
 * mono field rows. A double rule closes the frame before the first section.
 */
export function PageHero({
  eyebrow,
  index,
  title,
  lead,
  crumbs,
  meta,
  visual,
  aside,
  actions,
  tone = "light",
  className,
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  /** Small key/value facts rendered as the title block's field rows. */
  meta?: { label: string; value: string }[];
  /** Absolutely-positioned background artwork supplied by the page. */
  visual?: React.ReactNode;
  /** One contextual action for this page, shown under the meta facts. */
  actions?: React.ReactNode;
  /** Optional right-hand column content; takes the title block's place. */
  aside?: React.ReactNode;
  tone?: "light" | "deep";
  className?: string;
}) {
  const deep = tone === "deep";
  const panel = aside ?? (meta?.length ? <MetaBlock meta={meta} deep={deep} /> : null);
  // When a page supplies both a custom aside and meta facts, the aside takes
  // the right column and the facts fill the left column under the lead — so the
  // hero never leaves a tall empty gutter beside a taller aside.
  const inlineMeta = aside && meta?.length ? meta : null;

  return (
    <section
      data-theme={deep ? "deep" : "light"}
      className={cn(
        "relative isolate overflow-hidden",
        deep ? "bg-deep text-ink-50" : "bg-canvas text-ink-950",
        className,
      )}
    >
      {visual ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {visual}
        </div>
      ) : null}

      <div className="shell relative pb-[clamp(2.25rem,3.5vw,3rem)] pt-[clamp(6.25rem,8vw,7.5rem)]">
        <Breadcrumbs items={crumbs} tone={tone} baseUrl={site.url} />

        <Eyebrow index={index} tone={tone} className="mt-7">
          {eyebrow}
        </Eyebrow>

        <div className="egrid mt-6 gap-y-8">
          <div className={cn("col-span-12", panel ? "lg:col-span-7" : "lg:col-span-9")}>
            <RevealText
              as="h1"
              trigger="mount"
              className={cn("font-display text-d2", deep ? "text-white" : "text-ink-950")}
            >
              {title}
            </RevealText>

            {lead ? (
              <p
                data-reveal
                style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
                className={cn(
                  "measure mt-5 text-lead",
                  deep ? "text-ink-200" : "text-neutral-600",
                )}
              >
                {lead}
              </p>
            ) : null}

            {inlineMeta ? (
              <dl
                data-reveal
                style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}
                className="mt-10 flex flex-wrap gap-x-12 gap-y-6"
              >
                {inlineMeta.map((item) => (
                  <div key={item.label}>
                    <dt className={cn("label-mono", deep ? "text-ink-200" : "text-neutral-550")}>
                      {item.label}
                    </dt>
                    <dd
                      className={cn(
                        "mt-2 font-display text-h2",
                        deep ? "text-white" : "text-ink-950",
                      )}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {/* The page's own action, under its facts.

                Division pages put a 4:5 image in the right column, which is
                taller than a heading, a sentence and three metrics. The gap
                that left under the metrics is exactly where the one thing
                a reader might want to do next belongs — so the slot both
                answers the brief's "relevant action" and closes the hole
                that prompted its "avoid unnecessary empty space" note. */}
            {actions ? (
              <div
                data-reveal
                style={{ "--reveal-delay": "0.55s" } as React.CSSProperties}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                {actions}
              </div>
            ) : null}
          </div>

          {panel ? (
            <div
              data-reveal
              style={{ "--reveal-delay": "0.45s" } as React.CSSProperties}
              className="col-span-12 lg:col-span-4 lg:col-start-9"
            >
              {panel}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function MetaBlock({
  meta,
  deep,
}: {
  meta: { label: string; value: string }[];
  deep: boolean;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)]",
        deep ? "bg-white/10" : "card-elevated !p-0",
      )}
    >
      {meta.map((item) => (
        <div
          key={item.label}
          className={cn("px-5 py-4", deep ? "bg-deep-raised" : "bg-canvas-raised")}
        >
          <dt className={cn("label-mono", deep ? "text-white/60" : "text-neutral-550")}>
            {item.label}
          </dt>
          <dd
            className={cn(
              "mt-2 font-display text-h2",
              deep ? "text-white" : "text-ink-950",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
