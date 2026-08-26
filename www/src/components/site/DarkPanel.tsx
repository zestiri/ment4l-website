import type { ReactNode } from "react";

/**
 * Het donkere, ingelegde paneel onderaan elke pagina.
 * Gemeten op de live site: 1376px breed bij een viewport van 1440 (dus 32px
 * marge links/rechts), border-radius 20px, achtergrond rgb(18,18,18).
 * Testimonials en footer zitten er samen in.
 */
export function DarkPanel({ children }: { children: ReactNode }) {
  return (
    <div className="mx-8 mb-8 overflow-hidden rounded-[20px] bg-charcoal">
      {children}
    </div>
  );
}
