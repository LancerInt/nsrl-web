import type { Metadata } from "next";
import Link from "next/link";

import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";
import { OrbitalMark } from "@/components/visuals/OrbitalMark";
import { disciplines } from "@/content/disciplines";
import { industries } from "@/content/industries";
import { contact } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Page not found",
    description:
      "The address you followed is not part of the NSRL site. Jump back to the scientific divisions, the sectors we serve, or talk to us directly.",
    path: "/404",
  }),
  robots: { index: false, follow: true },
};

/**
 * 404 as an instrument readout rather than an apology.
 *
 * The composition is deliberately unlike any other page: a deep band where an
 * oversized ghost numeral sits behind the copy and off the grid, a right-hand
 * rail of destinations set as hairline index rows, then a light band that is
 * nothing but the division index — because on a dead URL the most useful thing
 * a laboratory site can show is its own table of contents.
 */

const destinations = [
  {
    href: "/research",
    label: "Research divisions",
    note: `${disciplines.length} scientific divisions, indexed`,
  },
  {
    href: "/services",
    label: "Sectors we serve",
    note: `${industries.length} regulatory programmes`,
  },
  { href: "/facilities", label: "Facilities", note: "Units, environments and instruments" },
  { href: "/downloads", label: "Downloads", note: "Accreditation certificates on file" },
  { href: "/contact", label: "Contact", note: "Request a proposal" },
];

export default function NotFound() {
  return (
    <>
      {/* ---- Chapter 01 · the readout ----------------------------------- */}
      <Section
        tone="deep"
        className="overflow-hidden"
        innerClassName="relative pb-[var(--section-y)] pt-[clamp(9rem,20vh,14rem)]"
      >
        {/* Graticule and ghost numeral: both structural, neither informational. */}
        <span
          aria-hidden
          className="graticule pointer-events-none absolute inset-0 -z-10"
          style={
            {
              "--graticule-color": "rgba(255,255,255,0.035)",
              "--graticule-size": "6rem",
            } as React.CSSProperties
          }
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -top-[6vw] right-[-4vw] -z-10 select-none font-display text-[min(46vw,34rem)] leading-none font-bold tracking-[-0.06em] text-white/[0.035]"
        >
          404
        </span>
        <OrbitalMark
          animate
          className="pointer-events-none absolute -right-[10vw] bottom-[-14vw] -z-10 h-[min(52vw,40rem)] w-[min(52vw,40rem)] text-signal-400/25"
        />

        <div className="egrid gap-y-16">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="404" tone="deep">
              No record at this address
            </Eyebrow>

            <h1 className="mt-9 font-display text-d2 text-white">
              <RevealText as="span" trigger="mount" className="block">
                This page is not
              </RevealText>
              <RevealText as="span" trigger="mount" delay={0.1} className="block">
                in the{" "}
                <span className="font-editorial font-normal italic tracking-[-0.02em] text-signal-300">
                  archive.
                </span>
              </RevealText>
            </h1>

            <p
              data-reveal
              style={{ "--reveal-delay": "0.45s" } as React.CSSProperties}
              className="measure mt-10 text-lead text-ink-200"
            >
              The URL you followed does not resolve to anything we publish. It may have been
              retired, mistyped, or copied with a character missing. Nothing has been lost — the
              rest of the site is one step away.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.6s" } as React.CSSProperties}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <ActionLink href="/" variant="solid" tone="deep">
                Return to the homepage
              </ActionLink>
              <ActionLink href="/contact" variant="outline" tone="deep" cursorLabel="Enquire">
                Ask us directly
              </ActionLink>
            </div>
          </div>

          {/* Destination rail — offset, never centred against the copy. */}
          <nav
            aria-label="Suggested destinations"
            className="col-span-12 self-end lg:col-span-5 lg:col-start-8"
          >
            <p className="label-mono text-ink-200">Try instead</p>

            <ul className="mt-6">
              {destinations.map((item, i) => (
                <li
                  key={item.href}
                  data-reveal
                  style={{ "--reveal-delay": `${0.5 + i * 0.06}s` } as React.CSSProperties}
                >
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-5 border-t border-white/12 py-5 transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:border-signal-400/70"
                  >
                    <span className="label-mono shrink-0 text-ink-300">{pad(i + 1)}</span>
                    <span className="flex-1">
                      <span className="block font-display text-h2 text-white transition-colors duration-400 [transition-timing-function:var(--ease-out-expo)] group-hover:text-signal-300">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-small text-ink-100">{item.note}</span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-2 h-px w-6 shrink-0 bg-white/25 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:w-10 group-hover:bg-signal-400"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Direct line, because a dead page should still be answerable. */}
        <div className="mt-[clamp(4rem,8vw,7rem)] flex flex-col gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="label-mono text-ink-200">Or speak to someone</p>
          <p className="flex flex-wrap items-baseline gap-x-8 gap-y-2 font-display text-h3">
            <a
              href={`tel:${contact.phoneHref}`}
              className="text-white transition-colors duration-400 [transition-timing-function:var(--ease-out-expo)] hover:text-signal-300"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-white transition-colors duration-400 [transition-timing-function:var(--ease-out-expo)] hover:text-signal-300"
            >
              {contact.email}
            </a>
          </p>
        </div>
      </Section>

      {/* ---- Chapter 02 · the table of contents -------------------------- */}
      <Section tone="sunken">
        <SectionBody>
          <div className="egrid gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow index="01">Division index</Eyebrow>
              <h2 className="mt-8 font-display text-d4 text-ink-950">
                Every division, one click deep.
              </h2>
              <p className="measure-tight mt-6 text-body text-neutral-600">
                If you arrived looking for a specific capability, it is almost certainly listed
                here.
              </p>
            </div>

            <ul className="col-span-12 grid gap-x-[clamp(1.5rem,3vw,3rem)] sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {disciplines.map((discipline, i) => (
                <li key={discipline.slug}>
                  <Link
                    href={`/research/${discipline.slug}`}
                    className="group flex items-baseline gap-4 border-t border-ink-900/12 py-4 transition-colors duration-500 [transition-timing-function:var(--ease-out-expo)] hover:border-signal-500/70"
                  >
                    <span className="label-mono shrink-0 text-neutral-550">{pad(i + 1)}</span>
                    <span className="font-display text-h3 text-ink-950 transition-colors duration-400 [transition-timing-function:var(--ease-out-expo)] group-hover:text-signal-700">
                      {discipline.shortName ?? discipline.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SectionBody>
      </Section>
    </>
  );
}
