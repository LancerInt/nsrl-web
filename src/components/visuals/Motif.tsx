import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Decorative backdrops, from the redesign kit's vector motifs.
 *
 * These replace the orbital field and the orbital mark — the "recurring atom
 * orbits" the brief asks to be rid of. The objection to those was not that
 * they were ugly. It was that a laboratory testing agrochemicals, feed
 * additives and industrial chemicals does not do atomic physics, so the
 * motif said nothing about the work and said it on six pages.
 *
 * The kit's motifs are drawn from the actual subject matter: a tray of
 * samples, contour lines from a stained section, an environmental gradient,
 * an analytical trace. They are still decoration and are marked
 * `aria-hidden`, but they are decoration about the right thing.
 *
 * Each file carries its own #F5F6F2 ground, which is exactly the canvas
 * token, so a motif can sit edge to edge in a light section without a seam.
 *
 * `unoptimized` because these are SVG: Next's optimiser declines SVG by
 * default, and there is nothing it could usefully do to a 1–6 KB vector
 * anyway.
 */
export type MotifName =
  | "motif-sample-grid"
  | "motif-tissue-contours"
  | "motif-environment"
  | "analytical-trace";

export function Motif({
  name,
  className,
  fade,
  opacity = 1,
}: {
  name: MotifName;
  className?: string;
  /**
   * A wash over the motif, so display type stays legible where it crosses.
   * `start` fades from the left, `bottom` from the foot.
   */
  fade?: "start" | "bottom" | "both";
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <Image
        src={`/graphics/${name}.svg`}
        alt=""
        fill
        unoptimized
        style={{ opacity }}
        className="object-cover"
      />
      {(fade === "start" || fade === "both") && (
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-canvas)_28%,transparent_90%)]" />
      )}
      {(fade === "bottom" || fade === "both") && (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-canvas),transparent)]" />
      )}
    </div>
  );
}
