import type { MetadataRoute } from "next";
import { absoluteUrl, boatPaths, SITE_ROUTES, tourPaths } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [...SITE_ROUTES, ...boatPaths, ...tourPaths].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/boat") || path.startsWith("/tours/") ? 0.7 : 0.8,
  }));
}
