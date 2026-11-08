// Live chopbaze.com redirects to www, so www is the canonical host. Override per environment (e.g. staging).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.chopbaze.com";

// Indexable routes, shared by the sitemap
export const ROUTES = [
  "/",
  "/about",
  "/food-for-gatherings",
  "/vendor",
  "/contact",
  "/launch",
  "/privacy",
  "/terms",
  "/refund",
] as const;
