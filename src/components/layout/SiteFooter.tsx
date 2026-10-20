import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { contact, footerNav, locations, site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { ActionLink } from "@/components/ui/ActionLink";

/** Inlined because lucide dropped brand marks in v1. */
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/**
 * The closing action and the directory.
 *
 * One proposal ask per page, and this is it — which is why no page adds a
 * second closing band of its own. The ask is specific rather than generic
 * ("tell us the authority you need to satisfy" asks for the one fact that
 * actually shapes a quote), and the phone number sits beside it because a
 * regulatory affairs lead with a deadline would rather call.
 *
 * The directory below is a single grid: brand and contact, four link
 * columns, and the address as a column of its own rather than a separate
 * band underneath. With one site, a full-width band for one address was
 * mostly empty space.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const office = locations[0];

  return (
    <footer data-theme="deep" className="relative isolate overflow-hidden bg-deep text-ink-100">
      {/* Closing call to action — the last decision point on the page. */}
      <div className="border-b border-white/10 bg-deep-raised">
        <div className="shell py-[clamp(3rem,5vw,4.5rem)]">
          <div className="grid items-center gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <p className="label-mono text-meniscus-300">Start a programme</p>
              <h2 className="mt-4 max-w-[18ch] font-display text-d3 text-white">
                Tell us the authority you need to satisfy.
              </h2>
              <p className="mt-5 max-w-[48ch] text-lead text-ink-200">
                We will map the endpoints, the guidelines and the divisions from there — and
                tell you plainly if a study you have asked for is one you do not need.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div className="flex flex-wrap gap-3">
                <ActionLink href="/contact" variant="solid" tone="deep">
                  Request a proposal
                </ActionLink>
                <ActionLink href="/products" variant="outline" tone="deep">
                  Study packages
                </ActionLink>
              </div>
              <a
                href={`tel:${contact.phoneHref}`}
                className="font-display text-h2 text-white transition-colors duration-200 hover:text-meniscus-200"
              >
                {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Directory — brand, links and the address in one grid. */}
      <div className="shell py-[clamp(2.5rem,4vw,3.5rem)]">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="deep" />

            <p className="mt-6 max-w-[36ch] text-small text-ink-200">{site.shortDescription}</p>

            <h2 className="label-mono mt-7 text-ink-300">{office.label}</h2>
            <address className="mt-3 text-small not-italic leading-relaxed text-ink-100">
              {office.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <div className="mt-4 flex flex-col items-start">
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex min-h-9 items-center text-small text-ink-100 transition-colors duration-200 hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`tel:${contact.mobileHref}`}
                className="inline-flex min-h-9 items-center text-small text-ink-100 transition-colors duration-200 hover:text-white"
              >
                {contact.mobileDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-9 items-center text-small text-ink-100 transition-colors duration-200 hover:text-white"
              >
                {contact.email}
              </a>
            </div>

            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex h-[var(--control-h-sm)] items-center gap-2.5 rounded-[var(--radius-control)] border border-white/25 px-4 text-small transition-colors duration-200 hover:border-white"
            >
              <LinkedInMark />
              LinkedIn
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4 lg:col-span-8"
          >
            {footerNav.map((column) => (
              <div key={column.heading}>
                <h2 className="label-mono mb-4 text-ink-300">{column.heading}</h2>
                {/* The rows carry their own height rather than relying on
                    list spacing: on a phone these are the only navigation
                    left, and a 19px target is not one. */}
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-9 items-center text-small text-ink-100 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Baseline */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="text-micro text-ink-200">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/downloads"
              className="inline-flex min-h-9 items-center text-micro text-ink-200 transition-colors duration-200 hover:text-white"
            >
              Accreditations
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-9 items-center text-micro text-ink-200 transition-colors duration-200 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
