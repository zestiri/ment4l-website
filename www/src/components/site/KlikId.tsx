"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { onthoudKlikId, schrijfKlikIdInUrl } from "@/lib/conversie";

/**
 * Houdt de Google-klik-id vast tijdens het bezoek, zonder iets op het apparaat
 * op te slaan.
 *
 * Het probleem: de advertentieklik landt op /ambulante-begeleiding?gclid=X,
 * maar het formulier staat op /aanmelden. Zonder tussenstap is de id daar weg.
 * De voor de hand liggende oplossing is een cookie, en dat is precies wat we
 * hier niet willen: opslag op het apparaat vraagt toestemming, en een banner
 * kost bij dit volume meer meting dan hij oplevert (zie `lib/conversie.ts`).
 *
 * De oplossing: de id blijft in het geheugen van de draaiende app. De site is
 * één client-side app, dus dat overleeft elke navigatie binnen het bezoek.
 * Daarnaast zetten we hem met `replaceState` terug in de adresbalk, zodat een
 * herlading hem ook niet verliest.
 *
 * Wat NIET werkt, voor wie het opnieuw wil proberen: het href-attribuut van
 * interne links herschrijven bij een klik. De Next-router navigeert op de
 * React-prop en negeert het aangepaste attribuut.
 */
export function KlikId() {
  const pathname = usePathname();

  useEffect(() => {
    // Eerst lezen (op de landingspagina staat hij in de URL), dan terugschrijven
    // op elke volgende pagina waar hij ontbreekt.
    onthoudKlikId();
    schrijfKlikIdInUrl();
  }, [pathname]);

  return null;
}
