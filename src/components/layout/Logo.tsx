import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * The supplied NSRL mark. Never recoloured, never redrawn — the orbital motif
 * used elsewhere on the site exists precisely so the logo itself can stay
 * untouched.
 */
export function Logo({
  className,
  tone = "light",
  href = "/",
}: {
  className?: string;
  tone?: "light" | "deep";
  href?: string | null;
}) {
  const mark = (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/brand/nsrl-logo.png"
        alt=""
        /* The asset is 1741 × 1809; 128 × 133 is the same ratio to within a
           thousandth, so the box Next reserves matches what decodes and the
           header does not reflow. Keeping the numbers small also keeps the
           generated srcset sensible for a mark that renders ~35px wide. */
        width={128}
        height={133}
        priority
        className={cn(
          "h-9 w-auto transition-[filter] duration-500",
          tone === "deep" && "brightness-0 invert",
        )}
      />
      <span className="sr-only">{site.name}</span>
      <span
        aria-hidden
        className={cn(
          "hidden border-l pl-3 text-[0.6875rem] font-medium leading-tight tracking-[0.14em] uppercase sm:block",
          /* `neutral-550`, not `500`. At 11px this lockup needs 4.5:1 and
             `neutral-500` measured 4.09:1 on the warm white — it cleared
             the old cooler paper and stopped clearing this one. The ramp
             was retuned for the new palette; this was the one call site
             sitting close enough to the line to notice. */
          tone === "deep" ? "border-white/20 text-ink-200" : "border-ink-900/15 text-neutral-550",
        )}
      >
        Contract
        <br />
        Research
      </span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label={`${site.name} — home`} className="shrink-0" data-cursor="Home">
      {mark}
    </Link>
  );
}
