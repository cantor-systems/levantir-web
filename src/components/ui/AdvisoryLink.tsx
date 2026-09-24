"use client";

import React, { Suspense } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buildAdvisoryUrl } from "@/lib/leads/navigation";

type AdvisoryLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

function AdvisoryLinkInner({ href, children, ...props }: AdvisoryLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const finalHref = typeof href === "string" ? buildAdvisoryUrl(href, pathname || "/", searchParams || "") : href;
  
  return (
    <Link href={finalHref} {...props}>
      {children}
    </Link>
  );
}

export function AdvisoryLink({ href, children, ...props }: AdvisoryLinkProps) {
  const hrefStr = typeof href === "string" ? href : "";
  
  if (hrefStr.includes("advisory=true")) {
    return (
      <Suspense fallback={<Link href={href} {...props}>{children}</Link>}>
        <AdvisoryLinkInner href={href} {...props}>
          {children}
        </AdvisoryLinkInner>
      </Suspense>
    );
  }
  
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
