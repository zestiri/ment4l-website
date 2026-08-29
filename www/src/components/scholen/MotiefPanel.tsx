import type { Motief } from "@/lib/programmas";

/**
 * Signatuur-visual per categorie (hero). Lichtgewicht, on-brand, accent-gekleurd.
 * menu = retro menukaart · veld = speelveld · grid = tech-grid · golf = geluidsgolf
 */
export function MotiefPanel({
  motief,
  accent,
  className = "",
}: {
  motief: Motief;
  accent: string;
  className?: string;
}) {
  const tint = `${accent}14`;

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-hairline ${className}`}
      style={{ background: tint }}
      aria-hidden="true"
    >
      {motief === "menu" && (
        <div className="absolute inset-0 grid place-items-center p-8">
          <div
            className="w-full max-w-xs rounded-2xl border-2 bg-cream px-7 py-8 shadow-[var(--shadow-soft)]"
            style={{ borderColor: accent }}
          >
            <div className="text-center">
              <div
                className="font-mono text-[11px] font-bold uppercase tracking-[0.35em]"
                style={{ color: accent }}
              >
                Menu
              </div>
              <div className="mt-1 font-serif text-2xl font-bold text-ink">Vers gemaakt</div>
              <div className="mx-auto mt-3 h-0.5 w-12 rounded-full" style={{ background: accent }} />
            </div>
            <ul className="mt-6 space-y-3.5">
              {[3, 5, 4].map((w, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="h-2.5 rounded-full bg-ink/15" style={{ width: `${w}rem` }} />
                  <span className="flex-1 border-b border-dotted border-ink/25" />
                  <span className="h-2.5 w-6 rounded-full" style={{ background: `${accent}66` }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {motief === "veld" && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke={accent} strokeWidth="2" opacity="0.85">
            <rect x="22" y="22" width="156" height="156" rx="8" />
            <line x1="100" y1="22" x2="100" y2="178" />
            <circle cx="100" cy="100" r="30" />
            <circle cx="100" cy="100" r="3" fill={accent} stroke="none" />
            <rect x="22" y="68" width="26" height="64" />
            <rect x="152" y="68" width="26" height="64" />
          </g>
        </svg>
      )}

      {motief === "grid" && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g fill={accent}>
            {Array.from({ length: 7 }).map((_, r) =>
              Array.from({ length: 7 }).map((__, c) => (
                <circle key={`${r}-${c}`} cx={28 + c * 24} cy={28 + r * 24} r="2" opacity="0.35" />
              )),
            )}
          </g>
          <g fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round">
            <path d="M52 76 L100 52 L148 100 L100 148 L52 124 Z" opacity="0.9" />
          </g>
          <g fill={accent}>
            <circle cx="52" cy="76" r="5" />
            <circle cx="100" cy="52" r="5" />
            <circle cx="148" cy="100" r="5" />
            <circle cx="100" cy="148" r="5" />
            <circle cx="52" cy="124" r="5" />
          </g>
        </svg>
      )}

      {motief === "golf" && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g stroke={accent} strokeWidth="6" strokeLinecap="round">
            {[24, 44, 64, 84, 104, 124, 144, 164].map((x, i) => {
              const h = [40, 90, 60, 120, 70, 110, 50, 80][i];
              return <line key={x} x1={x} y1={100 - h / 2} x2={x} y2={100 + h / 2} />;
            })}
          </g>
        </svg>
      )}
    </div>
  );
}
