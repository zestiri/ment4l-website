const items = [
  "Zelfvertrouwen",
  "Faalangst overwinnen",
  "Trots",
  "Finalemoment",
  "Talent",
  "Doorzetten",
  "Plezier",
  "Gelijke kansen",
];

function Group() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-serif text-2xl text-ink sm:text-3xl">{t}</span>
          <span className="text-coral">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-hairline bg-mist py-6">
      <div className="flex w-max animate-marquee will-change-transform">
        <Group />
        <Group />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-mist to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-mist to-transparent sm:w-32" />
    </div>
  );
}
