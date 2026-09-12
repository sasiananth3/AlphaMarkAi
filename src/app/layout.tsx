import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alphamarkai — Independent AI & SaaS Reviews",
  description: "Independent reviews, intelligent comparisons, and curated insight on the software shaping modern work.",
  other: { "impact-site-verification": "1a8ef998-69e9-4a63-ac60-dd4508c5ac33" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
