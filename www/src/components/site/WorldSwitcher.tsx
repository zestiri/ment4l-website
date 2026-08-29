"use client";

import Link from "next/link";
import { HeartHandshake, GraduationCap } from "lucide-react";

/**
 * Wereld-schakelaar. MENT4L heeft twee onderdelen onder één merk: Jeugdhulp
 * (de hoofdsite) en Scholen (naschoolse talentprogramma's). Deze segmented
 * control staat in BEIDE navs — altijd op dezelfde plek, in dezelfde vorm — en
 * markeert waar je bent. Zo is de oversteek tussen de twee werelden één klik en
 * nooit meer verwarrend: geen losse "Voor scholen"- en "Jeugdhulp"-links meer
 * die overal net iets anders zijn.
 *
 * `tone="dark"` voor de glazen navbalk, `tone="light"` voor het mobiele
 * menu-vlak. `block` maakt hem volle breedte met twee gelijke helften (mobiel).
 */
export function WorldSwitcher({
  active,
  tone = "dark",
  block = false,
  onNavigate,
  className = "",
}: {
  active: "jeugdhulp" | "scholen";
  tone?: "dark" | "light";
  block?: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const track =
    tone === "dark" ? "border-white/10 bg-white/[0.06]" : "border-hairline bg-mist";
  const activeCls =
    tone === "dark" ? "bg-white text-[#1f1f1f] shadow-sm" : "bg-ink text-canvas";
  const idleCls =
    tone === "dark"
      ? "text-white/70 hover:text-white"
      : "text-ink-soft hover:text-ink";

  const items = [
    { key: "jeugdhulp" as const, href: "/", label: "Jeugdhulp", Icon: HeartHandshake },
    { key: "scholen" as const, href: "/scholen", label: "Scholen", Icon: GraduationCap },
  ];

  return (
    <div
      role="tablist"
      aria-label="Kies onderdeel van MENT4L"
      className={`${block ? "flex w-full" : "inline-flex"} items-center rounded-full border p-0.5 ${track} ${className}`}
    >
      {items.map(({ key, href, label, Icon }) => {
        const is = active === key;
        return (
          <Link
            key={key}
            href={href}
            role="tab"
            aria-selected={is}
            aria-current={is ? "page" : undefined}
            onClick={onNavigate}
            className={`relative inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200 ${block ? "flex-1" : ""} ${is ? activeCls : idleCls}`}
          >
            <Icon aria-hidden className="h-4 w-4" strokeWidth={1.9} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
