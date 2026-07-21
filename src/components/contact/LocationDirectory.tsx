import { ArrowUpRight } from "lucide-react";

import { cn, pad } from "@/lib/utils";
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
 * The three sites, set as a directory rather than a row of cards.
 *
 * Each entry is a full-width record — plate, label, role, address — and the
 * plate changes side down the list, so the band reads as a survey being worked
 * through instead of three interchangeable tiles.
 */
export function LocationDirectory() {
  return (
    <Section tone="deep" bleed id="locations" className="overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-50"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.03)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <SectionBody>
          <div className="egrid items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow index="02" tone="deep">
                Where to find us
              </Eyebrow>
              <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
                Three addresses, one laboratory.
              </RevealText>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <p className="text-small text-ink-200">
                Every address below opens in your own map application. Sponsors are welcome to
                audit any of the units — say which one you are coming to and we will meet you
                there.
              </p>
            </div>
          </div>

          <div className="mt-[clamp(3.5rem,7vw,6rem)]">
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
                  className="egrid group items-center gap-y-8 border-t border-white/12 py-[clamp(2.5rem,5vw,4rem)] last:border-b last:border-b-white/12 lg:gap-x-[clamp(2rem,4vw,4rem)]"
                >
                  <div
                    className={cn(
                      "relative col-span-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-white/12 sm:aspect-[16/9] lg:col-span-5 lg:row-start-1 lg:aspect-[4/3]",
                      plateFirst ? "lg:col-start-1" : "lg:col-start-8",
                    )}
                  >
                    <MapPlate seed={i + 1} tone="deep" />
                    <p className="label-mono absolute left-5 top-5 rounded-full border border-white/15 bg-deep/70 px-3 py-1.5 text-ink-100 backdrop-blur-sm">
                      Fig. {pad(i + 1)}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "col-span-12 lg:col-span-6 lg:row-start-1",
                      plateFirst ? "lg:col-start-7" : "lg:col-start-1",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                      <span className="label-mono tabular-nums text-signal-400">
                        {pad(i + 1)}
                      </span>
                      <h3 className="font-display text-d4 text-white">{location.label}</h3>
                    </div>

                    <p className="label-mono mt-4 text-ink-300">{location.role}</p>

                    <address className="mt-7 not-italic">
                      <ul className="text-lead leading-[1.5] text-ink-100">
                        {location.lines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </address>

                    <a
                      href={mapsUrl(location.lines)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/map mt-8 inline-flex items-center gap-2.5 border-b border-white/25 pb-2 font-display text-h3 text-white transition-colors duration-400 hover:border-signal-400 hover:text-signal-300"
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
