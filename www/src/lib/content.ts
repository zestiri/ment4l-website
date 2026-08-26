// Content geëxtraheerd van de live site (zie www/scripts/build_content.mjs).
import blogData from "@/content/blog.json";
import trajectData from "@/content/trajecten.json";

export type BlogSectie = { level: string; kop: string; alineas: string[] };
export type BlogArtikel = {
  slug: string;
  categorie: string;
  titel: string;
  pageTitle: string;
  description: string | null;
  intro: string[];
  secties: BlogSectie[];
};

export type WerkwijzeStap = { titel: string; tekst: string };
export type TrajectPagina = {
  slug: string;
  eyebrow: string | null;
  titel: string;
  tagline: string;
  subkop: string | null;
  pageTitle: string;
  description: string | null;
  samenvatting: string[];
  voordelen: string[];
  werkwijze: WerkwijzeStap[];
};

export const BLOG: BlogArtikel[] = blogData as BlogArtikel[];
export const TRAJECT_PAGINAS: TrajectPagina[] = trajectData as TrajectPagina[];

export const getArtikel = (slug: string) => BLOG.find((a) => a.slug === slug);
export const getTrajectPagina = (slug: string) => TRAJECT_PAGINAS.find((t) => t.slug === slug);

/** Hero-beeld per blogartikel (gedownload van de live site). */
export const blogHero = (slug: string) => `/images/blog/${slug}.png`;

/** Hero-beeld per traject (zelfde beeld als de homepage-kaart). */
const TRAJECT_IMAGES: Record<string, string> = {
  "re-integratie-begeleiding-jeugd-gedetineerden": "/images/traject-re-integratie.png",
  "ambulante-spoedhulp": "/images/traject-ambulante-spoedhulp.png",
  "jeugdcoaching-op-scholen": "/images/traject-jeugdcoaching-op-scholen.png",
  "alleenstaande-minderjarige-vreemdelingen": "/images/traject-amv.png",
  "workshops-jeugd-digitale-wereld": "/images/traject-workshops.png",
};
export const trajectHero = (slug: string) => TRAJECT_IMAGES[slug] ?? "/images/traject-amv.png";
