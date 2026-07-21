import { contact } from "@/content/site";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

/**
 * The closing chapter: the direct route on the left, the form on the right.
 *
 * The email and telephone come first deliberately — a form is a convenience,
 * and an applicant who would rather write should not have to hunt for where.
 */
export function ApplySection() {
  return (
    <Section tone="deep" bleed id="apply" className="overflow-hidden scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-signal-700) 42%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <SectionBody>
          <div className="egrid gap-y-16">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow index="04" tone="deep">
                Apply
              </Eyebrow>

              <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
                Tell us{" "}
                <span className="font-editorial font-normal italic tracking-[-0.02em] text-signal-300">
                  where you fit.
                </span>
              </RevealText>

              <p className="mt-7 text-small text-ink-200">
                Applications go to the same address as everything else here, and they are read by
                people who know what the departments do.
              </p>

              <dl className="mt-12 border-t border-white/12">
                <div className="border-b border-white/12 py-7">
                  <dt className="label-mono text-ink-300">Write to us</dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-display text-h1 text-white underline decoration-white/25 underline-offset-[6px] transition-colors duration-400 hover:text-signal-300 hover:decoration-signal-400"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>

                <div className="border-b border-white/12 py-7">
                  <dt className="label-mono text-ink-300">Call the laboratory</dt>
                  <dd className="mt-3">
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="font-display text-h1 text-white underline decoration-white/25 underline-offset-[6px] transition-colors duration-400 hover:text-signal-300 hover:decoration-signal-400"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </dd>
                  <dd className="label-mono mt-4 text-ink-300">{contact.phoneRange}</dd>
                </div>
              </dl>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <ApplicationForm />
            </div>
          </div>
        </SectionBody>
      </div>
    </Section>
  );
}
