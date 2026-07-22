import { contact } from "@/content/site";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

/**
 * The enquiry chapter: the form on seven columns, the direct lines held beside
 * it on four and pinned as the form is filled in.
 *
 * The telephone and the address stay visible the whole way down, because the
 * fastest route to a scoping conversation is usually not a form.
 */
export function EnquirySection() {
  return (
    <Section tone="sunken" id="enquiry" className="scroll-mt-24">
      <SectionBody>
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="01">Enquiries</Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              Tell us what has to be registered, and where.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">{contact.formNote}</p>
          </div>
        </div>

        <div className="egrid mt-6 gap-y-8 lg:mt-7">
          <div className="col-span-12 lg:col-span-7">
            <EnquiryForm />
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:rail-sticky">
              <p className="label-mono text-neutral-600">Direct lines</p>

              <dl className="mt-6 border-t border-ink-900/15">
                <div className="border-b border-ink-900/15 py-6">
                  <dt className="label-mono text-neutral-550">Telephone</dt>
                  <dd className="mt-4 flex flex-col gap-2">
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="font-display text-[clamp(1.5rem,2vw,1.875rem)] font-medium leading-snug tracking-[-0.012em] text-ink-950 underline-offset-4 transition-colors duration-400 hover:underline"
                    >
                      {contact.phoneDisplay}
                    </a>
                    <a
                      href={`tel:${contact.mobileHref}`}
                      className="font-display text-[clamp(1.5rem,2vw,1.875rem)] font-medium leading-snug tracking-[-0.012em] text-ink-950 underline-offset-4 transition-colors duration-400 hover:underline"
                    >
                      {contact.mobileDisplay}
                    </a>
                  </dd>
                </div>

                <div className="border-b border-ink-900/15 py-6">
                  <dt className="label-mono text-neutral-550">Email</dt>
                  <dd className="mt-4">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-display text-[clamp(1.5rem,2vw,1.875rem)] font-medium leading-snug tracking-[-0.012em] break-words text-ink-950 underline-offset-4 transition-colors duration-400 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-small text-neutral-600">
                Nothing typed into this page is stored anywhere. Sending an enquiry drafts the
                message in your own mail application, addressed to the same inbox above.
              </p>

              <ActionLink href="#locations" variant="text" className="mt-6">
                Where to find us
              </ActionLink>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
