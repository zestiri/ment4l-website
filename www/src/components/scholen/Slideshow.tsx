"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

export type Slide = { src: string; alt: string; caption?: string };

/**
 * Moderne auto-loop diashow: cinematische crossfade + subtiele inzoom,
 * een doorlopende timer-lijn onderaan (zonder cijfers) en strakke pill-navigatie.
 * Respecteert reduced-motion.
 */
export function Slideshow({
  slides,
  interval = 5000,
  className = "",
  rounded = "rounded-3xl",
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  rounded?: string;
  sizes?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const t = setTimeout(() => setI((p) => (p + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [i, reduce, interval, slides.length]);

  return (
    <div className={`group relative overflow-hidden ${rounded} ${className}`}>
      {slides.map((s, idx) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          priority={idx === 0}
          sizes={sizes}
          className={`object-cover transition-all duration-[1300ms] ease-out ${
            idx === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
          }`}
        />
      ))}

      {/* leesbaarheidsverloop onder */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {/* label + navigatie */}
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        {slides[i]?.caption && (
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/95 drop-shadow-sm">
            {slides[i].caption}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Toon foto ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? "w-7 bg-white" : "w-1.5 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* doorlopende timer-lijn (zonder cijfers) — houdt de aandacht vast */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
        <div
          key={i}
          className="h-full origin-left bg-white/90"
          style={!reduce ? { animation: `progress ${interval}ms linear forwards` } : { transform: "scaleX(1)" }}
        />
      </div>
    </div>
  );
}
