import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "text";
type Tone = "light" | "deep";
type Size = "default" | "compact";

/**
 * Geometry is shared by every variant, so a solid button and an outline
 * button set side by side agree on height, radius and optical weight. Height
 * comes from the `--control-h` tokens rather than from padding, which is what
 * keeps a button the same height as an input next to it.
 */
const base =
  "group/action relative inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-control)] " +
  "font-sans font-medium tracking-[0] whitespace-nowrap " +
  "transition-[background-color,color,border-color,box-shadow] duration-200 ease-[var(--ease-out-quart)]";

const sizing: Record<Size, string> = {
  default: "h-[var(--control-h)] px-6 text-[0.9375rem]",
  compact: "h-[var(--control-h-sm)] px-5 text-[0.875rem]",
};

/**
 * Four variants, one hierarchy: exactly one solid action per view, outline
 * beside it, ghost for a tertiary control, text for an inline continuation.
 * Hover states change colour only — nothing moves, because a row of buttons
 * that shifts under the pointer is harder to hit, not more alive.
 */
const styles: Record<Variant, Record<Tone, string>> = {
  solid: {
    light: "bg-ink-900 text-white hover:bg-ink-700",
    deep: "bg-white text-ink-950 hover:bg-ink-50",
  },
  outline: {
    light:
      "border border-ink-900/20 text-ink-900 hover:border-meniscus-500 hover:bg-meniscus-500/6 hover:text-ink-800",
    deep: "border border-white/30 text-white hover:border-white hover:bg-white/10",
  },
  ghost: {
    light: "text-ink-800 hover:bg-ink-900/6 hover:text-ink-950",
    deep: "text-white hover:bg-white/10",
  },
  /* The inline register. Underlined at rest so it reads as a link without a
     hover, and the accent is what the hover changes — matching the link
     colour used in running copy. */
  text: {
    light:
      "text-ink-800 underline decoration-ink-900/25 underline-offset-[5px] hover:text-meniscus-600 hover:decoration-meniscus-500",
    deep: "text-white underline decoration-white/35 underline-offset-[5px] hover:text-meniscus-200 hover:decoration-meniscus-200",
  },
};

/**
 * The single call-to-action across the site. A plain, squared button in the
 * sans working voice — it states what it does and holds still while you aim
 * at it.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  tone = "light",
  size = "default",
  icon = "arrow",
  external,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  icon?: "arrow" | "diagonal" | "none";
  external?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  const inline = variant === "text";
  const Icon = icon === "diagonal" || external ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" ? (
        <span aria-hidden className="grid h-4 w-4 shrink-0 place-items-center overflow-hidden">
          <Icon
            className={cn(
              "h-4 w-4 transition-transform duration-200 ease-[var(--ease-out-quart)]",
              icon === "diagonal" || external
                ? "group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5"
                : "group-hover/action:translate-x-0.5",
            )}
          />
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    base,
    styles[variant][tone],
    /* The inline variant keeps the type size of the copy around it and takes
       no box, so it cannot use the control heights. */
    inline ? "h-auto gap-1.5 px-0 text-[0.9375rem]" : sizing[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
