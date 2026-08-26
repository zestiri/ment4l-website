"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Cookieloze bezoekersteller van Zestiri. Pingt de Supabase edge function `track`, die de
 * pageview wegschrijft met een dag-hash van IP + user-agent. Geen cookies, geen localStorage,
 * geen persoonsgegevens, dus geen cookiebanner nodig. De cijfers komen terug in app.zestiri.com.
 */
const ENDPOINT = "https://dfmcnrqbhmhreiifarum.supabase.co/functions/v1/track";
// Registreerbaar domein, niet de host: zo blijft de telling gelijk als de canonical host wijzigt
// en matcht hij de `domain` van het product in de portal.
const DOMAIN = "ment4l.nl";

export default function Tracker() {
  const pathname = usePathname();
  const laatste = useRef<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (laatste.current === pathname) return;
    laatste.current = pathname;

    const body = JSON.stringify({ domain: DOMAIN, path: pathname });
    // keepalive zodat de ping ook bij een snelle navigatie of het sluiten van de tab doorgaat.
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Meten mag de site nooit stukmaken.
    });
  }, [pathname]);

  return null;
}
