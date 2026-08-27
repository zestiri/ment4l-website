"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { leesKlikId, meldConversie } from "@/lib/conversie";

import { IconBadge } from "@/components/site/IconBadge";
type Status = "idle" | "sending" | "ok" | "error";
type Rol = "ouder" | "jongere" | "verwijzer";

const ROLLEN: { id: Rol; label: string; emoji: string }[] = [
  { id: "ouder", label: "Voor mijn kind", emoji: "👪" },
  { id: "jongere", label: "Voor mezelf", emoji: "🙋" },
  { id: "verwijzer", label: "Ik verwijs door", emoji: "🩺" },
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
        body: JSON.stringify({ ...data, soort: "Aanmelding jeugdhulp", rol, gclid: leesKlikId() }),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
        // Hier, en nergens anders. Er is geen bedankt-URL waar we op kunnen
        // meten, dus dit punt in de success-handler ís het conversiemoment.
        meldConversie("aanmelding");
      } else {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setFout(
          body?.error === "not_configured"
            ? "Verzenden is nog niet geconfigureerd."
            : body?.error === "validation"
              ? "Vul je naam, telefoonnummer en woonplaats in."
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
      <div className="py-6 text-center">
        <IconBadge icon={Check} size="lg" className="mx-auto" />
        <h2 className="mt-5 text-2xl">Gelukt, we bellen je</h2>
        <p className="mx-auto mt-3 max-w-sm text-ink-soft">
          Binnen 4 uur, ook buiten kantooruren. Spoed?{" "}
          <a href={CONTACT.phoneHref} className="font-semibold text-brand underline">
            Bel {CONTACT.phone}
          </a>
        </p>
      </div>
    );
  }

  const veld =
    "w-full rounded-2xl border border-hairline bg-canvas px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-grey-2 focus:border-brand";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      {/* Rolkeuze — visueel, geen uitleg nodig */}
      <fieldset>
        <legend className="sr-only">Voor wie meld je aan?</legend>
        <div className="grid grid-cols-3 gap-2">
          {ROLLEN.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRol(r.id)}
              aria-pressed={rol === r.id}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-colors ${
                rol === r.id ? "border-brand bg-brand/[0.06]" : "border-hairline hover:border-ink/25"
              }`}
            >
              <span aria-hidden className="text-xl">{r.emoji}</span>
              <span className="text-[13px] font-medium leading-tight text-ink">{r.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <input name="name" required autoComplete="name" placeholder="Je naam" aria-label="Je naam" className={veld} />

      <div className="grid gap-3 sm:grid-cols-2">
        <input name="phone" type="tel" required autoComplete="tel" placeholder="Telefoonnummer" aria-label="Telefoonnummer" className={veld} />
        <input name="woonplaats" required autoComplete="address-level2" placeholder="Woonplaats" aria-label="Woonplaats" className={veld} />
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="Wat speelt er? Een paar zinnen is genoeg."
        aria-label="Wat speelt er?"
        className={`${veld} resize-y`}
      />

      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral">{fout}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 rounded-pill bg-brand px-7 py-4 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Versturen…" : "Bel mij binnen 4 uur"}
      </button>

      <p className="text-center text-xs text-grey">
        Geen BSN of adres nodig ·{" "}
        <a href="/privacybeleid.pdf" className="underline hover:text-ink">privacy</a>
      </p>
    </form>
  );
}
