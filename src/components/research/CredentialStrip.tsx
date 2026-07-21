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
    <Section tone="deep-raised" aria-labelledby="credentials">
      <SectionBody>
        <div className="egrid gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow index={index} tone="deep">
              Under accreditation
            </Eyebrow>

            <h2 id="credentials" className="mt-8 font-display text-d4 text-white">
              <RevealText as="span" className="block">
                What governs this work.
              </RevealText>
            </h2>

            <p className="mt-6 max-w-[30ch] text-small text-ink-200">
              {divisionName} operates inside the quality system audited under the
              certifications listed here.
            </p>

            <ul className="mt-10 flex flex-wrap gap-2">
              {credentials.map((credential) => (
                <li
                  key={credential.id}
                  className="label-mono rounded-full border border-signal-400/40 px-3.5 py-2 text-signal-300"
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
                className="group border-t border-white/12 py-9 transition-colors duration-500 hover:border-signal-400/50"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-display text-h2 text-white">{credential.name}</h3>
                  <span className="label-mono text-signal-400">{credential.abbr}</span>
                </div>

                <p className="label-mono mt-4 text-ink-200">{credential.issuer}</p>
                <p className="measure mt-4 text-small text-ink-200">{credential.scope}</p>

                {credential.certificateUrl ? (
                  <ActionLink
                    href={credential.certificateUrl}
                    variant="text"
                    tone="deep"
                    icon="diagonal"
                    external
                    className="mt-6"
                    cursorLabel="Open"
                  >
                    View the certificate
                  </ActionLink>
                ) : null}
              </li>
            ))}
            <li aria-hidden className="border-t border-white/12" />
          </ul>
        </div>
      </SectionBody>
    </Section>
  );
}
