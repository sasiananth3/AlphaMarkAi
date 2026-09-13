import type { MetadataRoute } from "next";

const siteUrl = "https://alphamarkai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-09-13"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date("2026-09-13"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/reviews/quso-ai`,
      lastModified: new Date("2026-09-13"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
