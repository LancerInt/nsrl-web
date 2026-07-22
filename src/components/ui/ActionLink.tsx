import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "text";
type Tone = "light" | "deep";
type Size = "default" | "compact";

const base =
  "group/action relative inline-flex items-center justify-center gap-2.5 rounded-[3px] font-sans text-[0.9375rem] font-medium tracking-[0] transition-[background-color,color,border-color] duration-300";

const styles: Record<Variant, Record<Tone, string>> = {
  solid: {
    light: "bg-ink-900 text-white hover:bg-ink-700",
    deep: "bg-white text-ink-950 hover:bg-ink-100",
  },
  outline: {
    light: "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900/4",
    deep: "border border-white/30 text-white hover:border-white hover:bg-white/8",
  },
  ghost: {
    light: "text-ink-900 hover:bg-ink-900/6",
    deep: "text-white hover:bg-white/10",
  },
  text: {
    light: "text-ink-800 underline decoration-ink-900/25 underline-offset-4 hover:decoration-ink-900",
    deep: "text-white underline decoration-white/30 underline-offset-4 hover:decoration-white",
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
  const isCompact = variant === "text";
  const Icon = icon === "diagonal" ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" ? (
        <span aria-hidden className="grid h-4 w-4 place-items-center overflow-hidden">
          <Icon
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              icon === "diagonal"
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
    isCompact
      ? "px-0 py-1"
      : size === "compact"
        ? "px-5 py-2.5 text-[0.875rem]"
        : "px-6 py-3.5",
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
