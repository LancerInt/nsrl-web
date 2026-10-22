import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * An image filling its positioned parent.
 *
 * This file used to be two components in one. Alongside the image path it
 * carried about 350 lines of generative SVG — seeded orbitals,
 * chromatograms, titration curves, well plates — drawn deterministically
 * from a `seed` so that a figure could stand in wherever photography was
 * missing. Every one of those placements has had real artwork for some time
 * and not a single call site passed a `variant`, so the whole generator was
 * unreachable. The orbital figure in particular was the same atom motif the
 * brief asks to be rid of, kept alive by a code path nothing called.
 *
 * What is left is the part that was doing the work: `next/image` with
 * `fill`, no colour grade, and the crop supplied by the image's own record.
 *
 * The name is kept because thirteen call sites speak it and renaming them
 * would be churn; read it as "the plate an image is mounted on".
 */
export function SpecimenPlate({
  className,
  src,
  alt = "",
  position,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
}: {
  className?: string;
  src: string;
  alt?: string;
  /** `object-position` for the crop — comes from the image's own record. */
  position?: string;
  /**
   * Required in practice. Without it `next/image` assumes 100vw and asks
   * for a 3840px file to fill a 380px card, which is what the audit found
   * on nearly every slot.
   */
  sizes?: string;
  /**
   * Only ever true for a page's LCP image. More than one `priority` image
   * per page makes the flag meaningless — they contend for the same early
   * bandwidth and none of them arrives sooner.
   */
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      // Handed over as a custom property, not written to `style`, so a
      // caller can override the crop at a breakpoint. An inline
      // declaration beats every class including responsive ones.
      style={position ? ({ "--object-position": position } as React.CSSProperties) : undefined}
      className={cn("object-cover", position && "[object-position:var(--object-position)]", className)}
    />
  );
}
