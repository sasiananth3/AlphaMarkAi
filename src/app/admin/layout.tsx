import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "AlphaMarkAI website administration.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
