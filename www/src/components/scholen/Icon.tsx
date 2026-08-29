import type { ReactNode } from "react";

/**
 * Monoline iconenset — alles in één stijl, kleur via currentColor.
 * Gebruik: <Icon name="compass" className="h-6 w-6 text-brand" />
 * Zo blijven icons altijd on-brand (geen bonte emoji-mix meer).
 */
export type IconName =
  | "compass"
  | "steps"
  | "mic"
  | "sparkles"
  | "medal"
  | "scale"
  | "palette"
  | "sprout"
  | "chefhat"
  | "waveform"
  | "chip"
  | "target"
  | "flag"
  | "camera"
  | "bubble"
  | "loop"
  | "bolt"
  | "arrow"
  | "shield"
  | "heart";

const paths: Record<IconName, ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.6 8.4l-2.2 5-5 2.2 2.2-5z" />
    </>
  ),
  steps: <path d="M3 20h4v-4h4v-4h4v-4h4" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4" />
      <path d="M8.5 21h7" />
    </>
  ),
  sparkles: (
    <>
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="15" r="6" />
      <path d="M8.5 9.6 6 3.5M15.5 9.6 18 3.5" />
      <path d="M12 13.2l.9 1.9 2 .2-1.5 1.4.4 2-1.8-1-1.8 1 .4-2L9.1 15.3l2-.2z" fill="currentColor" stroke="none" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7l-2.6 6a3 3 0 0 0 6 0z" />
      <path d="M19 7l-2.6 6a3 3 0 0 0 6 0z" />
      <path d="M8 21h8" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.4 1-2 2-2h2a3 3 0 0 0 3-3c0-5-4-9-9-9z" />
      <circle cx="7.7" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="7.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.3" cy="11.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-7" />
      <path d="M12 14c0-3 2-5 5.5-5 0 3-2 5-5.5 5z" />
      <path d="M12 14c0-2.6-1.8-4.6-4.8-4.6 0 2.6 1.8 4.6 4.8 4.6z" />
    </>
  ),
  chefhat: (
    <>
      <path d="M7 14h10v5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
      <path d="M7.5 14a4 4 0 0 1-1-7.8A4 4 0 0 1 12 4a4 4 0 0 1 5.5 2.2A4 4 0 0 1 16.5 14" />
      <path d="M9.5 17h5" />
    </>
  ),
  waveform: <path d="M4 10v4M8 7.5v9M12 5v14M16 8.5v7M20 11v2" />,
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 4h11l-2.2 3.2L17 10.5H6" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8.5a2 2 0 0 1 2-2h1.6L8 4.5h8l1.4 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.4" />
    </>
  ),
  bubble: (
    <>
      <path d="M5 6.5a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H10l-4 3.5V15H7.5A2.5 2.5 0 0 1 5 12.5z" />
      <path d="M9 9.5h6M9 12h3.5" />
    </>
  ),
  loop: (
    <>
      <path d="M4 9a8 8 0 0 1 14-3" />
      <path d="M20 15a8 8 0 0 1-14 3" />
      <path d="M18 3v3.5h-3.5M6 21v-3.5h3.5" />
    </>
  ),
  bolt: (
    <path
      d="M13 2 4.6 13.2a.6.6 0 0 0 .5 1H10l-1 7.2a.4.4 0 0 0 .73.27L19.4 10.8a.6.6 0 0 0-.5-1H14l1-7.4a.4.4 0 0 0-.73-.27z"
      fill="currentColor"
      stroke="none"
    />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  heart: (
    <path
      d="M12 21s-6.7-4.3-9.3-8.4C1 9.6 2.4 6 5.8 6c1.9 0 3.3 1.1 4.2 2.4C10.9 7.1 12.3 6 14.2 6c3.4 0 4.8 3.6 3.1 6.6C18.7 16.7 12 21 12 21z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

export function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
