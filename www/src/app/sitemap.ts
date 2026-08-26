import type { MetadataRoute } from "next";
import { BLOG, TRAJECT_PAGINAS } from "@/lib/content";
import { GEMEENTEN } from "@/lib/funnel";

const BASE = "https://www.ment4l.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  // Funnelpagina's krijgen de hoogste prioriteit: dit zijn de landingspagina's.
  const funnel = [
    { p: "/aanmelden", prio: 1 },
    { p: "/spoed", prio: 1 },
    { p: "/jeugdhulp-west-brabant-west", prio: 1 },
    { p: "/wachttijden", prio: 0.9 },
    { p: "/verwijzers", prio: 0.9 },
    { p: "/verwijzing-huisarts", prio: 0.8 },
    { p: "/jongeren", prio: 0.7 },
  ];
  const statisch = [
    { p: "", prio: 1 },
    { p: "/contact", prio: 0.8 },
    { p: "/over-ons", prio: 0.7 },
    { p: "/blog", prio: 0.7 },
  ];

  return [
    ...[...statisch, ...funnel].map(({ p, prio }) => ({
      url: `${BASE}${p || "/"}`,
      changeFrequency: "monthly" as const,
      priority: prio,
    })),
    ...GEMEENTEN.map((g) => ({
      url: `${BASE}/jeugdhulp/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...TRAJECT_PAGINAS.map((t) => ({
      url: `${BASE}/trajecten/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...BLOG.map((a) => ({
      url: `${BASE}/blog/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
