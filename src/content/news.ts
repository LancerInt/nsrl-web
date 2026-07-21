/**
 * Newsroom.
 *
 * `articles` holds only entries whose body text exists in the source material,
 * reproduced as published. Entries whose body could not be retrieved live in
 * `archiveRecords`: they are listed with their real title and date but carry no
 * page and no prose, because writing a body for them would mean publishing
 * invented copy under a real byline and date.
 *
 * TODO(nsrl): supply the body for each archive record and promote it into
 * `articles`, or delete the record.
 */

export type Article = {
  slug: string;
  title: string;
  category: "Pharmacology" | "News" | "Events";
  date: string;
  dateDisplay: string;
  author: string;
  excerpt: string;
  readingMinutes: number;
  body: string[];
  takeaways?: string[];
};

export const articles: Article[] = [
  {
    slug: "optimizing-quality-in-the-clinical-laboratory",
    title:
      "Optimizing quality in the clinical laboratory: focus on preclinical drug discovery",
    category: "Pharmacology",
    date: "2023-09-26",
    dateDisplay: "26 September 2023",
    author: "NSRL",
    excerpt:
      "Preclinical drug discovery is the phase that decides which compounds are worth a clinical trial. The accuracy of the data behind that decision is not a quality-department concern — it is the whole argument.",
    readingMinutes: 4,
    body: [
      "In the field of preclinical drug discovery, the importance of optimizing quality in the clinical laboratory cannot be overstated.",
      "Preclinical drug discovery is a pivotal phase that precedes clinical trials. It involves comprehensive research to evaluate the safety, efficacy, and pharmacokinetic properties of potential drug candidates.",
      "The accuracy and reliability of preclinical data are vital to make informed decisions about which compounds to progress to the clinical testing phase.",
      "Our laboratory brings together a team of highly skilled and experienced scientists who are experts in various disciplines, including pharmacology, toxicology, genetics, and more. The laboratories are equipped with state-of-the-art infrastructure and cutting-edge technologies.",
      "Preclinical drug discovery services encompass a wide range of offerings to address diverse research needs — from target validation and high-throughput screening through in vivo efficacy studies, ADME-Tox assessments and safety evaluations.",
      "As an AAALAC certified facility, the laboratory upholds the highest standards of animal welfare in its preclinical research studies, and maintains GLP compliance and ethical animal treatment standards throughout.",
    ],
    takeaways: [
      "Target validation and high-throughput screening",
      "In vivo efficacy studies",
      "ADME-Tox assessments",
      "Safety evaluations under GLP",
      "AAALAC-certified animal welfare standards",
    ],
  },
];

/** An entry that exists in the archive but has no published body text. */
export type ArchiveRecord = {
  title: string;
  category: Article["category"];
  date: string;
  dateDisplay: string;
  author: string;
};

export const archiveRecords: ArchiveRecord[] = [
  {
    title: "What's new this year?",
    category: "News",
    date: "2023-05-08",
    dateDisplay: "8 May 2023",
    author: "NSRL",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export const newsroomNote = {
  title: "Events",
  body: "Conference appearances, capability announcements and laboratory updates are posted to LinkedIn as they happen.",
  cta: "Follow for live updates",
};
