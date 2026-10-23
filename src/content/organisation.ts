/**
 * Organisational facts: scale, positioning, quality system.
 *
 * No dates are asserted anywhere in this file. The reference material carries
 * achievements but not the years they occurred, and inventing a founding date
 * would be the one thing a credibility-led site cannot afford.
 */
import { accreditations } from "@/content/accreditations";

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
  /** Formatting hint for the count-up component. */
  decimals?: number;
};

/** Headline scale — used on the homepage counter band. */
export const scaleStats: Stat[] = [
  {
    value: 20000,
    suffix: "+",
    label: "GLP studies",
    caption: "Studies completed and reported under Good Laboratory Practice.",
  },
  {
    value: 275,
    suffix: "+",
    label: "Clients",
    caption: "Clients supported through testing and research programmes.",
  },
  {
    value: 50,
    suffix: "+",
    label: "Countries",
    caption: "Countries to which our study reports have been supplied.",
  },
  {
    /* Derived, never asserted. The register is the source of truth for how
       many accreditations there are, so this figure cannot drift from the
       documents actually published on /downloads. */
    value: accreditations.length,
    /* "& recognitions", because the four are not all accreditations: GLP is
       a certification, NABL is an accreditation, and SIRO/DSIR and CIBRC are
       recognitions. Totalling them under one word overstated what three of
       them are. */
    label: "Accreditations & recognitions",
    caption: "Laboratory credentials issued by independent bodies.",
  },
];

/** Physical and human scale — used on the facilities page. */
export const capacityStats: Stat[] = [
  {
    value: 150000,
    suffix: " sq ft",
    label: "Laboratory space",
    caption: "At a single accredited site in Salem, Tamil Nadu",
  },
  {
    value: 450,
    suffix: "+",
    label: "Instruments",
    caption: "Analytical, environmental and in-life equipment in service",
  },
  {
    value: 350,
    suffix: "+",
    label: "Professionals",
    caption: "Scientists, veterinarians, analysts and quality staff",
  },
  {
    value: 70,
    suffix: "+",
    label: "Clean rooms",
    caption: "Environmentally controlled animal housing",
  },
];

/* -------------------------------------------------------------------------- */
/*  Positioning                                                               */
/* -------------------------------------------------------------------------- */

export const positioning = {
  eyebrow: "Contract research organisation",
  headline: "Complete preclinical research, start to finish.",
  lead: "NutriScience Research Laboratory provides multidisciplinary testing and research services to support the safety, quality and regulatory assessment of agrochemicals, industrial chemicals, and food and feed additives.",
  supporting:
    "Our seven scientific divisions bring complementary expertise to each project, coordinating study planning, testing and reporting with clear communication and documented sample handling.",
} as const;

export type Differentiator = {
  index: string;
  title: string;
  body: string;
  metric?: string;
};

export const differentiators: Differentiator[] = [
  {
    index: "01",
    title: "One custodian, seven divisions",
    body: "Most programmes fragment across three or four vendors, and every handover is a place where context is lost and timelines slip. Here, chemistry, toxicology, ecotoxicology, entomology and microbiology sit inside one building and one quality system.",
    metric: "7 divisions",
  },
  {
    index: "02",
    title: "Accreditation that travels",
    body: "OECD GLP issued by NGCMA under the Department of Science and Technology means reports are accepted across every country in the OECD Mutual Acceptance of Data framework. NABL ISO/IEC 17025:2017 accreditation covers the technical dimension independently.",
    metric: "OECD MAD",
  },
  {
    index: "03",
    title: "An acceptance record, not a promise",
    body: "Reports issued by this laboratory have been submitted to and accepted by the US FDA, the EMA, and agencies in the UK, Japan, China, Brazil and India. Registration work includes India's first nano-fertiliser.",
    metric: "FDA · EMA",
  },
  {
    index: "04",
    title: "Welfare treated as data quality",
    body: "An explicit 3Rs framework — extended with rehabilitation — is not a compliance overlay. A stressed animal is a poor model, and the welfare programme exists because the science depends on it.",
    metric: "3Rs + R",
  },
  {
    index: "05",
    title: "Evidence kept for a decade",
    body: "Raw data, blocks, slides and samples are archived for ten years on RAID servers held both on-site and off-site. A study is only defensible for as long as the material behind it survives.",
    metric: "10 years",
  },
];

/* -------------------------------------------------------------------------- */
/*  Study lifecycle — the process, not an invented history                    */
/* -------------------------------------------------------------------------- */

export type LifecycleStage = {
  index: string;
  title: string;
  body: string;
  detail?: string;
};

