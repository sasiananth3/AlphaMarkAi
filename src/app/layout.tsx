import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://alphamarkai.vercel.app";

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "AlphaMarkAI",
      alternateName: ["Alpha Mark AI", "alphamarkai.vercel.app"],
      description:
        "Independent reviews and practical comparisons of AI tools and SaaS products.",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AlphaMarkAI",
      alternateName: "Alpha Mark AI",
      url: `${siteUrl}/`,
      description:
        "An independent publication researching, reviewing, and comparing AI tools and SaaS products.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "AlphaMarkAI",
  title: {
    default: "AlphaMarkAI — Independent AI & SaaS Reviews",
    template: "%s | AlphaMarkAI",
  },
  description: "Independent reviews, intelligent comparisons, and curated insight on the software shaping modern work.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AlphaMarkAI",
    title: "AlphaMarkAI — Independent AI & SaaS Reviews",
    description: "Independent reviews and practical comparisons of AI tools and SaaS products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaMarkAI — Independent AI & SaaS Reviews",
    description: "Independent reviews and practical comparisons of AI tools and SaaS products.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: { "impact-site-verification": "1a8ef998-69e9-4a63-ac60-dd4508c5ac33" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
