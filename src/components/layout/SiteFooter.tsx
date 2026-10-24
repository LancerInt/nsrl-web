import Link from "next/link";

import { contact, footerNav, locations, site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";

/**
 * The directory.
 *
 * The closing proposal ask used to be the band at the top of this element;
 * it now lives in `ClosingCta`, on a light surface, immediately above the
 * footer — see that file for why. What remains here is one grid: brand and
 * contact, four link columns, and the address as a column of its own rather
 * than a separate band underneath. With one site, a full-width band for one
 * address was mostly empty space.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const office = locations[0];

  return (
    <footer data-theme="deep" className="relative isolate overflow-hidden bg-deep text-ink-100">
      {/* Directory — brand, links and the address in one grid. */}
      <div className="shell py-[clamp(2.75rem,4.5vw,4rem)]">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="deep" />

            <p className="mt-6 max-w-[36ch] text-small text-ink-200">{site.shortDescription}</p>

            <h2 className="label-mono mt-7 text-ink-200">{office.label}</h2>
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
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4 lg:col-span-8"
          >
            {footerNav.map((column) => (
              <div key={column.heading}>
                <h2 className="label-mono mb-4 text-ink-200">{column.heading}</h2>
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
