import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";

import "./globals.css";

import { site } from "@/content/site";
import { JsonLd, organisationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ClosingCta } from "@/components/layout/ClosingCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/system/MotionProvider";
import { ScrollManager } from "@/components/system/ScrollManager";

/* Three families, three jobs: the serif document voice for headlines, the sans
   working voice for body and UI, the monospace instrument voice for data. */
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Complete Preclinical Research, Start to Finish`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  keywords: [
    "contract research organisation",
    "preclinical CRO India",
    "GLP laboratory",
    "OECD GLP",
    "toxicology testing",
    "ecotoxicology",
    "entomology testing",
    "agrochemical registration",
    "REACH compliance testing",
    "food and feed additive testing",
    "NABL ISO/IEC 17025",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: false, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Complete Preclinical Research, Start to Finish`,
    description: site.shortDescription,
    locale: site.locale,
    // No `images` here: Next only uses app/opengraph-image.tsx when the
    // metadata object leaves openGraph.images unset.
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Complete Preclinical Research, Start to Finish`,
    description: site.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  /*
    No `icons` key on purpose. The icons are file-convention assets —
    `app/favicon.ico` (16/32/48), `app/icon.png` and `app/apple-icon.png` —
    which Next links with the correct `sizes` and `type` derived from the
    files themselves. Declaring `metadata.icons` here would override all
    three, which is how the tab ended up showing the full lockup: the
    wordmark version was pointed at by hand, and "NSRL" under a flask is
    illegible at 16px. All three are generated from `assets/logo-favicon.png`
    — the orbital mark alone, no wordmark.
  */
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#050b16" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${newsreader.variable} ${inter.variable} ${plexMono.variable}`}
      // The inline <head> script below adds `js` to this element before React
      // hydrates, so the server- and client-rendered className legitimately
      // differ by design. React 19 compares the attribute and would report a
      // hydration mismatch on every page without this.
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as script-capable before the first paint.

          Everything that hides itself to animate in — [data-reveal] and the
          page transition — is gated on `html.js`, so the server ships the page
          fully visible and a failed or blocked bundle still renders it. Setting
          the class from an effect instead would paint the content once and then
          hide it, producing a visible flash of the whole page on every load.
          This must stay a blocking inline script in <head> for that reason.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="antialiased">
        <JsonLd data={organisationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        {/* Wraps everything that can animate, including app/template.tsx, so
            `prefers-reduced-motion` reaches Framer's JS-driven inline styles. */}
        <MotionProvider>
          <ScrollManager>
            <SiteHeader />
            <main id="main">{children}</main>
            <ClosingCta />
            <SiteFooter />
          </ScrollManager>
        </MotionProvider>
      </body>
    </html>
  );
}
