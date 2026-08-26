export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center font-display font-extrabold leading-none tracking-tight ${className}`}
      aria-label="MENT4L"
    >
      MENT<span className="text-brand">4</span>L
    </span>
  );
}
