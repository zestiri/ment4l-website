"use client";

import { useEffect } from "react";
import { leesKlikId, metKlikId } from "@/lib/conversie";

/**
 * Neemt de Google-klik-id mee door de site, zonder iets op het apparaat op te
 * slaan.
 *
 * Het probleem: de advertentieklik landt op /ambulante-begeleiding?gclid=X,
 * maar het formulier staat op /aanmelden. Zonder tussenstap is de id daar weg.
 * De voor de hand liggende oplossing is een cookie, en dat is precies wat we
 * hier niet willen: opslag op het apparaat vraagt toestemming, en een banner
 * kost bij dit volume meer meting dan hij oplevert (zie `lib/conversie.ts`).
 *
 * Dus doen we wat Google's eigen url_passthrough doet: de id in de URL houden.
 * Bij een klik op een interne link plakken we hem aan de bestemming. Geen
 * cookie, geen localStorage, geen toestemming nodig.
 *
 * De listener staat in de capture-fase, dus vóór de router van Next de klik
 * afhandelt. Die leest de href pas daarna en ziet dus de aangepaste versie.
 */
export function KlikId() {
  useEffect(() => {
    function opKlik(e: MouseEvent) {
      // Alleen een gewone linkerklik. Ctrl/cmd-klik, middenklik en
      // rechtsklik laten we met rust: die opent de browser zelf.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const klikId = leesKlikId();
      if (!klikId) return;

      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      // Downloads en alles wat geen http(s) is (tel:, mailto:) overslaan.
      if (link.hasAttribute("download")) return;
      if (link.protocol !== "http:" && link.protocol !== "https:") return;
      if (link.target && link.target !== "_self") return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const nieuw = metKlikId(href, klikId);
      if (nieuw !== href) link.setAttribute("href", nieuw);
    }

    document.addEventListener("click", opKlik, true);
    return () => document.removeEventListener("click", opKlik, true);
  }, []);

  return null;
}
