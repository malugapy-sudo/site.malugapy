"use client";

import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * TrackedLink — Next.js Link with analytics tracking.
 * Use in server components where you can't add onClick directly.
 */
export function TrackedLink({
  eventName,
  children,
  ...props
}: ComponentProps<typeof Link> & { eventName: string }) {
  return (
    <Link {...props} onClick={() => trackEvent(eventName)}>
      {children}
    </Link>
  );
}

/**
 * TrackedAnchor — Plain <a> tag with analytics tracking.
 * Use for external links (wa.me, mailto:, fast.com, etc.) in server components.
 */
export function TrackedAnchor({
  eventName,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  children: ReactNode;
}) {
  return (
    <a {...props} onClick={() => trackEvent(eventName)}>
      {children}
    </a>
  );
}
