import { cn } from "@/lib/utils";

/**
 * Historically a line-by-line masked reveal; now a static renderer.
 *
 * The choreographed headline entrance was retired with the rest of the
 * agency-style motion: headings on a laboratory's site should simply be
 * there. The component and its props are kept so call sites read unchanged,
 * and any future motion can be reintroduced in one place.
 */
export function RevealText({
  as: Tag = "span",
  children,
  className,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  /** Accepted for call-site compatibility; no longer used. */
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "mount";
}) {
  return <Tag className={cn(className)}>{children}</Tag>;
}
