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
      />

      <CertificateRegister />
      <AcceptanceBand />
      <RegisterOutro />
    </>
  );
}
