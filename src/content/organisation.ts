/**
 * Organisational facts: scale, positioning, quality system, leadership.
 *
 * No dates are asserted anywhere in this file. The reference material carries
 * achievements but not the years they occurred, and inventing a founding date
 * would be the one thing a credibility-led site cannot afford.
 */

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
    caption: "Completed and reported under Good Laboratory Practice",
  },
  {
    value: 275,
    suffix: "+",
    label: "Clients",
    caption: "Sponsors who have brought a programme through the laboratory",
  },
  {
    value: 50,
    suffix: "+",
    label: "Countries",
    caption: "Jurisdictions our study reports have travelled to",
  },
  {
    value: 12,
    suffix: "+",
    label: "Accreditations",
    caption: "Independent certifications governing how the work is done",
  },
];

/** Physical and human scale — used on the facilities page. */
export const capacityStats: Stat[] = [
  {
    value: 150000,
    suffix: " sq ft",
    label: "Laboratory space",
    caption: "Across three units in Kanchipuram district, Tamil Nadu",
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
    caption: "Scientists, veterinarians, pathologists and quality staff",
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
  lead: "A one-stop, fully equipped and accredited laboratory built to meet agrochemical, pharmaceutical, medical device, discovery and radioisotope regulatory needs — without a single study leaving our custody.",
  supporting:
    "Thirteen scientific divisions share one quality system, one archive and one chain of custody. A molecule that arrives for chemistry can move to toxicology, pathology and radiolabelled fate work without a transfer, a re-validation, or a gap in the record.",
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
    title: "One custodian, thirteen divisions",
    body: "Most programmes fragment across three or four vendors, and every handover is a place where context is lost and timelines slip. Here, chemistry, toxicology, pathology, microbiology and radiolabelled work sit inside one building and one quality system.",
    metric: "13 divisions",
  },
  {
    index: "02",
    title: "Accreditation that travels",
    body: "OECD GLP issued by NGCMA under the Department of Science and Technology means reports are accepted across every country in the OECD Mutual Acceptance of Data framework. NABL ISO/IEC 17025:2017 and AAALAC International accreditation cover the technical and welfare dimensions independently.",
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
    body: "AAALAC accreditation, CPCSEA registration and an explicit 3Rs framework — extended with rehabilitation — are not a compliance overlay. A stressed animal is a poor model, and the welfare programme exists because the science depends on it.",
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
    title: "Ethics compliance",
    body: "Every study is designed and conducted within the ethical framework that governs it, reviewed before work begins rather than defended afterwards.",
  },
  {
    title: "Animal welfare",
    body: "AAALAC accreditation and CPCSEA registration govern the care and use programme, with in-house veterinarians and pathologists on staff.",
  },
  {
    title: "Employee safety",
    body: "Handling protocols, containment and monitoring protect the people who work with hazardous test items, radioactive material and biological agents.",
  },
  {
    title: "Data security",
    body: "Redundancy and resilience with multiple backups stored on RAID servers, both on-site and off-site, with archival capacity extending ten years.",
  },
  {
    title: "Timely completion",
    body: "Schedule is treated as a quality attribute. A study delivered late has failed the sponsor as surely as one delivered wrong.",
  },
];

export const qualitySystems = [
  {
    title: "Test item management",
    subtitle: "TSC / TICO",
    body: "Separate storage zones are maintained for pharmaceutical and non-pharmaceutical products. Sponsors receive receipt confirmation within 48 hours, with stability guidance issued alongside.",
  },
  {
    title: "Data management",
    subtitle: "Redundancy & resilience",
    body: "Multiple backups are stored on RAID servers held both on-site and off-site, with archival capacity extending ten years for raw data, specimens and reports.",
  },
  {
    title: "Quality assurance",
    subtitle: "Independent audit",
    body: "The facility maintains GLP standards, AAALAC accreditation and other relevant certifications, ensuring the resulting data is accepted by regulators globally.",
  },
];

export const threeRs = [
  {
    letter: "R",
    word: "Replacement",
    body: "In vitro and in silico methods substituted for animal work wherever the endpoint permits — including SAR, QSAR and cell-based assays that answer the question earlier and at lower cost.",
  },
  {
    letter: "R",
    word: "Refinement",
    body: "Improved procedures that minimise harm and distress, from housing and enrichment through to analgesia, handling and humane endpoints.",
  },
  {
    letter: "R",
    word: "Reduction",
    body: "Animal numbers optimised against statistical validity, so that no study uses more animals than the question requires — or fewer than it can answer with.",
  },
  {
    letter: "R",
    word: "Rehabilitation",
    body: "Post-study rehabilitation protocols as mandated by CPCSEA, extending our obligation beyond the point at which the data has been collected.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Leadership                                                                */
/* -------------------------------------------------------------------------- */

export type Leader = {
  name: string;
  role: string;
  bio: string;
};

export const leadership: Leader[] = [
  {
    name: "Dr. C. Tamilselvan",
    role: "Founder · Test Facility Management & Managing Director",
    bio: "The laboratory was founded by Dr. C. Tamilselvan, a visionary leader with decades of experience in the research industry. As Test Facility Management he holds ultimate responsibility under the GLP principles for the resourcing, personnel and quality system that every study depends on.",
  },
];

/** Milestones stated without dates, because the source material carries none. */
export const milestones = [
  {
    title: "India's first nano-fertiliser registration",
    body: "Taken from first study through to approval, with no domestic precedent to follow.",
  },
  {
    title: "India's largest ecotoxicology department",
    body: "Twenty-six species spanning aquatic, terrestrial, avian and pollinator models.",
  },
  {
    title: "Reports accepted by the FDA and EMA",
    body: "Genotoxicity and safety data submitted to and accepted by agencies on three continents.",
  },
  {
    title: "AERB Type 2 radioisotope certification",
    body: "Cleared for radiolabelled work across soil, water, biological and animal matrices.",
  },
];
