import type { CSSProperties, ReactNode } from "react";

/**
 * Speelse hand-getekende doodles — slangetje, krabbel, sterretje, onderstreping.
 * Kleur via currentColor; subtiel inzetten als decoratie. Lichtgewicht inline SVG.
 */
export type DoodleName =
  | "squiggle"
  | "snake"
  | "sparkle"
  | "underline"
  | "arc"
  | "dots";

const data: Record<DoodleName, { vb: string; node: ReactNode; stretch?: boolean }> = {
  squiggle: {
    vb: "0 0 84 20",
    node: <path d="M3 11c7-11 13 11 20 0s13-11 20 0 13 11 20 0 13-11 18 0" />,
  },
  snake: {
    vb: "0 0 68 28",
    node: (
      <>
        <path d="M5 19C9 5 25 5 30 14c4 7 20 9 26-2" />
        <circle cx="57" cy="12" r="4.2" fill="currentColor" stroke="none" />
        <path d="M61 12h3.5M62.5 10l3.5 2-3.5 2" />
      </>
    ),
  },
  sparkle: {
    vb: "0 0 24 24",
    node: (
      <path
        d="M12 2l2.3 6.7L21 11l-6.7 2.3L12 20l-2.3-6.7L3 11l6.7-2.3z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  underline: {
    vb: "0 0 200 16",
    stretch: true,
    node: <path d="M5 9c45-7 95-7 140-3s40 5 50 2" />,
  },
  arc: {
    vb: "0 0 50 34",
    node: <path d="M5 28C12 8 36 6 45 18M45 18l-2.5-7M45 18l-7 2.5" />,
  },
  dots: {
    vb: "0 0 30 10",
    node: (
      <>
        <circle cx="4" cy="5" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="5" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="26" cy="5" r="2.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
};

export function Doodle({
  name,
  className = "",
  strokeWidth = 2.4,
  style,
}: {
  name: DoodleName;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}) {
  const d = data[name];
  return (
    <svg
      viewBox={d.vb}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio={d.stretch ? "none" : "xMidYMid meet"}
      className={className}
      style={style}
      aria-hidden="true"
    >
      {d.node}
    </svg>
  );
}
