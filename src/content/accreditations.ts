/**
 * Accreditations, approvals and recognitions.
 *
 * `certificateUrl` points at the certificate published by the laboratory.
 * Where a certificate is not published, the field is omitted and the UI shows
 * the entry without a download affordance rather than a dead link.
 *
 * Six records were withdrawn at the client's instruction: the two animal
 * welfare entries (AAALAC, CPCSEA), AERB, AYUSH, and the two international
 * registrations (SENASA, SENAVE). Every claim that rested on them has been
 * removed from the prose as well — a site whose argument is "here is the
 * certificate" cannot keep asserting an accreditation it no longer lists.
 * See README.md if any of these are held but simply not published, because
 * that is a different decision and the copy would be reinstated differently.
 */

export type Accreditation = {
  id: string;
  abbr: string;
  name: string;
  issuer: string;
  /**
   * The published standard the accreditation is assessed against, in the
   * short form a reviewer would search for.
   *
   * Only set where the accreditation *is* accreditation to a named external
   * standard, which in this register is NABL alone. It exists because the
   * compact listings have room for an abbreviation and not for a full
   * record name, and "NABL" on its own does not tell a visitor that the
   * laboratory is accredited to ISO/IEC 17025.
   */
  standard?: string;
  scope: string;
  /** Grouping used by the downloads page and the accreditation wall. */
  category: "Good Laboratory Practice" | "Testing & calibration" | "Sector approval";
  certificateUrl?: string;
  /**
   * A thumbnail of the linked certificate's first page, rendered from the
   * document itself and served locally.
   *
   * Set only where the linked document has been opened and confirmed to be
   * the credential this record describes. A preview is a much stronger
   * assertion than a link — a reader scanning thumbnails takes the image
   * as the certificate — so a record whose document has not been verified
   * keeps its text entry and shows no frame. An empty or mismatched frame
   * would be worse than none.
   */
  preview?: { src: string; width: number; height: number };
};

export const accreditations: Accreditation[] = [
  {
    id: "glp",
    abbr: "OECD GLP",
    name: "Good Laboratory Practice certification",
    issuer: "NGCMA, Department of Science and Technology, Government of India",
    scope:
      "Compliance with OECD Principles of Good Laboratory Practice, the basis on which study reports are accepted across all OECD Mutual Acceptance of Data countries.",
    category: "Good Laboratory Practice",
    certificateUrl:
      "https://drive.google.com/file/d/17GU4XvbPc9TXYjx6ebWmhJFBnolnavkZ/view?usp=sharing",
    /* Rendered from page one of the linked PDF. Verified: it is a GLP
       Compliance Certificate issued by NGCMA under the Department of
       Science and Technology, which is the credential and the issuer this
       record names. Certificate GLP/C-244/2025, valid to 3 April 2028.

       The other three records carry no preview. Their linked documents
       were opened and are a different credential in each case — see
       README. They keep their text entries until the correct documents
       are supplied. */
    preview: { src: "/images/certificates/oecd-glp.webp", width: 1024, height: 724 },
  },
  {
    id: "nabl",
    abbr: "NABL",
    name: "ISO/IEC 17025:2017 accreditation",
    issuer: "National Accreditation Board for Testing and Calibration Laboratories",
    standard: "ISO/IEC 17025:2017",
    scope:
      "Technical competence of the testing laboratory against the international standard for testing and calibration laboratories.",
    category: "Testing & calibration",
    certificateUrl:
      "https://drive.google.com/file/d/1eNzPhH-eo3gQskn-43HafAoGdKMFO8BC/view?usp=sharing",
  },
  {
    id: "siro",
    abbr: "SIRO / DSIR",
    name: "Scientific and Industrial Research Organisation recognition",
    issuer:
      "Department of Scientific and Industrial Research, Ministry of Science and Technology",
    scope:
      "Government recognition as an in-house scientific and industrial research organisation.",
    category: "Sector approval",
    certificateUrl:
      "https://drive.google.com/file/d/1pjYU0N-rEMD0JpOiZk1VD1zehN8m_C0P/view?usp=sharing",
  },
  {
    id: "cibrc",
    abbr: "CIBRC",
    name: "Central Insecticides Board and Registration Committee recognition",
    issuer: "Central Insecticides Board and Registration Committee, Government of India",
    scope:
      "Recognition to generate data supporting the registration of insecticides and agrochemicals in India.",
    category: "Sector approval",
    certificateUrl:
      "https://drive.google.com/file/d/1t6L45Xb4eSg6ySTO2zBoDY6jYnUVOqIV/view?usp=sharing",
  },
];

// Serving one accreditation's certificate under another's name is the single
// failure that would read as fabrication on a page whose whole premise is
// verifiable evidence. Fail the build rather than ship it.
const certificateUrls = accreditations
  .map((a) => a.certificateUrl)
  .filter((url): url is string => Boolean(url));
if (new Set(certificateUrls).size !== certificateUrls.length) {
  throw new Error(
    "Two accreditations share a certificate URL. Each certificate must be its own document.",
  );
}

export function getAccreditation(id: string) {
  return accreditations.find((a) => a.id === id);
}

/**
 * Agencies that have accepted study reports issued by the laboratory.
 *
 * Only these two are supported by the source material. The other bodies named
 * across the site — NGCMA, NABL, DSIR and CIBRC — certify or recognise the
 * laboratory; that is a different claim, and it is made in `accreditations`
 * above rather than conflated with report acceptance.
 */
export const acceptingAuthorities = ["US FDA", "EMA"];

/** Countries whose regulatory agencies have accepted the laboratory's reports. */
export const acceptingCountries = ["USA", "United Kingdom", "Japan", "China", "Brazil", "India"];