export const studyLifecycle: LifecycleStage[] = [
  {
    index: "01",
    title: "Scope",
    body: "We start from the authority that will read the dossier, not from the study list. The endpoints, guidelines and species follow from that decision.",
    detail: "Regulatory strategy · guideline mapping · study design",
  },
  {
    index: "02",
    title: "Receipt",
    body: "Test items enter through a controlled Test Item Control Office with separate storage zones for pharmaceutical and non-pharmaceutical products. Sponsors receive confirmation within 48 hours.",
    detail: "TSC / TICO · segregated storage · 48-hour receipt",
  },
  {
    index: "03",
    title: "Characterise",
    body: "Identity, purity, concentration and stability are established in chemistry before a dose is prepared. Every number generated downstream depends on this step being right.",
    detail: "Identity · purity · stability guidance",
  },
  {
    index: "04",
    title: "Conduct",
    body: "Studies run in accredited facilities with continuous in-life monitoring and veterinary oversight. Divisions run in parallel where the science allows, which is where the timeline is actually won.",
    detail: "GLP conduct · in-life monitoring · parallel divisions",
  },
  {
    index: "05",
    title: "Audit",
    body: "An independent Quality Assurance unit audits the study against the protocol and the GLP principles. QA reports to management, not to the study director.",
    detail: "Independent QA · protocol compliance · phase inspection",
  },
  {
    index: "06",
    title: "Report",
    body: "Data are compiled into a study report written for the submitting authority, with the raw data traceable from every conclusion back to the instrument that produced it.",
    detail: "Traceable reporting · regulatory format",
  },
  {
    index: "07",
    title: "Archive",
    body: "Raw data, specimens and reports are held for ten years with redundant backup on RAID servers, on-site and off-site.",
    detail: "10-year archive · on-site and off-site redundancy",
  },
];

/* -------------------------------------------------------------------------- */
/*  Quality system                                                            */
/* -------------------------------------------------------------------------- */

export const qualityPillars = [
  {
    title: "Ethical compliance",
    body: "Studies are planned and conducted within applicable ethical frameworks, with required reviews and approvals completed before work begins.",
  },
  {
    title: "Animal welfare",
    body: "Documented care procedures, veterinary oversight and health monitoring support animal welfare throughout the study.",
  },
  {
    title: "Employee safety",
    body: "Safe handling procedures, appropriate protective equipment and staff training support the safe management of chemicals and biological materials.",
  },
  {
    title: "Data security",
    body: "Controlled access, documented backups and organised archiving help protect study data, confidentiality and record traceability.",
  },
  {
    title: "Timely completion",
    body: "Realistic schedules, progress monitoring and clear communication support study completion within agreed timelines.",
  },
];

export const qualitySystems = [
  {
    title: "Test item management",
    subtitle: "Receipt & traceability",
    body: "Documented receipt, identification, storage and handling procedures support test item integrity and traceability throughout each study.",
  },
  {
    title: "Data management",
    subtitle: "Security & retention",
    body: "Controlled access, regular backups and organised archiving protect study records and support retrieval within agreed retention periods.",
  },
  {
    title: "Quality assurance",
    subtitle: "NABL / ISO/IEC 17025",
    body: "Our quality system incorporates NABL accreditation to ISO/IEC 17025 within the accredited scope, supported by independent inspections and documented reviews of procedures, records and reports.",
  },
];

export const threeRs = [
  {
    letter: "R",
    word: "Replacement",
    body: "Use suitable non-animal methods, including in vitro and in silico approaches, wherever they can meet the study objectives and applicable requirements.",
  },
  {
    letter: "R",
    word: "Refinement",
    body: "Refine procedures, housing and handling to minimise pain and distress, supported by appropriate care, monitoring and humane endpoints.",
  },
  {
    letter: "R",
    word: "Reduction",
    body: "Use the minimum number of animals needed to produce scientifically reliable results through sound study design and appropriate analysis.",
  },
  {
    letter: "R",
    word: "Rehabilitation",
    body: "Consider post-study care and rehabilitation where appropriate, guided by veterinary assessment and applicable ethical requirements.",
  },
];

/**
 * Research and capabilities.
 *
 * These replace a set of superlative "firsts" — India's first
 * nano-fertiliser registration, India's largest ecotoxicology department,
 * reports accepted by the FDA and EMA. Those were claims about primacy and
 * scale that a reader cannot check; these describe what the laboratory
 * does, which they can.
 */
export const milestones = [
  {
    title: "Biopesticide registration support",
    body: "Study planning and safety data generation to support the assessment and registration of biopesticide products.",
  },
  {
    title: "Comprehensive ecotoxicology",
    body: "Environmental safety studies covering aquatic and terrestrial organisms, birds and pollinators.",
  },
  {
    title: "International regulatory support",
    body: "Technical reports and study documentation prepared to support submissions to relevant regulatory authorities.",
  },
  {
    title: "NABL accreditation to ISO/IEC 17025:2017",
    body: "Recognition of laboratory competence for the tests specified within the accredited scope.",
  },
];
