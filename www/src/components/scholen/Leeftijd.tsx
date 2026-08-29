/** Compacte leeftijds-tag, bv. "9-18 jr" of "9-18 jaar". */
export function Leeftijd({
  leeftijd,
  className = "",
}: {
  leeftijd: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-sand px-2 py-0.5 font-mono text-[11px] font-semibold leading-none text-ink ${className}`}
    >
      {leeftijd}
    </span>
  );
}
