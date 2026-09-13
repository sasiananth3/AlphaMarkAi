import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alphamarkai.vercel.app"),
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
  other: { "impact-site-verification": "1a8ef998-69e9-4a63-ac60-dd4508c5ac33" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
