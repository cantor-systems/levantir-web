"use client";

import React, { Suspense } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buildAdvisoryUrl } from "@/lib/leads/navigation";
import { trackMetaContactFromHref } from "@/lib/analytics/meta-capi";

type AdvisoryLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

function AdvisoryLinkInner({ href, children, onClick, ...props }: AdvisoryLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const finalHref = typeof href === "string" ? buildAdvisoryUrl(href, pathname || "/", searchParams || "") : href;
  const hrefStr = typeof finalHref === "string" ? finalHref : "";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hrefStr) {
      trackMetaContactFromHref(hrefStr, pathname || "/");
    }
    onClick?.(e);
  };

  return (
    <Link href={finalHref} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export function AdvisoryLink({ href, children, onClick, ...props }: AdvisoryLinkProps) {
  const hrefStr = typeof href === "string" ? href : "";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hrefStr) {
      trackMetaContactFromHref(hrefStr);
    }
    onClick?.(e);
  };

  if (hrefStr.includes("advisory=true")) {
    return (
      <Suspense fallback={<Link href={href} onClick={handleClick} {...props}>{children}</Link>}>
        <AdvisoryLinkInner href={href} onClick={onClick} {...props}>
          {children}
        </AdvisoryLinkInner>
      </Suspense>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
