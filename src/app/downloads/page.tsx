import type { Metadata } from "next";

import {
  accreditations,
  acceptingAuthorities,
  acceptingCountries,
} from "@/content/accreditations";
import { pad } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { RegisterVisual } from "@/components/downloads/RegisterVisual";
import { CertificateRegister } from "@/components/downloads/CertificateRegister";
import { AcceptanceBand } from "@/components/downloads/AcceptanceBand";
import { RegisterOutro } from "@/components/downloads/RegisterOutro";

export const metadata: Metadata = pageMetadata({
  title: "Downloads — Accreditation Certificates & Approvals",
  description:
    "The accreditation register: OECD GLP, NABL ISO/IEC 17025, SIRO/DSIR and CIBRC — each record listed with its issuing authority, scope and published certificate.",
  path: "/downloads",
  keywords: [
    "NSRL accreditations",
    "GLP certificate",
    "NABL ISO/IEC 17025 certificate",
    "SIRO DSIR recognition",
    "CIBRC recognition",
  ],
});

const filed = accreditations.filter((record) => record.certificateUrl).length;

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Evidence on file"
        index="R.01"
        title={
          <>
            Every certificate,{" "}
            {/* The one accented phrase on the page, and it is the claim the
                page exists to make. Signal green is reserved for "held";
                this is emphasis, so it takes the primary accent. */}
            <span className="text-meniscus-500">open for inspection.</span>
          </>
        }
        lead="Accreditations, statutory registrations and sector approvals, held as a single register. Each record names the authority that issued it and the scope it covers — and where the laboratory has published the certificate, links straight to it."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Downloads" },
        ]}
        meta={[
          { label: "Records", value: pad(accreditations.length) },
          { label: "Certificates filed", value: pad(filed) },
          { label: "Authorities", value: pad(acceptingAuthorities.length) },
          { label: "Countries", value: pad(acceptingCountries.length) },
        ]}
        visual={<RegisterVisual />}
        aside={
          /* A solid card, not frosted glass: the hero is a light surface, and
             the white-on-translucent-white it used to be was all but
             unreadable. */
          <div className="card-elevated p-6 sm:p-7">
            <h2 className="label-mono text-meniscus-600">Register key</h2>
            <dl className="mt-5">
              <div className="border-t border-ink-900/10 py-4 first:border-t-0 first:pt-0">
                <dt className="font-display text-h3 text-ink-950">Certificate filed</dt>
                <dd className="mt-1.5 text-small text-neutral-600">
                  The certificate is published by the laboratory. The record links to it and the
                  link opens in a new tab.
                </dd>
              </div>
              <div className="border-t border-ink-900/10 py-4 last:pb-0">
                <dt className="font-display text-h3 text-ink-950">No certificate filed</dt>
                <dd className="mt-1.5 text-small text-neutral-600">
                  The record is listed in full but carries no link, because no certificate has
                  been published for it.
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      <CertificateRegister />
      <AcceptanceBand />
      <RegisterOutro />
    </>
  );
}
