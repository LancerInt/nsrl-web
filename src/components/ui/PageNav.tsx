import { cn } from "@/lib/utils";

export type PageNavItem = { href: string; label: string };

/**
 * On-page navigation for the long technical pages.
 *
 * A division page runs to a hundred method lines and four specification
 * tables; a sector page to six study groups. Without a contents strip the
 * only way to find the guideline list is to scroll past everything else.
 *
 * Plain anchors, so it works before hydration and with the bundle blocked.
 * Deliberately not sticky: a second sticky bar under an already-fixed header
 * means every `[id]` on the page needs its scroll-margin recalculated
 * against two moving heights, and the first one that drifts puts a heading
 * under the bar that was supposed to reveal it. One fixed element is enough.
 *
 * Links wrap rather than scroll sideways: a row that scrolls hides its own
 * last item, and on a page whose sections are the point, a hidden section is
 * the wrong thing to hide.
 */
export function PageNav({
  items,
  label = "On this page",
  tone = "canvas",
}: {
  items: PageNavItem[];
  label?: string;
  tone?: "canvas" | "sunken";
}) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label={label}
      className={cn(
        "border-y border-ink-900/8",
        tone === "sunken" ? "bg-canvas-sunken" : "bg-canvas",
      )}
    >
      <div className="shell">
        <ul className="flex flex-wrap items-center gap-x-1 gap-y-0 py-2">
          <li className="label-mono mr-3 py-2 text-neutral-550">{label}</li>
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="row-interactive block rounded-[var(--radius-control)] px-3 py-2 text-small text-neutral-600 transition-colors duration-200 hover:text-ink-950"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
