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
    <Section bleed id="apply" className="overflow-hidden scroll-mt-24">
      <div className="shell relative">
        <SectionBody>
          <div className="egrid gap-y-9">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow index="04">
                Apply
              </Eyebrow>

              <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
                Tell us{" "}
                <span className="font-display text-ink-800">
                  where you fit.
                </span>
              </RevealText>

              <p className="mt-7 text-small text-neutral-600">
                Applications go to the same address as everything else here, and they are read by
                people who know what the departments do.
              </p>

              <dl className="mt-6 border-t border-[var(--rule)]">
                <div className="border-b border-[var(--rule)] py-5">
                  <dt className="label-mono text-neutral-550">Write to us</dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-display text-h1 text-ink-950 underline decoration-white/25 underline-offset-[6px] transition-colors duration-400 hover:text-ink-950 hover:decoration-signal-400"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>

                <div className="border-b border-[var(--rule)] py-5">
                  <dt className="label-mono text-neutral-550">Call the laboratory</dt>
                  <dd className="mt-3 flex flex-col gap-1.5">
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="font-display text-h1 text-ink-950 underline decoration-ink-900/20 underline-offset-[6px] transition-colors duration-400 hover:decoration-ink-900"
                    >
                      {contact.phoneDisplay}
                    </a>
                    <a
                      href={`tel:${contact.mobileHref}`}
                      className="font-display text-h2 text-ink-950 underline decoration-ink-900/20 underline-offset-[6px] transition-colors duration-400 hover:decoration-ink-900"
                    >
                      {contact.mobileDisplay}
                    </a>
                  </dd>
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
