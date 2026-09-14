import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://alphamarkai.vercel.app";
const siteName = "AlphaMarkAI";
const siteDescription =
  "AlphaMarkAI provides independent reviews, comparisons, and practical guidance for AI tools and SaaS products.";

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      alternateName: ["Alpha Mark AI", "alphamarkai.vercel.app"],
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      alternateName: "Alpha Mark AI",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/icon.svg`,
      description:
        "An independent publication researching, reviewing, and comparing AI tools and SaaS products.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  manifest: "/manifest.webmanifest",
  title: {
    default: "AlphaMarkAI: Independent AI Tools & SaaS Reviews",
    template: "%s | AlphaMarkAI",
  },
  description: siteDescription,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    locale: "en_US",
    title: "AlphaMarkAI: Independent AI Tools & SaaS Reviews",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "AlphaMarkAI: Independent AI Tools & SaaS Reviews",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ??
      "8J3ZxRbUNgGhBOzggfVU0y22Q6kQta9mybY4ipET6_Q",
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
