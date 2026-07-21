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
    "The accreditation register: OECD GLP, NABL ISO/IEC 17025, AAALAC, CPCSEA, AERB, SIRO/DSIR, CIBRC, AYUSH, SENASA and SENAVE — each record listed with its issuing authority, scope and published certificate.",
  path: "/downloads",
  keywords: [
    "NSRL accreditations",
    "GLP certificate",
    "NABL ISO/IEC 17025 certificate",
    "AAALAC accreditation",
    "CPCSEA registration",
    "AERB certification",
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
            <span className="text-signal-300">open for inspection.</span>
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
          <div className="glass rounded-[var(--radius-card)] p-7">
            <h2 className="label-mono text-signal-400">Register key</h2>
            <dl className="mt-6">
              <div className="border-t border-white/12 py-5">
                <dt className="font-display text-h3 text-white">Certificate filed</dt>
                <dd className="mt-2 text-small text-ink-200">
                  The certificate is published by the laboratory. The record links to it and the
                  link opens in a new tab.
                </dd>
              </div>
              <div className="border-t border-white/12 py-5">
                <dt className="font-display text-h3 text-white">No certificate filed</dt>
                <dd className="mt-2 text-small text-ink-200">
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
