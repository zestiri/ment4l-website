import type { MetadataRoute } from "next";
import { BLOG, TRAJECT_PAGINAS } from "@/lib/content";

const BASE = "https://www.ment4l.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const statisch = ["", "/contact", "/over-ons", "/blog"];
  return [
    ...statisch.map((p) => ({ url: `${BASE}${p || "/"}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...BLOG.map((a) => ({ url: `${BASE}/blog/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...TRAJECT_PAGINAS.map((t) => ({ url: `${BASE}/trajecten/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
