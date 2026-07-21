"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * One MediaQueryList per query for the whole document, created lazily so the
 * module still evaluates during server rendering. Building two of them inside a
 * pointermove handler allocated on every pointer sample.
 */
let finePointer: MediaQueryList | null = null;
let reducedMotion: MediaQueryList | null = null;

function magneticAllowed(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  finePointer ??= window.matchMedia("(hover: hover) and (pointer: fine)");
  reducedMotion ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return finePointer.matches && !reducedMotion.matches;
}

type Variant = "solid" | "outline" | "ghost" | "text";
type Tone = "light" | "deep";
type Size = "default" | "compact";

const base =
  "group/action relative inline-flex items-center justify-center gap-3 rounded-full font-display text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-500 [transition-timing-function:var(--ease-out-expo)]";

const styles: Record<Variant, Record<Tone, string>> = {
  solid: {
    light: "bg-ink-900 text-white hover:bg-signal-700",
    deep: "bg-white text-ink-950 hover:bg-signal-400",
  },
  outline: {
    light: "border border-ink-900/20 text-ink-900 hover:border-signal-500 hover:bg-signal-500/8",
    deep: "border border-white/25 text-white hover:border-signal-400 hover:bg-white/8",
  },
  ghost: {
    light: "text-ink-900 hover:bg-ink-900/6",
    deep: "text-white hover:bg-white/10",
  },
  text: {
    light: "text-ink-900 hover:text-signal-700",
    deep: "text-white hover:text-signal-300",
  },
};

/**
 * The single call-to-action across the site.
 *
 * On fine pointers the button drifts a few pixels toward the cursor. The
 * translation is capped well below the hit area so the pointer can never chase
 * a target that moves out from under it.
 */
export function ActionLink({
  href,
  children,
  variant = "solid",
  tone = "light",
  size = "default",
  icon = "arrow",
  magnetic = true,
  external,
  className,
  cursorLabel,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  icon?: "arrow" | "diagonal" | "none";
  magnetic?: boolean;
  external?: boolean;
  className?: string;
  cursorLabel?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  const ref = useRef<HTMLAnchorElement>(null);
  // Measured once, on entry, while the element still sits at its untransformed
  // position: reading it per move both thrashes layout on every pointer sample
  // and feeds the element's own translation back into the next one.
  const rect = useRef<DOMRect | null>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onEnter = () => {
    if (!magnetic) return;
    const el = ref.current;
    if (!el || !magneticAllowed()) return;
    rect.current = el.getBoundingClientRect();
  };

  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const box = rect.current;
    const el = ref.current;
    if (!box || !el) return;

    const x = (event.clientX - (box.left + box.width / 2)) * 0.22;
    const y = (event.clientY - (box.top + box.height / 2)) * 0.3;

    // One write per frame: a queued frame that never painted is worthless.
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const onLeave = () => {
    rect.current = null;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  };

  const isCompact = variant === "text";
  const Icon = icon === "diagonal" ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" ? (
        <span
          aria-hidden
          className={cn(
            "grid place-items-center overflow-hidden",
            isCompact ? "h-4 w-4" : "h-4 w-4",
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
              icon === "diagonal"
                ? "group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5"
                : "group-hover/action:translate-x-1",
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
        ? "px-5 py-3 text-[0.875rem]"
        : "px-7 py-4",
    className,
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onPointerEnter={onEnter}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-cursor={cursorLabel ?? "true"}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={classes}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor={cursorLabel ?? "true"}
      {...rest}
    >
      {content}
    </Link>
  );
}
