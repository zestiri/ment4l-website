"use client";

import { useState } from "react";

import { Check } from "lucide-react";
import { IconBadge } from "@/components/site/IconBadge";
type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(
          body?.error === "not_configured"
            ? "Verzenden is nog niet geconfigureerd (RESEND_API_KEY ontbreekt)."
            : body?.error === "validation"
              ? "Controleer je naam, e-mailadres en bericht."
              : "Er ging iets mis. Bel ons gerust op 085 130 7522.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Geen verbinding. Probeer het later opnieuw of bel 085 130 7522.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-hairline bg-cream p-8 text-center">
        <IconBadge icon={Check} className="mx-auto" />
        <h3 className="mt-4 text-xl">Bedankt, we hebben je bericht ontvangen</h3>
        <p className="mt-2 text-ink-soft">
          We streven ernaar binnen 4 uur contact met je op te nemen — ook buiten
          kantooruren. Is het spoed? Bel dan direct 085 130 7522.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-pill border border-hairline px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          Nog een bericht sturen
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-ink outline-none transition-colors placeholder:text-grey-2 focus:border-brand";
  const label = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {/* honeypot — verborgen voor mensen, ingevuld door bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="name" className={label}>Volledige naam</label>
        <input id="name" name="name" required autoComplete="name" placeholder="Voor- en achternaam" className={field} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>E-mail</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="jij@voorbeeld.nl" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Telefoonnummer</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="06 12345678" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Waar wil je dat MENT4L je bij helpt?</label>
        <textarea id="message" name="message" required rows={5} placeholder="Omschrijf je hulpvraag" className={`${field} resize-y`} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas shadow-[0_12px_26px_rgba(31,102,255,0.28)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Versturen…" : "Verzend"}
      </button>

      <p className="text-xs text-grey">
        Door te verzenden ga je akkoord met ons{" "}
        <a href="/privacybeleid.pdf" className="underline hover:text-ink">privacybeleid</a>.
      </p>
    </form>
  );
}
