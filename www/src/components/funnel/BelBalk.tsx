"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/site";

/**
 * Sticky belbalk onderaan het scherm, voor pagina's waar bellen de gewenste
 * actie is (spoed/crisis). Verschijnt zodra de bezoeker voorbij de hero scrollt,
 * zodat hij de eerste boodschap niet afdekt.
 */
export function BelBalk({ label = "Direct hulp nodig?" }: { label?: string }) {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    const onScroll = () => setZichtbaar(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-charcoal/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        zichtbaar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3">
        <span className="text-sm text-white/80">{label}</span>
        <a
          href={CONTACT.phoneHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-brand px-5 py-2.5 text-sm font-semibold text-canvas"
        >
          <Phone className="h-4 w-4" strokeWidth={2} />
          Bel nu
        </a>
      </div>
    </div>
  );
}
