"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { cn, slugify } from "@/lib/utils";
import { easing } from "@/lib/motion";
import { contact, primaryNav, type NavGroup } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { ActionLink } from "@/components/ui/ActionLink";

/** What opened the panel, which decides whether leaving with the pointer
    closes it again. A menu the visitor deliberately clicked open should not
    vanish the moment the pointer drifts off it. */
type OpenSource = "hover" | "press";

export function SiteHeader() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState<{ label: string; via: OpenSource } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [overDeep, setOverDeep] = useState(false);
  const closeTimer = useRef<number>(0);
  // The mobile sheet is a modal dialog, so focus has to come back here when it
  // closes. Held on the header because the sheet outlives its own open state
  // by one exit animation.
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const openLabel = open?.label ?? null;

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

  // Deep styling only applies while the bar is see-through; once it goes
  // opaque it has its own light background and must return to dark ink.
  const onDark = overDeep && !condensed && !openLabel;

  /* -- Opaque once the page moves ----------------------------------------- */
  // The bar does not hide on scroll-down. On a page whose primary action is
  // "request a proposal", the action should be one glance away at every
  // scroll position, and a bar that comes and goes is one the eye has to
  // keep re-finding.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -- Close on navigation ------------------------------------------------ */
  // Adjusted during render rather than in an effect: React's documented pattern
  // for resetting state when a prop changes. An effect would paint the new page
  // with the old menu still open for one frame.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
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
      setOpen(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* -- A press-opened panel closes on an outside click or a focus escape -- */
  useEffect(() => {
    if (!openLabel) return;

    const outside = (event: Event) => {
      const target = event.target as Node | null;
      if (target && headerRef.current?.contains(target)) return;
      setOpen(null);
    };

    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
    };
  }, [openLabel]);

  /* -- Lock the page behind the mobile sheet ------------------------------ */
  // A class of its own rather than `body.style.overflow`: more than one owner
  // can hold a lock at the same moment, and whichever component wrote the
  // inline property last would silently release the other's lock. Each owner
  // adds and removes only its own class (see globals.css).
  useEffect(() => {
    const { body } = document;
    body.classList.toggle("is-locked-menu", mobileOpen);
    return () => {
      body.classList.remove("is-locked-menu");
    };
  }, [mobileOpen]);

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpen((current) => (current?.via === "press" ? current : null));
    }, 160);
  }, []);

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
  }, []);

  const hoverOpen = useCallback(
    (group: NavGroup) => {
      cancelClose();
      if (!group.panel) {
        setOpen((current) => (current?.via === "press" ? current : null));
        return;
      }
      setOpen((current) =>
        current?.label === group.label ? current : { label: group.label, via: "hover" },
      );
    },
    [cancelClose],
  );

  // Close the mega menu when a link inside it is clicked. If the link points at
  // the page we are already on, the route will not change (so the menu-close
  // effect never fires and nothing appears to happen) — scroll to the top so
  // the click has a visible result.
  const onMenuNavigate = useCallback(
    (event: React.MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      setOpen(null);
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
      <a
        href="#main"
        className="sr-only-focusable focus-visible:fixed focus-visible:left-6 focus-visible:top-6 focus-visible:z-[120] focus-visible:m-0 focus-visible:h-auto focus-visible:w-auto focus-visible:rounded-[var(--radius-control)] focus-visible:bg-ink-900 focus-visible:px-6 focus-visible:py-3 focus-visible:text-sm focus-visible:text-white focus-visible:[clip-path:none]"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-[90]"
        onMouseLeave={scheduleClose}
      >
        {/* Opaque the moment the page moves. No translucency and no blur:
            over a photographic hero a frosted bar leaves the wordmark and
            the links sitting on whatever happens to be behind them, and the
            contrast of the navigation then depends on the image. */}
        <div
          className={cn(
            "transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-quart)]",
            condensed || openLabel
              ? "border-b border-ink-900/10 bg-canvas shadow-[var(--shadow-sm)]"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <div className="shell">
            <div
              className={cn(
                "flex items-center justify-between gap-6 transition-[height] duration-300 ease-[var(--ease-out-quart)]",
                condensed ? "h-[4.5rem]" : "h-[5.25rem]",
              )}
            >
              <Logo tone={onDark ? "deep" : "light"} />

              {/* ---- Desktop navigation ---- */}
              <nav aria-label="Primary" className="hidden lg:block">
                <ul className="flex items-center gap-0.5">
                  {primaryNav.map((group) => {
                    const panelId = `nav-panel-${slugify(group.label)}`;
                    const expanded = openLabel === group.label;
                    const active = isActive(group.href);

                    return (
                      <li
                        key={group.label}
                        className="relative"
                        onMouseEnter={() => hoverOpen(group)}
                      >
                        <span
                          className={cn(
                            "flex items-center rounded-[var(--radius-control)] transition-colors duration-200",
                            expanded && !onDark && "bg-ink-900/5",
                          )}
                        >
                          <Link
                            href={group.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "relative block py-2.5 pl-3.5 text-[0.9375rem] font-medium transition-colors duration-200",
                              group.panel ? "pr-1" : "pr-3.5",
                              active || expanded
                                ? onDark
                                  ? "text-white"
                                  : "text-ink-950"
                                : onDark
                                  ? "text-ink-100 hover:text-white"
                                  : "text-neutral-600 hover:text-ink-950",
                            )}
                          >
                            {group.label}
                            {/* The active marker is a rule under the label,
                                in the accent — the one place in the bar the
                                blue is spent. */}
                            <span
                              aria-hidden
                              className={cn(
                                "absolute inset-x-3.5 bottom-1 h-[2px] origin-left rounded-full transition-transform duration-300 ease-[var(--ease-out-quart)]",
                                onDark ? "bg-white" : "bg-meniscus-500",
                                active ? "scale-x-100" : "scale-x-0",
                              )}
                            />
                          </Link>

                          {/* A real control for the panel, so it can be
                              opened without a pointer. The link beside it
                              still goes to the section's own page. */}
                          {group.panel ? (
                            <button
                              type="button"
                              aria-expanded={expanded}
                              aria-controls={panelId}
                              aria-label={`${group.label} menu`}
                              /* A press on a panel that hover already
                                 opened *pins* it rather than closing it.
                                 Toggling on label alone meant that on a
                                 pointer device the press always arrived
                                 after the mouseenter, so the button could
                                 never open anything — it only ever undid
                                 the hover that bringing the pointer to it
                                 had just caused. */
                              onClick={() =>
                                setOpen((current) =>
                                  current?.label === group.label && current.via === "press"
                                    ? null
                                    : { label: group.label, via: "press" },
                                )
                              }
                              className={cn(
                                "grid h-9 w-7 place-items-center rounded-[var(--radius-control)] transition-colors duration-200",
                                onDark
                                  ? "text-ink-200 hover:text-white"
                                  : "text-neutral-500 hover:text-ink-950",
                              )}
                            >
                              <ChevronDown
                                aria-hidden
                                className={cn(
                                  "h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-quart)]",
                                  expanded && "rotate-180",
                                )}
                              />
                            </button>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
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
                    "grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border transition-colors duration-200 lg:hidden",
                    onDark
                      ? "border-white/25 text-white hover:border-white"
                      : "border-ink-900/15 text-ink-900 hover:border-ink-900/40",
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
          {openLabel ? (
            <MegaPanel
              id={`nav-panel-${slugify(openLabel)}`}
              group={primaryNav.find((g) => g.label === openLabel)!}
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
  id,
  group,
  onEnter,
  onLeave,
  onNavigate,
}: {
  id: string;
  group: NavGroup;
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: (event: React.MouseEvent) => void;
}) {
  const panel = group.panel;
  if (!panel) return null;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: easing.quart }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onNavigate}
      className="hidden border-b border-ink-900/10 bg-canvas shadow-[var(--shadow-md)] lg:block"
    >
      <div className="shell">
        <div className="grid grid-cols-[minmax(0,16rem)_minmax(0,1fr)] gap-x-14 py-9">
          {/* Intro */}
          <div className="border-r border-ink-900/8 pr-10">
            <p className="label-mono text-meniscus-600">{panel.intro.eyebrow}</p>
            <p className="mt-4 font-display text-h2 text-ink-950">{panel.intro.title}</p>
            <p className="mt-3 max-w-[30ch] text-small text-neutral-600">{panel.intro.body}</p>
            <ActionLink href={panel.intro.cta.href} variant="text" className="mt-5">
              {panel.intro.cta.label}
            </ActionLink>
          </div>

          {/* Link columns — grouped by the heading the content layer gives
              them, so "Safety & toxicology" is a label in the menu and not
              only on the research page. */}
          <div
            className={cn(
              "grid gap-x-8 gap-y-6",
              panel.columns.length >= 3 ? "grid-cols-3" : "grid-cols-2",
            )}
          >
            {panel.columns.map((column) => (
              <div key={column.heading}>
                <p className="label-mono mb-3 border-b border-ink-900/8 pb-2.5 text-neutral-550">
                  {column.heading}
                </p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group row-interactive -mx-3 flex items-center justify-between gap-3 rounded-[var(--radius-control)] px-3 py-2"
                      >
                        <span className="flex flex-col">
                          <span className="text-small font-medium text-ink-900 transition-colors duration-200 group-hover:text-meniscus-600">
                            {link.label}
                          </span>
                          {link.description ? (
                            <span className="text-micro text-neutral-500">{link.description}</span>
                          ) : null}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="h-4 w-4 shrink-0 -translate-x-1 text-meniscus-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
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
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain bg-deep text-white lg:hidden"
          data-theme="deep"
        >
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3, ease: easing.quart }}
            className="shell flex min-h-full flex-col pb-10"
          >
            <div className="flex h-[5.25rem] shrink-0 items-center justify-between">
              <Logo tone="deep" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-[var(--radius-control)] border border-white/25 transition-colors duration-200 hover:border-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-4 flex-1">
              <ul>
                {primaryNav.map((group) => (
                  <li key={group.label} className="border-t border-white/12">
                    <Link
                      href={group.href}
                      aria-current={
                        group.href === "/"
                          ? pathname === "/"
                            ? "page"
                            : undefined
                          : pathname.startsWith(group.href)
                            ? "page"
                            : undefined
                      }
                      className={cn(
                        "block py-4 font-display text-d4",
                        pathname.startsWith(group.href) ? "text-meniscus-300" : "text-white",
                      )}
                    >
                      {group.label}
                    </Link>

                    {group.panel ? (
                      /* Grouped on a phone exactly as on the desktop panel:
                         the division and sector lists are the only route to
                         those eighteen pages here, and an undifferentiated
                         run of chips is not a navigable list. Each target
                         carries 44px of height (WCAG 2.5.8). */
                      <div className="-mt-1 space-y-4 pb-5">
                        {group.panel.columns.map((column) => (
                          <div key={column.heading}>
                            <p className="label-mono text-ink-200">{column.heading}</p>
                            <ul className="mt-0.5">
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="flex min-h-11 items-center text-small text-ink-100 transition-colors duration-200 hover:text-white"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/12 pt-7">
              <ActionLink href="/contact" variant="solid" tone="deep">
                Request a proposal
              </ActionLink>
              <a
                href={`tel:${contact.phoneHref}`}
                className="text-small text-ink-100 transition-colors hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-small text-ink-100 transition-colors hover:text-white"
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
