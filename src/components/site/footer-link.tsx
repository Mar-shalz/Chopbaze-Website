"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// Pages that render the general <Faq /> section (id="faq"); /vendor renders the Vendor FAQs instead
const FAQ_PAGES = new Set(["/", "/about", "/food-for-gatherings", "/contact", "/privacy", "/terms", "/refund"]);

// A "/page#hash" link becomes an in-page "#hash" jump when that section is on the current page.
export function FooterLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const [path, hash] = href.split("#");
  const local = hash !== undefined && (path === pathname || (hash === "faq" && path === "/" && FAQ_PAGES.has(pathname)));
  return <Link href={local ? `#${hash}` : href} {...props} />;
}
