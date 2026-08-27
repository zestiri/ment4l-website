"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";

/**
 * Sticky balk onderaan het scherm, voor pagina's waar contact de gewenste actie is.
 *
 * Twee modi:
 *
 *  - Zonder `volgSelector` (spoed): verschijnt zodra de bezoeker voorbij de hero
 *    scrollt, alleen op mobiel. Dat is het oorspronkelijke gedrag.
 *  - Met `volgSelector` (de advertentiepagina): verschijnt zodra het gevolgde
 *    element uit beeld is, op elke breedte. Volg de VERZENDKNOP en niet de
 *    formuliercontainer: bij een lang formulier is de container nog in beeld
 *    terwijl de knop er allang uit is, en dan staat er een scherm lang geen actie.
 */
export function BelBalk({
  label = "Direct hulp nodig?",
  volgSelector,
  terugNaar,
}: {
  label?: string;
  /** CSS-selector van het element dat in beeld moet zijn; is het weg, dan verschijnt de balk. */
  volgSelector?: string;
  /** Anker waar de tweede knop heen scrollt. Zonder dit is er maar een knop. */
  terugNaar?: string;
}) {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    const doel = volgSelector ? document.querySelector(volgSelector) : null;

    if (doel) {
      const obs = new IntersectionObserver(
        ([entry]) => setZichtbaar(!entry.isIntersecting),
        { threshold: 1 },
      );
      obs.observe(doel);
      return () => obs.disconnect();
    }

    // Geen selector, of het element bestaat niet: terugvallen op de scrollpositie.
    // Liever een balk die iets te vroeg komt dan een pagina zonder actie.
    const onScroll = () => setZichtbaar(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [volgSelector]);

  const breedte = volgSelector ? "" : "md:hidden";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-charcoal/95 backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none ${breedte} ${
        zichtbaar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3">
        <span className="text-sm text-white/80">{label}</span>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-brand px-5 text-sm font-semibold text-canvas"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            Bel nu
          </a>
          {terugNaar && (
            <a
              href={terugNaar}
              className="hidden min-h-11 items-center rounded-pill border border-white/25 px-5 text-sm font-semibold text-white sm:inline-flex"
            >
              Bel mij terug
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
