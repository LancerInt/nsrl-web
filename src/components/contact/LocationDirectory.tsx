import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { locations } from "@/content/site";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { MapPlate } from "@/components/contact/MapPlate";

/** Opens the visitor's own map application rather than embedding someone else's. */
function mapsUrl(lines: string[]): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lines.join(", "))}`;
}

/**
 * The office, as a single full-width record — plate, label, role, address.
 */
export function LocationDirectory() {
  return (
    <Section bleed id="locations" className="overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-35"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <SectionBody>
          <div className="egrid items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow>Where to find us</Eyebrow>
              <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
                One office, in Salem.
              </RevealText>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-small text-neutral-600">
                The address below opens in your own map application. Sponsors are welcome to audit
                the facility — tell us when you are coming and we will meet you there.
              </p>
            </div>
          </div>

          <div className="mt-[clamp(2rem,3.5vw,3rem)]">
            {locations.map((location, i) => {
              const plateFirst = i % 2 === 0;

              /* `egrid`, not `lg:grid-cols-12`: the plate and the address both
                 span twelve columns, and a grid that declares twelve tracks
                 only at lg forces the browser to invent them below it — eleven
                 phantom columns and eleven gutters, wider than a 390px shell.
                 The gutter widens again where the two columns genuinely sit
                 side by side. */
              return (
                <article
                  key={location.id}
                  data-reveal
                  className="egrid group items-center gap-y-8 lg:gap-x-[clamp(2rem,4vw,4rem)]"
                >
                  <div
                    className={cn(
                      "relative col-span-12 aspect-[4/3] img-frame sm:aspect-[16/9] lg:col-span-5 lg:row-start-1 lg:aspect-[4/3]",
                      plateFirst ? "lg:col-start-1" : "lg:col-start-8",
                    )}
                  >
                    <MapPlate seed={i + 1} />
                  </div>

                  <div
                    className={cn(
                      "col-span-12 lg:col-span-6 lg:row-start-1",
                      plateFirst ? "lg:col-start-7" : "lg:col-start-1",
                    )}
                  >
                    <h3 className="font-display text-d4 text-ink-950">{location.label}</h3>

                    <p className="label-mono mt-4 text-neutral-550">{location.role}</p>

                    <address className="mt-7 not-italic">
                      <ul className="text-lead leading-[1.5] text-neutral-600">
                        {location.lines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </address>

                    <a
                      href={mapsUrl(location.lines)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/map mt-6 inline-flex items-center gap-2.5 border-b border-[var(--rule)] pb-2 font-display text-h3 text-ink-950 transition-colors duration-400 hover:border-ink-900/40 hover:text-ink-950"
                    >
                      Open in Google Maps
                      <ArrowUpRight
                        aria-hidden
                        className="h-5 w-5 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/map:-translate-y-0.5 group-hover/map:translate-x-0.5"
                      />
                      <span className="sr-only-focusable">(opens in a new tab)</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionBody>
      </div>
    </Section>
  );
}
