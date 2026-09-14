"use client";

import type { ReactNode } from "react";

type AffiliateLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  placement: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string>>;
  }
}

export default function AffiliateLink({
  href,
  className,
  children,
  placement,
}: AffiliateLinkProps) {
  function trackClick() {
    window.dataLayer?.push({
      event: "affiliate_click",
      affiliate: "quso_ai",
      placement,
    });

    void fetch("/api/analytics/affiliate-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliate: "quso_ai", placement }),
      keepalive: true,
    });
  }

  return (
    <a
      className={className}
      href={href}
      onClick={trackClick}
      rel="sponsored nofollow noopener"
      target="_blank"
    >
      {children}
    </a>
  );
}
