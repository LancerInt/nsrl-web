import { getAccreditation, type Accreditation } from "@/content/accreditations";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The accreditations a division works under, resolved from its refs.
 *
 * Where the laboratory publishes a certificate the row carries a link to it;
 * where it does not, the row simply ends — an accreditation claim without a
 * certificate behind it is exactly the thing this page exists to avoid.
 */
export function CredentialStrip({
  refs,
  index,
  divisionName,
}: {
  refs: string[];
  index: string;
  divisionName: string;
}) {
  const credentials = refs
    .map(getAccreditation)
    .filter((entry): entry is Accreditation => Boolean(entry));

  if (!credentials.length) return null;

  return (
    <Section aria-labelledby="credentials">
      <SectionBody>
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow index={index}>
              Under accreditation
            </Eyebrow>

            <h2 id="credentials" className="mt-6 font-display text-d4 text-ink-950">
              <RevealText as="span" className="block">
                What governs this work.
              </RevealText>
            </h2>

            <p className="mt-6 max-w-[30ch] text-small text-neutral-600">
              {divisionName} operates inside the quality system audited under the
              certifications listed here.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {credentials.map((credential) => (
                <li
                  key={credential.id}
                  className="label-mono rounded-full border border-ink-900/45 px-3.5 py-2 text-ink-800"
                >
                  {credential.abbr}
                </li>
              ))}
            </ul>
          </div>

          <ul className="col-span-12 lg:col-span-7 lg:col-start-6">
            {credentials.map((credential, i) => (
              <li
                key={credential.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
                className="group border-t border-[var(--rule)] py-6 transition-colors duration-500 hover:border-ink-900/40"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-display text-h2 text-ink-950">{credential.name}</h3>
                  <span className="label-mono text-ink-800">{credential.abbr}</span>
                </div>

                <p className="label-mono mt-4 text-neutral-600">{credential.issuer}</p>
                <p className="measure mt-4 text-small text-neutral-600">{credential.scope}</p>

                {credential.certificateUrl ? (
                  <ActionLink
                    href={credential.certificateUrl}
                    variant="text"
                    icon="diagonal"
                    external
                    className="mt-6"
 
                  >
                    View the certificate
                  </ActionLink>
                ) : null}
              </li>
            ))}
            <li aria-hidden className="border-t border-[var(--rule)]" />
          </ul>
        </div>
      </SectionBody>
    </Section>
  );
}
