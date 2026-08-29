import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

/**
 * Foto-slot met gebrande placeholder.
 * Geef `src` (bv. "/images/scholen/hero.jpg") zodra de echte foto in /public/images staat;
 * zonder src toont een nette placeholder met shimmer + een monoline icoon.
 */
export function Photo({
  src,
  alt,
  accent = "#1F66FF",
  icon,
  label = "Foto volgt",
  className = "",
  rounded = "rounded-3xl",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src?: string;
  alt: string;
  accent?: string;
  icon?: ReactNode;
  label?: string;
  className?: string;
  rounded?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(140deg, ${accent}26 0%, #1a1a1a 135%)` }}
          aria-label={alt}
          role="img"
        >
          <div className="texture absolute inset-0 opacity-60" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 -left-1/3 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
          <div className="absolute inset-0 grid place-items-center text-white/85">
            {icon ?? <Icon name="camera" className="h-10 w-10" strokeWidth={1.6} />}
          </div>
          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
