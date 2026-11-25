import { boats } from "@/lib/data";
import { tours } from "@/lib/tours";

export const SITE_NAME = "Saltmere";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saltmere.example";
export const SITE_DESCRIPTION =
  "Six skippered fishing boats from Dubai Marina, Dubai Harbour and Jumeirah Fishing Harbour. Pick a day and see who is free.";

export const SITE_ROUTES = ["/", "/fleet", "/tours", "/about", "/contact", "/privacy", "/imprint"] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export const boatPaths = boats.map((b) => `/boat/${b.slug}`);
export const tourPaths = tours.map((t) => `/tours/${t.slug}`);
