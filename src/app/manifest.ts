import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AlphaMarkAI",
    short_name: "AlphaMarkAI",
    description:
      "Independent reviews, comparisons, and practical guidance for AI tools and SaaS products.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe5",
    theme_color: "#151715",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
