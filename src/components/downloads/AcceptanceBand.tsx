import { acceptingAuthorities, acceptingCountries } from "@/content/accreditations";
import { pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { Section, SectionBody } from "@/components/ui/Section";

/**
 * The credibility band: who has read these reports, and where.
 *
 * Set as a stamp sheet — a bordered matrix of authorities with corner ticks,
 * then the countries as one long ruled line of display type. It is the only
 * place on the page where the type gets large, which is what stops the register
 * above from reading as an undifferentiated wall of rules.
 */
export function AcceptanceBand() {
  return (
    <Section tone="deep" bleed id="acceptance" className="overflow-hidden">
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-60"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.03)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <SectionBody className="shell relative">
        <div className="egrid items-end gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="02" tone="deep">
              Acceptance
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              A certificate is only worth who accepts it.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-ink-200">
              Reports issued by the laboratory have been accepted by the regulatory authorities
              below, and by agencies in the countries beside them.
            </p>
          </div>
        </div>

        {/* ---- Stamp sheet ------------------------------------------------ */}
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-baseline justify-between gap-6 border-b border-white/12 pb-4">
            <h3 className="label-mono text-signal-400">Accepting authorities</h3>
            <span aria-hidden className="label-mono text-ink-300/50">
              {pad(acceptingAuthorities.length)}
            </span>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {acceptingAuthorities.map((authority, i) => (
              <li
                key={authority}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
                className="group relative border-b border-r border-white/10 px-6 py-9 transition-colors duration-500 hover:border-signal-400/50 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                {/* Corner tick — the register's signature detail, at cell scale. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-2.5 w-px bg-signal-400/0 transition-colors duration-500 group-hover:bg-signal-400"
                />
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-2.5 bg-signal-400/0 transition-colors duration-500 group-hover:bg-signal-400"
                />

                <span className="label-mono block text-ink-300 tabular-nums">
                  {pad(i + 1)}
                </span>
                <span className="mt-4 block font-display text-h2 text-white transition-colors duration-400 group-hover:text-signal-300">
                  {authority}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Countries -------------------------------------------------- */}
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-baseline justify-between gap-6 border-b border-white/12 pb-4">
            <h3 className="label-mono text-signal-400">Reports accepted in</h3>
            <span aria-hidden className="label-mono text-ink-300/50">
              {pad(acceptingCountries.length)}
            </span>
          </div>

          <ul className="mt-9 flex flex-wrap items-baseline gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-5">
            {acceptingCountries.map((country, i) => (
              <li
                key={country}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
                className="flex items-baseline gap-[clamp(1.5rem,3vw,3rem)]"
              >
                <span className="font-display text-d4 tracking-[-0.03em] text-white">
                  {country}
                </span>
                {i < acceptingCountries.length - 1 ? (
                  <span aria-hidden className="h-8 w-px translate-y-1.5 bg-white/15" />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </SectionBody>
    </Section>
  );
}
