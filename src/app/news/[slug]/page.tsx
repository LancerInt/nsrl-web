import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { articles, getArticle } from "@/content/news";
import { site } from "@/content/site";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { ArticleMasthead } from "@/components/news/ArticleMasthead";
import { ArticleReader } from "@/components/news/ArticleReader";
import { NextArticle } from "@/components/news/NextArticle";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Only `articles` — an entry in `archiveRecords` has no body, so there is no
 * page to build for it and a route here would be a 404 with a nice URL.
 */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return pageMetadata({
      title: "Article not found",
      description: "The requested newsroom entry could not be found.",
      path: `/news/${slug}`,
    });
  }

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    keywords: [article.category, "NSRL newsroom", "preclinical research"],
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const index = articles.findIndex((entry) => entry.slug === article.slug);
  const nextIndex = (index + 1) % articles.length;
  const next = nextIndex === index ? null : articles[nextIndex];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    "@id": `${site.url}/news/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    datePublished: article.date,
    inLanguage: "en-IN",
    wordCount: article.body.join(" ").split(/\s+/).length,
    timeRequired: `PT${article.readingMinutes}M`,
    author: { "@type": "Organization", name: article.author, url: site.url },
    publisher: { "@id": `${site.url}/#organisation` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/news/${article.slug}`,
    },
    url: `${site.url}/news/${article.slug}`,
    image: `${site.url}/og/default.png`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <ArticleMasthead article={article} position={index + 1} total={articles.length} />
      <ArticleReader article={article} position={index + 1} />

      <NextArticle article={next} position={nextIndex + 1} />
    </>
  );
}
