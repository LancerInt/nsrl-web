import { cn } from "@/lib/utils";

/**
 * "This is not a photograph of NSRL."
 *
 * Required wherever conceptual artwork sits in a context that would
 * otherwise be read as documentary — a facility section, a gallery of
 * "environments", a division page showing instruments. The surrounding copy
 * on those sections is about NSRL's actual premises and equipment, which is
 * exactly what makes an unlabelled image beside it a claim.
 *
 * It is deliberately a visible line of type rather than an `alt` attribute
 * or a `title`. A sighted reader never sees either, and they are the reader
 * the claim would mislead.
 *
 * The wording stays short and factual. "Artist's impression" is softer and
 * vaguer; "conceptual illustration" is what the supplier's own notes call
 * these, and matching their language keeps the record consistent.
 */
export function ConceptualLabel({
  className,
  tone = "light",
  children = "Conceptual illustration — not a photograph of NSRL premises or equipment.",
}: {
  className?: string;
  tone?: "light" | "deep";
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "block text-micro leading-snug",
        tone === "deep" ? "text-ink-200" : "text-neutral-550",
        className,
      )}
    >
      {children}
    </span>
  );
}
