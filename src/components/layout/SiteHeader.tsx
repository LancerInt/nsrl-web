"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { easing } from "@/lib/motion";
import { contact, primaryNav, type NavGroup } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { ActionLink } from "@/components/ui/ActionLink";

export function SiteHeader() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [overDeep, setOverDeep] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<number>(0);
  // The mobile sheet is a modal dialog, so focus has to come back here when it
  // closes. Held on the header because the sheet outlives its own open state
  // by one exit animation.
  const menuTrigger = useRef<HTMLButtonElement>(null);

  /* -- Adapt to the band beneath ------------------------------------------ */
  // While the bar is transparent it sits directly on the page, so it has to
  // take its contrast from whatever is under it. Without this the navy logo
  // and grey links disappear against a deep hero.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-theme]"),
    );
    if (!sections.length) return;

    // A zero-height band across the viewport at the header's baseline: the
    // section intersecting it is the one currently behind the bar.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setOverDeep((entry.target as HTMLElement).dataset.theme === "deep");
        }
      },
      { rootMargin: "-44px 0px -100% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Deep styling only applies while the bar is see-through; once it condenses
  // it has its own light background and must go back to dark ink.
  const onDark = overDeep && !condensed && !openMenu;

  /* -- Smart hide/show ---------------------------------------------------- */
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setCondensed(y > 24);

      const delta = y - lastY.current;
      // Ignore rubber-banding and sub-pixel jitter.
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 220 && !openMenu && !mobileOpen);
        lastY.current = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu, mobileOpen]);

  /* -- Close on navigation ------------------------------------------------ */
  // Adjusted during render rather than in an effect: React's documented pattern
  // for resetting state when a prop changes. An effect would paint the new page
  // with the old menu still open for one frame.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    // Reset here rather than in the observer effect: the new page's sections
    // have not been measured yet, and carrying the old page's tone across the
    // transition flashes white links onto a light hero.
    setOverDeep(false);
  }

  /* -- Escape closes everything ------------------------------------------ */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* -- Lock the page behind the mobile sheet ------------------------------ */
  // A class of its own rather than `body.style.overflow`: the Preloader holds a
  // lock of its own at the same moment on a first visit, and whichever
  // component wrote the inline property last would silently release the other's
  // lock. Each owner adds and removes only its own class (see globals.css).
  useEffect(() => {
    const { body } = document;
    body.classList.toggle("is-locked-menu", mobileOpen);
    return () => {
      body.classList.remove("is-locked-menu");
    };
  }, [mobileOpen]);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
  }, []);

  // Close the mega menu when a link inside it is clicked. If the link points at
  // the page we are already on, the route will not change (so the menu-close
  // effect never fires and nothing appears to happen) — scroll to the top so
  // the click has a visible result.
  const onMenuNavigate = useCallback(
    (event: React.MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      setOpenMenu(null);
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.origin);
      if (url.pathname === pathname && !url.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname],
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a href="#main" className="sr-only-focusable focus-visible:fixed focus-visible:left-6 focus-visible:top-6 focus-visible:z-[120] focus-visible:m-0 focus-visible:h-auto focus-visible:w-auto focus-visible:rounded-full focus-visible:bg-ink-900 focus-visible:px-6 focus-visible:py-3 focus-visible:text-sm focus-visible:text-white focus-visible:[clip-path:none]">
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)]",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
        onMouseLeave={scheduleClose}
      >
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,border-color] duration-700 [transition-timing-function:var(--ease-out-expo)]",
            condensed || openMenu
              ? "border-b border-ink-900/8 bg-canvas/85 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <div className="shell">
            <div
              className={cn(
                "flex items-center justify-between gap-8 transition-[height] duration-700 [transition-timing-function:var(--ease-out-expo)]",
                condensed ? "h-[4.25rem]" : "h-[5.5rem]",
              )}
            >
              <Logo tone={onDark ? "deep" : "light"} />

              {/* ---- Desktop navigation ---- */}
              <nav aria-label="Primary" className="hidden lg:block">
                <ul className="flex items-center gap-1">
                  {primaryNav.map((group) => (
                    <li
                      key={group.label}
                      onMouseEnter={() => {
                        cancelClose();
                        setOpenMenu(group.panel ? group.label : null);
                      }}
                    >
                      <Link
                        href={group.href}
                        aria-expanded={group.panel ? openMenu === group.label : undefined}
                        aria-current={isActive(group.href) ? "page" : undefined}
                        onFocus={() => setOpenMenu(group.panel ? group.label : null)}
                        className={cn(
                          "relative block rounded-full px-4 py-2.5 text-[0.9375rem] font-medium transition-colors duration-400",
                          isActive(group.href) || openMenu === group.label
                            ? onDark
                              ? "text-white"
                              : "text-ink-950"
                            : onDark
                              ? "text-ink-100 hover:text-white"
                              : "text-neutral-600 hover:text-ink-950",
                        )}
                      >
                        {group.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-4 bottom-1 h-px origin-left bg-current transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
                            isActive(group.href) || openMenu === group.label
                              ? "scale-x-100"
                              : "scale-x-0",
                          )}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-3">
                {/* Wrapped rather than given `hidden`: ActionLink's own
                    `inline-flex` is a display utility of equal specificity, so
                    the two would fight and Tailwind's source order would win. */}
                <span className="hidden sm:block">
                  <ActionLink
                    href="/contact"
                    variant="solid"
                    tone={onDark ? "deep" : "light"}
                    size="compact"
 
                  >
                    Request a proposal
                  </ActionLink>
                </span>

                <button
                  ref={menuTrigger}
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-400 hover:border-ink-900 lg:hidden",
                    onDark ? "border-white/25 text-white" : "border-ink-900/15 text-ink-900",
                  )}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Mega menu ---- */}
        <AnimatePresence>
          {openMenu ? (
            <MegaPanel
              group={primaryNav.find((g) => g.label === openMenu)!}
              onEnter={cancelClose}
              onLeave={scheduleClose}
              onNavigate={onMenuNavigate}
            />
          ) : null}
        </AnimatePresence>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        triggerRef={menuTrigger}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function MegaPanel({
  group,
  onEnter,
  onLeave,
  onNavigate,
}: {
  group: NavGroup;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: (event: React.MouseEvent) => void;
}) {
  const panel = group.panel;
  if (!panel) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.42, ease: easing.expo }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onNavigate}
      className="hidden border-b border-ink-900/8 bg-canvas/95 backdrop-blur-2xl backdrop-saturate-150 lg:block"
    >
      <div className="shell">
        <div className="grid grid-cols-[minmax(0,15rem)_minmax(0,1fr)] gap-x-14 py-8">
          {/* Intro */}
          <div>
            <p className="label-mono text-neutral-550">{panel.intro.eyebrow}</p>
            <p className="mt-4 font-display text-h2 text-ink-950">{panel.intro.title}</p>
            <p className="mt-3 max-w-[30ch] text-small text-neutral-600">{panel.intro.body}</p>
            <ActionLink href={panel.intro.cta.href} variant="text" className="mt-5">
              {panel.intro.cta.label}
            </ActionLink>
          </div>

          {/* Link columns — evenly distributed, no dividing rules. */}
          <div
            className={cn(
              "grid gap-x-10 gap-y-2",
              panel.columns.length >= 3 ? "grid-cols-3" : "grid-cols-2",
            )}
          >
            {panel.columns.map((column) => (
              <div key={column.heading}>
                <p className="label-mono mb-3 text-neutral-550">{column.heading}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group -mx-3 flex items-center justify-between gap-4 rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-canvas-sunken"
                      >
                        <span className="flex flex-col">
                          <span className="text-small font-medium text-ink-900">
                            {link.label}
                          </span>
                          {link.description ? (
                            <span className="text-micro text-neutral-500">{link.description}</span>
                          ) : null}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="h-4 w-4 shrink-0 -translate-x-2 text-ink-700 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

/** Everything the browser will hand a Tab to, in document order. */
const TABBABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function MobileMenu({
  open,
  onClose,
  pathname,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* -- Make `aria-modal` true in fact as well as in markup ---------------- */
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    // The sheet is rendered as a direct child of <body>, alongside the skip
    // link, the header bar, <main> and the footer. `inert` is the one thing
    // that removes a subtree from the tab order *and* the accessibility tree,
    // which is exactly what aria-modal has been promising. Applied to every
    // sibling rather than a hand-listed three so nothing new escapes it.
    const inerted: HTMLElement[] = [];
    for (const node of Array.from(document.body.children)) {
      if (node === panel || !(node instanceof HTMLElement) || node.inert) continue;
      node.inert = true;
      inerted.push(node);
    }

    // Captured now: by cleanup time React may already be tearing this down.
    const restoreTo = triggerRef.current;
    closeRef.current?.focus();

    // Tab and Shift+Tab cycle within the sheet. Recomputed per keystroke
    // because the sub-menus mount with a staggered animation.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const tabbable = Array.from(panel.querySelectorAll<HTMLElement>(TABBABLE)).filter(
        (element) => element.getClientRects().length > 0,
      );
      if (!tabbable.length) return;

      const first = tabbable[0];
      const last = tabbable[tabbable.length - 1];
      const active = document.activeElement;
      const escaped = !active || !panel.contains(active);

      if (event.shiftKey ? escaped || active === first : escaped || active === last) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      for (const node of inerted) node.inert = false;

      // Only reclaim focus if it is still inside the sheet, or was dropped on
      // the body when the sheet went inert — never yank it away from wherever
      // the visitor has legitimately landed.
      const active = document.activeElement;
      if (!active || active === document.body || panel.contains(active)) restoreTo?.focus();
    };
  }, [open, triggerRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain bg-deep text-white lg:hidden"
          data-theme="deep"
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.5, ease: easing.expo }}
            className="shell flex min-h-full flex-col pb-10"
          >
            <div className="flex h-[5.5rem] shrink-0 items-center justify-between">
              <Logo tone="deep" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors duration-400 hover:border-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-6 flex-1">
              <ul>
                {primaryNav.map((group, i) => (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.06 + i * 0.05, ease: easing.expo }}
                    className="border-t border-white/12"
                  >
                    <Link
                      href={group.href}
                      className={cn(
                        "flex items-baseline gap-4 py-5 font-display text-d4",
                        pathname.startsWith(group.href) ? "text-ink-200" : "text-white",
                      )}
                    >
                      <span className="label-mono text-ink-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {group.label}
                    </Link>

                    {group.panel ? (
                      /* These chips are the only route to the eighteen division
                         and sector pages on a phone, so each one carries a 44px
                         target (WCAG 2.5.8). The target is padding, and the row
                         is pulled back by an equal negative margin, so the block
                         still starts and ends where the old 19px chips did. */
                      <ul className="-mt-3 flex flex-wrap gap-x-5 gap-y-0 pb-3 pl-10">
                        {group.panel.columns
                          .flatMap((c) => c.links)
                          .map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="inline-flex min-h-11 items-center py-2.5 text-small text-ink-200 transition-colors duration-300 hover:text-white"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-7 flex flex-col gap-4 border-t border-white/12 pt-8">
              <ActionLink href="/contact" variant="solid" tone="deep" >
                Request a proposal
              </ActionLink>
              <a
                href={`tel:${contact.phoneHref}`}
                className="label-mono text-ink-200 transition-colors hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="label-mono text-ink-200 transition-colors hover:text-white"
              >
                {contact.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
