"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Accessible disclosure used for capability lists.
 *
 * Uses a real <button> with aria-expanded/aria-controls and keeps the panel in
 * the DOM with `hidden`, so in-page search and assistive technology can reach
 * collapsed content.
 */
export function Disclosure({
  title,
  meta,
  defaultOpen = false,
  tone = "light",
  children,
  className,
}: {
  title: React.ReactNode;
  meta?: React.ReactNode;
  defaultOpen?: boolean;
  tone?: "light" | "deep";
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const deep = tone === "deep";

  return (
    <div
      className={cn(
        "border-t",
        deep ? "border-white/12" : "border-ink-900/12",
        className,
      )}
    >
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          className={cn(
            "group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-500",
            deep ? "hover:text-ink-700" : "hover:text-ink-700",
          )}
        >
          {/* min-w-0 so a long title wraps instead of forcing the row wider
              than the shell and shoving the toggle off the screen edge. */}
          <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-h2">{title}</span>
            {meta ? (
              <span
                className={cn(
                  "label-mono shrink-0",
                  deep ? "text-ink-200" : "text-neutral-600",
                )}
              >
                {meta}
              </span>
            ) : null}
          </span>

          <span
            aria-hidden
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
              deep
                ? "border-white/20 group-hover:border-signal-400"
                : "border-ink-900/15 group-hover:border-ink-900/60",
              open && "rotate-45",
            )}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
        className="pb-8"
      >
        {children}
      </div>
    </div>
  );
}
