import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { contact, footerNav, locations, site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { ActionLink } from "@/components/ui/ActionLink";
import { OrbitalMark } from "@/components/visuals/OrbitalMark";

/** Inlined because lucide dropped brand marks in v1. */
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="deep" className="relative isolate overflow-hidden bg-deep text-ink-100">
      {/* Closing call to action — the last decision point on the page. */}
      <div className="relative border-b border-white/10">
        <div
          className="graticule pointer-events-none absolute inset-0 opacity-40"
          style={
            {
              "--graticule-color": "rgba(255,255,255,0.04)",
              "--graticule-size": "5.5rem",
            } as React.CSSProperties
          }
        />
        <div className="shell relative py-[clamp(3rem,5vw,4.5rem)]">
          <div className="egrid items-end gap-y-7">
            <div className="col-span-12 lg:col-span-8">
              <p className="label-mono flex items-baseline gap-4 text-ink-200">
                <span>Start a programme</span>
                <span aria-hidden className="h-px min-w-6 flex-1 self-center bg-[var(--rule-invert)]" />
              </p>
              <h2 className="mt-6 font-display text-d3 text-white">
                Tell us the authority
                <br />
                you need to satisfy.
              </h2>
              <p className="mt-6 max-w-[46ch] text-lead text-ink-200">
                We will map the endpoints, the guidelines and the divisions from there — and tell
                you plainly if a study you have asked for is one you do not need.
              </p>
            </div>

            <div className="col-span-12 flex flex-wrap items-center gap-4 lg:col-span-4 lg:justify-end">
              <ActionLink href="/contact" variant="solid" tone="deep" >
                Request a proposal
              </ActionLink>
              <ActionLink href="/research" variant="outline" tone="deep">
                Browse divisions
              </ActionLink>
            </div>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="shell py-[clamp(2.5rem,4vw,3.5rem)]">
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <Logo tone="deep" />

            <p className="mt-7 max-w-[38ch] text-small text-ink-100">
              {site.shortDescription}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`tel:${contact.phoneHref}`}
                className="text-small text-white transition-colors duration-400 hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`tel:${contact.mobileHref}`}
                className="text-small text-white transition-colors duration-400 hover:text-white"
              >
                {contact.mobileDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-small text-white transition-colors duration-400 hover:text-white"
              >
                {contact.email}
              </a>
            </div>

            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-[3px] border border-white/20 px-5 py-3 text-small transition-colors duration-400 hover:border-white"
            >
              <LinkedInMark />
              LinkedIn
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:col-span-8"
          >
            {footerNav.map((column) => (
              <div key={column.heading}>
                <h2 className="label-mono mb-5 text-ink-200">{column.heading}</h2>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-small text-ink-100 transition-colors duration-400 hover:text-white"
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

        {/* Locations */}
        <div className="mt-6 grid gap-x-8 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div key={location.id}>
              <h2 className="label-mono text-ink-200">{location.label}</h2>
              <p className="mt-3 text-micro text-ink-200">{location.role}</p>
              <address className="mt-4 text-small not-italic text-ink-100">
                {location.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>
      </div>

      {/* Baseline */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <p className="label-mono text-ink-200">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/downloads"
              className="label-mono text-ink-200 transition-colors duration-400 hover:text-white"
            >
              Accreditations
            </Link>
            <Link
              href="/contact"
              className="label-mono text-ink-200 transition-colors duration-400 hover:text-white"
            >
              Contact
            </Link>
            <OrbitalMark className="h-6 w-6 text-ink-300/80" />
          </div>
        </div>
      </div>
    </footer>
  );
}
