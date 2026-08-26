/**
 * Progressive blur onderaan de viewport, zoals op de live site.
 * Acht gestapelde lagen met een oplopende blur en een verschoven masker,
 * zodat de vervaging geleidelijk sterker wordt richting de onderrand.
 * Alleen op desktop; de live site toont dit ook niet op mobiel.
 */
const LAGEN: { blur: number; mask: string }[] = [
  { blur: 0.09375, mask: "rgba(0,0,0,0) 0%, #000 12.5%, #000 25%, rgba(0,0,0,0) 37.5%" },
  { blur: 0.1875, mask: "rgba(0,0,0,0) 12.5%, #000 25%, #000 37.5%, rgba(0,0,0,0) 50%" },
  { blur: 0.375, mask: "rgba(0,0,0,0) 25%, #000 37.5%, #000 50%, rgba(0,0,0,0) 62.5%" },
  { blur: 0.75, mask: "rgba(0,0,0,0) 37.5%, #000 50%, #000 62.5%, rgba(0,0,0,0) 75%" },
  { blur: 1.5, mask: "rgba(0,0,0,0) 50%, #000 62.5%, #000 75%, rgba(0,0,0,0) 87.5%" },
  { blur: 3, mask: "rgba(0,0,0,0) 62.5%, #000 75%, #000 87.5%, rgba(0,0,0,0) 100%" },
  { blur: 6, mask: "rgba(0,0,0,0) 75%, #000 87.5%, #000 100%" },
  { blur: 12, mask: "rgba(0,0,0,0) 87.5%, #000 100%" },
];

export function BottomBlur() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[9] hidden h-40 md:block"
    >
      {LAGEN.map((laag, i) => (
        <div
          key={laag.blur}
          className="absolute inset-0"
          style={{
            zIndex: i + 1,
            backdropFilter: `blur(${laag.blur}px)`,
            WebkitBackdropFilter: `blur(${laag.blur}px)`,
            maskImage: `linear-gradient(to bottom, ${laag.mask})`,
            WebkitMaskImage: `linear-gradient(to bottom, ${laag.mask})`,
          }}
        />
      ))}
    </div>
  );
}
