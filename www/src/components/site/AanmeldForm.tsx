"use client";

import { useState } from "react";
import { WBW_GEMEENTEN, CONTACT } from "@/lib/site";

type Status = "idle" | "sending" | "ok" | "error";
type Rol = "ouder" | "jongere" | "verwijzer";

const ROLLEN: { id: Rol; label: string; uitleg: string }[] = [
  { id: "ouder", label: "Ik meld mijn kind aan", uitleg: "Ouder of verzorger" },
  { id: "jongere", label: "Ik meld mezelf aan", uitleg: "Vanaf 16 jaar mag dat zelf" },
  { id: "verwijzer", label: "Ik verwijs iemand door", uitleg: "Huisarts, wijkteam, school" },
];

export function AanmeldForm() {
  const [rol, setRol] = useState<Rol>("ouder");
  const [status, setStatus] = useState<Status>("idle");
  const [fout, setFout] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setFout("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, soort: "Aanmelding jeugdhulp", rol }),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setFout(
          body?.error === "not_configured"
            ? "Verzenden is nog niet geconfigureerd."
            : body?.error === "validation"
              ? "Controleer je naam, telefoonnummer en hulpvraag."
              : `Er ging iets mis. Bel ons gerust op ${CONTACT.phone}.`,
        );
      }
    } catch {
      setStatus("error");
      setFout(`Geen verbinding. Bel ons op ${CONTACT.phone}.`);
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-hairline bg-cream p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/12 text-brand">✓</div>
        <h2 className="mt-4 text-xl">Aanmelding ontvangen</h2>
        <p className="mt-2 text-ink-soft">
          We nemen binnen 4 uur contact met je op — ook buiten kantooruren. Is het
          spoed? Bel dan direct{" "}
          <a href={CONTACT.phoneHref} className="font-semibold text-brand underline">
            {CONTACT.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const veld =
    "w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-ink outline-none transition-colors placeholder:text-grey-2 focus:border-brand";
  const label = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <fieldset>
        <legend className={label}>Wie meldt zich aan?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {ROLLEN.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRol(r.id)}
              aria-pressed={rol === r.id}
              className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                rol === r.id ? "border-brand bg-brand/[0.06]" : "border-hairline hover:border-ink/25"
              }`}
            >
              <span className="block text-sm font-semibold text-ink">{r.label}</span>
              <span className="mt-0.5 block text-xs text-grey">{r.uitleg}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            {rol === "verwijzer" ? "Jouw naam" : "Naam"}
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder="Voor- en achternaam" className={veld} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Telefoonnummer</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="06 12345678" className={veld} />
          <p className="mt-1 text-xs text-grey">Zodat we je snel kunnen terugbellen.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            E-mail <span className="font-normal text-grey">(optioneel)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="jij@voorbeeld.nl" className={veld} />
        </div>
        <div>
          <label htmlFor="gemeente" className={label}>Gemeente</label>
          <select id="gemeente" name="gemeente" required defaultValue="" className={veld}>
            <option value="" disabled>Kies je gemeente</option>
            {WBW_GEMEENTEN.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
            <option value="anders">Een andere gemeente</option>
          </select>
          <p className="mt-1 text-xs text-grey">Hiermee zien we meteen of we direct kunnen starten.</p>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Waar gaat het om?</label>
        <textarea id="message" name="message" required rows={4} placeholder="Vertel kort wat er speelt. Een paar zinnen is genoeg." className={`${veld} resize-y`} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral">{fout}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex items-center justify-center rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Versturen…" : "Aanmelding versturen"}
      </button>

      <p className="text-xs text-grey">
        We vragen bewust geen BSN of adres — dat regelen we later pas, samen met jou. Je
        gegevens gaan rechtstreeks naar ons aanmeldteam. Zie ons{" "}
        <a href="/privacybeleid.pdf" className="underline hover:text-ink">privacybeleid</a>.
      </p>
    </form>
  );
}
