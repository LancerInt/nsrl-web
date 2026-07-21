import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * The shared hero frame for interior pages.
 *
 * It fixes the type scale, the breadcrumb position and the vertical rhythm —
 * everything a visitor needs to stay oriented across pages — while leaving the
 * visual layer entirely to the caller, so no two pages look alike.
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
  tone = "deep",
  className,
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs: Crumb[];
  /** Small key/value facts rendered under the lead. */
  meta?: { label: string; value: string }[];
  /** Absolutely-positioned background artwork supplied by the page. */
  visual?: React.ReactNode;
  /** Optional right-hand column content. */
  aside?: React.ReactNode;
  tone?: "light" | "deep";
  className?: string;
}) {
  const deep = tone === "deep";

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

      <div className="shell relative pb-[clamp(3.5rem,7vw,7rem)] pt-[clamp(8rem,13vw,12rem)]">
        <Breadcrumbs items={crumbs} tone={tone} baseUrl={site.url} />

        <div className="egrid mt-12 gap-y-10">
          <div className={cn(aside ? "col-span-12 lg:col-span-7" : "col-span-12 lg:col-span-9")}>
            <Eyebrow index={index} tone={tone}>
              {eyebrow}
            </Eyebrow>

            <RevealText
              as="h1"
              trigger="mount"
              className={cn(
                "mt-7 font-display text-d2",
                deep ? "text-white" : "text-ink-950",
              )}
            >
              {title}
            </RevealText>

            {lead ? (
              <p
                data-reveal
                style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
                className={cn(
                  "measure mt-8 text-lead",
                  deep ? "text-ink-200" : "text-neutral-600",
                )}
              >
                {lead}
              </p>
            ) : null}

            {meta?.length ? (
              <dl
                data-reveal
                style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}
                className="mt-12 flex flex-wrap gap-x-14 gap-y-6"
              >
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt
                      className={cn(
                        "label-mono",
                        deep ? "text-ink-200" : "text-neutral-600",
                      )}
                    >
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
          </div>

          {aside ? (
            <div
              data-reveal
              style={{ "--reveal-delay": "0.45s" } as React.CSSProperties}
              className="col-span-12 lg:col-span-4 lg:col-start-9"
            >
              {aside}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
