/**
 * Accreditations, approvals and recognitions.
 *
 * `certificateUrl` points at the certificate published by the laboratory.
 * Where a certificate is not published, the field is omitted and the UI shows
 * the entry without a download affordance rather than a dead link.
 */

export type Accreditation = {
  id: string;
  abbr: string;
  name: string;
  issuer: string;
  scope: string;
  /** Grouping used by the downloads page and the accreditation wall. */
  category: "Good Laboratory Practice" | "Animal welfare" | "Testing & calibration" | "Sector approval" | "International registration";
  certificateUrl?: string;
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
  },
  {
    id: "nabl",
    abbr: "NABL",
    name: "ISO/IEC 17025:2017 accreditation",
    issuer: "National Accreditation Board for Testing and Calibration Laboratories",
    scope:
      "Technical competence of the testing laboratory against the international standard for testing and calibration laboratories.",
    category: "Testing & calibration",
    certificateUrl:
      "https://drive.google.com/file/d/1eNzPhH-eo3gQskn-43HafAoGdKMFO8BC/view?usp=sharing",
  },
  {
    id: "aaalac",
    abbr: "AAALAC",
    name: "AAALAC International accreditation",
    issuer: "AAALAC International Council on Accreditation",
    scope:
      "Voluntary, peer-reviewed accreditation of the laboratory animal care and use programme against international standards of animal welfare.",
    category: "Animal welfare",
    certificateUrl:
      "https://drive.google.com/file/d/1HmN1czCPl05bB92z-u4HDYKVdZioOXWp/view?usp=sharing",
  },
  {
    id: "cpcsea",
    abbr: "CPCSEA",
    name: "CPCSEA registration",
    issuer:
      "Committee for the Purpose of Control and Supervision of Experiments on Animals",
    scope:
      "Statutory Indian registration governing the breeding of and experimentation on animals, including mandatory rehabilitation protocols.",
    category: "Animal welfare",
    certificateUrl:
      "https://drive.google.com/file/d/1dsaUfcEMi_IRrNHwKOdOIVL2pyQ-dXCI/view?usp=sharing",
  },
  {
    id: "aerb",
    abbr: "AERB",
    name: "Type 2 radioisotope laboratory certification",
    issuer: "Atomic Energy Regulatory Board",
    scope:
      "Authorisation to handle radioactive material at Type 2 laboratory classification for radiolabelled study work.",
    category: "Sector approval",
    certificateUrl:
      "https://drive.google.com/file/d/1JcgqkwrcbefG3g-2EEf736YUQZWQCfLF/view?usp=sharing",
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
  {
    id: "ayush",
    abbr: "AYUSH",
    name: "AYUSH approval",
    issuer: "State Drug Licensing Authority, Tamil Nadu",
    scope:
      "Approval to conduct testing in support of Ayurveda, Yoga, Unani, Siddha and Homoeopathy product submissions.",
    category: "Sector approval",
    certificateUrl:
      "https://drive.google.com/file/d/1Xl71auI2YEegKR7Ui9g3N-Q5MQYEkbsi/view?usp=sharing",
  },
  {
    id: "senasa",
    abbr: "SENASA",
    name: "SENASA registration — Argentina",
    issuer: "National Food Safety and Quality Service, Government of Argentina",
    scope:
      "Registration permitting study data to be submitted in support of Argentine regulatory dossiers.",
    category: "International registration",
    certificateUrl:
      "https://drive.google.com/file/d/1gb1TGwaA2LAGnJmwT06WHnS1qtDKO-An/view?usp=sharing",
  },
  {
    id: "senave",
    abbr: "SENAVE",
    name: "SENAVE registration — Paraguay",
    issuer: "National Service of Quality and Plant and Seed Health, Humaitá",
    scope:
      "Registration permitting study data to be submitted in support of Paraguayan plant and seed health dossiers.",
    category: "International registration",
    // No certificateUrl: the published register does not carry a distinct
    // SENAVE document. The UI renders the record without a download rather
    // than linking to another accreditation's certificate.
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
 * across the site — CIBRC, AERB, AYUSH, SENASA, SENAVE — certify or license
 * the laboratory; that is a different claim, and it is made in
 * `accreditations` above rather than conflated with report acceptance.
 */
export const acceptingAuthorities = ["US FDA", "EMA"];

/** Countries whose regulatory agencies have accepted the laboratory's reports. */
export const acceptingCountries = ["USA", "United Kingdom", "Japan", "China", "Brazil", "India"];
