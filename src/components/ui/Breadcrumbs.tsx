import Link from "next/link";

import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail. Emits BreadcrumbList structured data alongside the visual
 * trail so the same hierarchy reaches search engines.
 */
export function Breadcrumbs({
  items,
  tone = "light",
  className,
  baseUrl,
}: {
  items: Crumb[];
  tone?: "light" | "deep";
  className?: string;
  /** Absolute site origin, used to build the structured data. */
  baseUrl?: string;
}) {
  const jsonLd = baseUrl
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
        })),
      }
    : null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "label-mono flex flex-wrap items-center gap-x-3 gap-y-1",
          tone === "deep" ? "text-ink-200" : "text-neutral-550",
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-3">
              {item.href && !last ? (
                /* `inline-flex` with a minimum height rather than bare
                   inline text: a 16px-tall tap target is the smallest thing
                   on a phone screen, and a breadcrumb is how a visitor gets
                   back out of a division page. */
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-6 items-center transition-colors duration-200",
                    tone === "deep"
                      ? "hover:text-white"
                      : "hover:text-meniscus-600",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={tone === "deep" ? "text-white" : "text-ink-900"}
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden className="opacity-45">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </nav>
  );
}
