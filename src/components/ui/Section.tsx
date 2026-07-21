import { cn } from "@/lib/utils";

type Tone = "canvas" | "sunken" | "deep" | "deep-raised";

const toneClass: Record<Tone, string> = {
  canvas: "bg-canvas text-ink-950",
  sunken: "bg-canvas-sunken text-ink-950",
  deep: "bg-deep text-ink-50",
  "deep-raised": "bg-deep-raised text-ink-50",
};

/**
 * Every major band on the site. Owns vertical rhythm and the light/deep
 * alternation that gives the pages their chapter structure.
 *
 * `data-theme="deep"` is what focus rings and inverted rules key off, so it is
 * set here rather than repeated by callers.
 */
export function Section({
  as: Tag = "section",
  tone = "canvas",
  bleed = false,
  className,
  innerClassName,
  children,
  ...rest
}: {
  as?: React.ElementType;
  tone?: Tone;
  /** Skip the shell so the child can control its own horizontal bounds. */
  bleed?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  const isDeep = tone === "deep" || tone === "deep-raised";

  return (
    <Tag
      data-theme={isDeep ? "deep" : "light"}
      className={cn("relative isolate", toneClass[tone], className)}
      {...rest}
    >
      {bleed ? children : <div className={cn("shell", innerClassName)}>{children}</div>}
    </Tag>
  );
}

/** Standard vertical padding. Kept separate so bleed sections can opt in. */
export function SectionBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("py-[var(--section-y)]", className)}>{children}</div>;
}
