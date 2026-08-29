/**
 * ment4l-logo voor donkere achtergronden (nav + footer).
 * Toont één logobestand: /public/ment4l-logo-white.png
 * Hoogte regel je via `className` (bv. "h-6"); breedte schaalt mee.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ment4l-logo-white.png"
      alt="ment4l"
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
