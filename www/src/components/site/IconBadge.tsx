import type { LucideIcon } from "lucide-react";

/**
 * Het enige toegestane icoonvlak op de site. Uit het merkbord:
 * altijd een ronde vorm, altijd een getinte vulling van de merkkleur, nooit een
 * gevuld of meerkleurig icoon. Zo blijven de iconen op elke pagina hetzelfde
 * gebaar in plaats van per pagina een eigen maat en radius.
 *
 * `tone` is semantisch, geen smaak: `brand` is de standaard, `coral` markeert
 * uitsluitend spoed en crisis. Gebruik coral dus niet om iets "op te laten vallen".
 */

type Size = "sm" | "md" | "lg";
type Tone = "brand" | "coral" | "onDark";

const VLAK: Record<Size, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

const ICOON: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const TINT: Record<Tone, string> = {
  brand: "bg-brand/12 text-brand",
  coral: "bg-coral/15 text-coral",
  onDark: "bg-white/12 text-white",
};

export function IconBadge({
  icon: Icon,
  size = "md",
  tone = "brand",
  className = "",
}: {
  icon: LucideIcon;
  size?: Size;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full ${VLAK[size]} ${TINT[tone]} ${className}`}
    >
      {/* strokeWidth 1.9 is de merkstand: dun genoeg om rustig te blijven, dik genoeg om op 16px te lezen */}
      <Icon className={ICOON[size]} strokeWidth={1.9} />
    </span>
  );
}

/**
 * Het kleine vinkje in opsommingen. Zelfde familie als IconBadge, maar op
 * tekstgrootte zodat het naast een regel staat in plaats van erboven te zweven.
 */
export function CheckBullet({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/12 text-brand ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
        <path
          d="m5 13 4 4L19 7"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
