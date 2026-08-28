"use client";

import { useEffect, useRef, useState } from "react";
import { Check, AlertCircle, User, UserRound, Stethoscope, Phone, MapPin, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACT } from "@/lib/site";
import { leesKlikId, meldConversie } from "@/lib/conversie";

import { IconBadge } from "@/components/site/IconBadge";
type Status = "idle" | "sending" | "ok" | "error";
type Rol = "ouder" | "jongere" | "verwijzer";
type Veld = "name" | "phone" | "woonplaats";

const ROLLEN: { id: Rol; label: string; emoji: string }[] = [
  { id: "ouder", label: "Voor mijn kind", emoji: "👪" },
  { id: "jongere", label: "Voor mezelf", emoji: "🙋" },
  { id: "verwijzer", label: "Ik verwijs door", emoji: "🩺" },
];

/** Rolkeuze voor de landingsvariant: iconen met label, geen emoji.
 *  Elk icoon anders, anders draagt het icoon geen betekenis. */
const ROLLEN_LANDING: { id: Rol; label: string; Icon: typeof User }[] = [
  { id: "ouder", label: "Voor mijn kind", Icon: User },
  { id: "jongere", label: "Voor mezelf", Icon: UserRound },
  { id: "verwijzer", label: "Ik verwijs door", Icon: Stethoscope },
];

const LABELS: Record<Veld, string> = {
  name: "Je naam",
  phone: "Telefoonnummer",
  woonplaats: "Woonplaats",
};

const VELD_BASIS =
  "w-full rounded-2xl border bg-canvas py-3.5 text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-grey-2 focus:border-brand focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand)_14%,transparent)]";

/**
 * Een veld met zichtbaar label en een foutmelding eronder.
 * Staat bewust buiten AanmeldForm: een component die tijdens de render wordt
 * aangemaakt, wordt bij elke toetsaanslag opnieuw gemonteerd en dan springt de
 * cursor uit het veld.
 */
function Rij({
  naam,
  type = "text",
  autoComplete,
  helper,
  fout,
  Icon,
  onBlur,
  onHerzie,
}: {
  naam: Veld;
  type?: string;
  autoComplete?: string;
  helper?: string;
  fout?: string;
  Icon: LucideIcon;
  onBlur: (naam: Veld, waarde: string) => void;
  onHerzie: (naam: Veld, waarde: string) => void;
}) {
  return (
    <div>
      <label htmlFor={`veld-${naam}`} className="mb-1.5 block text-sm font-medium text-ink">
        {LABELS[naam]}
      </label>
      <div className="relative">
        <input
          id={`veld-${naam}`}
          name={naam}
          type={type}
          required
          aria-required="true"
          autoComplete={autoComplete}
          aria-invalid={fout ? true : undefined}
          aria-describedby={fout ? `fout-${naam}` : helper ? `helper-${naam}` : undefined}
          onBlur={(e) => onBlur(naam, e.currentTarget.value)}
          onChange={(e) => onHerzie(naam, e.currentTarget.value)}
          className={`peer ${VELD_BASIS} pl-11 pr-4 ${fout ? "border-coral" : "border-field"}`}
        />
        {/* Leidend icoon: helpt scannen welk veld je invult. Staat na de input in
            de DOM zodat peer-focus werkt; visueel links via absolute positie. */}
        <Icon
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-grey transition-colors peer-focus:text-brand"
          strokeWidth={1.9}
        />
      </div>
      {fout ? (
        // Nooit kleur als enige drager: icoon plus tekst. De tekst zelf staat in
        // ink-soft, want coral haalt op canvas geen AA.
        <p id={`fout-${naam}`} className="mt-1.5 flex items-start gap-1.5 text-sm text-ink-soft">
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-coral" strokeWidth={2} />
          {fout}
        </p>
      ) : helper ? (
        <p id={`helper-${naam}`} className="mt-1.5 text-sm text-grey">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

/** Wat er per veld misgaat. In gewone taal, niet "dit veld is verplicht". */
function foutVoor(veld: Veld, waarde: string): string {
  const w = waarde.trim();
  if (!w) {
    if (veld === "name") return "Vul je naam in, dan weten we hoe we je aanspreken.";
    if (veld === "phone") return "Zonder nummer kunnen we je niet terugbellen.";
    return "Vul je woonplaats in, dan weten we welke gemeente meebetaalt.";
  }
  if (veld === "phone" && w.replace(/\D/g, "").length < 9) {
    return "Dit nummer lijkt niet compleet.";
  }
  return "";
}

/**
 * Aanmeldformulier.
 *
 * `variant="landing"` is de versie voor de advertentiepagina: zichtbare labels
 * boven de velden, rol staat vast op ouder (de advertentie beantwoordt die vraag
 * al) met een link om dat te wijzigen, en het vrije tekstveld zit achter een link
 * zodat de eerste indruk drie velden is.
 *
 * NIET AANRAKEN zonder na te denken: `meldConversie("aanmelding")` in de
 * success-handler en `leesKlikId()` in de body. Er is geen bedankt-URL, dus dat
 * punt IS het conversiemoment. Verdwijnt een van beide, dan meet Google Ads
 * vanaf dag een nul aanmeldingen.
 */
export function AanmeldForm({
  variant = "standaard",
  submitId,
}: {
  variant?: "standaard" | "landing";
  submitId?: string;
} = {}) {
  const landing = variant === "landing";
  const [rol, setRol] = useState<Rol>("ouder");
  const [status, setStatus] = useState<Status>("idle");
  const [fout, setFout] = useState("");
  const [veldFouten, setVeldFouten] = useState<Partial<Record<Veld, string>>>({});
  const [toonToelichting, setToonToelichting] = useState(false);
  const [toonRollen, setToonRollen] = useState(false);
  // Het ingevulde nummer bewaren voor de bevestiging: form.reset() wist het,
  // dus we leggen het bij verzenden vast om het te kunnen teruglezen.
  const [gebeldNummer, setGebeldNummer] = useState("");
  const succesRef = useRef<HTMLDivElement>(null);

  // Verplaats de focus naar de bevestiging zodra die verschijnt, zodat een
  // schermlezer hem voorleest en niet in het niets terechtkomt na het verzenden.
  // Meld ook aan de sticky belbalk dat de aanmelding rond is, zodat die verdwijnt.
  useEffect(() => {
    if (status !== "ok") return;
    succesRef.current?.focus();
    try {
      window.dispatchEvent(new CustomEvent("m4l:aangemeld"));
    } catch {
      // Een kapotte listener mag de bevestiging nooit tegenhouden.
    }
  }, [status]);

  // Blur: alleen melden als er iets is ingevuld dat niet klopt. Een leeg veld dat
  // je overslaat om verderop te kijken, is geen fout; die wordt bij verzenden
  // gevangen. Zo straft de pagina de ouder niet voor rondkijken.
  function controleerVeld(veld: Veld, waarde: string) {
    if (!waarde.trim()) return;
    setVeldFouten((v) => ({ ...v, [veld]: foutVoor(veld, waarde) }));
  }

  // Tijdens typen: een melding die er al staat live bijwerken, zodat een
  // gecorrigeerd veld meteen groen wordt in plaats van pas bij de volgende blur.
  function herzieVeld(veld: Veld, waarde: string) {
    setVeldFouten((v) => (v[veld] ? { ...v, [veld]: foutVoor(veld, waarde) } : v));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Alles in een keer nalopen, zodat de bezoeker niet veld voor veld ontdekt
    // dat er nog iets mist.
    const nieuw: Partial<Record<Veld, string>> = {};
    for (const veld of ["name", "phone", "woonplaats"] as Veld[]) {
      const f = foutVoor(veld, String(data[veld] ?? ""));
      if (f) nieuw[veld] = f;
    }
    if (Object.keys(nieuw).length) {
      setVeldFouten(nieuw);
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(nieuw)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setFout("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, soort: "Aanmelding jeugdhulp", rol, gclid: leesKlikId() }),
      });
      if (res.ok) {
        setGebeldNummer(String(data.phone ?? "").trim());
        setStatus("ok");
        form.reset();
        // Hier, en nergens anders. Er is geen bedankt-URL waar we op kunnen
        // meten, dus dit punt in de success-handler ís het conversiemoment.
        meldConversie("aanmelding");
      } else {
        const body = await res.json().catch(() => ({}));
        setStatus("error");
        // Het nummer NIET in de tekst bakken: het error-blok rendert het als
        // aantikbare tel-link, zodat een ouder op een telefoon niet hoeft over te typen.
        setFout(
          body?.error === "not_configured"
            ? "Verzenden is nog niet geconfigureerd."
            : body?.error === "validation"
              ? "Vul je naam, telefoonnummer en woonplaats in."
              : "Er ging iets mis. Bel ons gerust, dan regelen we het meteen.",
        );
      }
    } catch {
      setStatus("error");
      setFout("Geen verbinding. Probeer het zo nog eens, of bel ons.");
    }
  }

  if (status === "ok") {
    return (
      // role=status + aria-live kondigt de bevestiging aan; tabIndex maakt hem
      // focusbaar zodat de useEffect de focus hierheen kan brengen. Geen tweede
      // h2: op de landingspagina staat "Wij bellen je terug" al als kaartkop.
      <div
        ref={succesRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="py-6 text-center outline-none"
      >
        <IconBadge icon={Check} size="lg" className="mx-auto" />
        <p className="mt-5 text-2xl font-semibold text-ink">Gelukt, we bellen je terug</p>
        <p className="mx-auto mt-3 max-w-sm text-ink-soft">
          {gebeldNummer ? (
            <>
              We bellen je op <span className="font-semibold text-ink">{gebeldNummer}</span>, binnen 4 uur.
            </>
          ) : (
            <>Binnen 4 uur, ook &rsquo;s avonds en in het weekend.</>
          )}{" "}
          Spoed?{" "}
          <a href={CONTACT.phoneHref} className="font-semibold text-brand-ink underline">
            Bel {CONTACT.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      {landing ? (
        <>
          <Rij naam="name" autoComplete="name" Icon={User} fout={veldFouten.name} onBlur={controleerVeld} onHerzie={herzieVeld} />
          <Rij naam="phone" type="tel" autoComplete="tel" Icon={Phone} fout={veldFouten.phone} onBlur={controleerVeld} onHerzie={herzieVeld} />
          <Rij naam="woonplaats" autoComplete="address-level2" Icon={MapPin} helper="In welke plaats woont je kind? Zo koppelen we je meteen aan de juiste gemeente." fout={veldFouten.woonplaats} onBlur={controleerVeld} onHerzie={herzieVeld} />

          {/* Het vrije tekstveld is optioneel en zit achter een link: de eerste
              indruk moet drie velden zijn, niet vier. */}
          {toonToelichting ? (
            <div>
              <label htmlFor="veld-message" className="mb-1.5 block text-sm font-medium text-ink">
                Wat speelt er?
              </label>
              <textarea id="veld-message" name="message" rows={3} className={`${VELD_BASIS} px-4 resize-y border-field`} />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setToonToelichting(true)}
              className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-brand-ink hover:underline"
            >
              <Plus aria-hidden className="h-4 w-4" strokeWidth={2} />
              Iets toevoegen over wat er speelt?
            </button>
          )}

          {/* Rol staat vast op ouder; de advertentie beantwoordt die vraag al. */}
          {toonRollen ? (
            <fieldset>
              <legend className="mb-1.5 text-sm font-medium text-ink">Voor wie meld je aan?</legend>
              <div className="grid grid-cols-3 gap-2">
                {ROLLEN_LANDING.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRol(r.id)}
                    aria-pressed={rol === r.id}
                    className={`flex min-h-11 flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-colors ${
                      rol === r.id ? "border-brand bg-brand/[0.06]" : "border-field hover:border-ink/45"
                    }`}
                  >
                    <r.Icon aria-hidden className="h-4 w-4 text-brand" strokeWidth={1.9} />
                    <span className="text-[13px] font-medium leading-tight text-ink">{r.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ) : (
            <button
              type="button"
              onClick={() => setToonRollen(true)}
              className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-brand-ink hover:underline"
            >
              <Plus aria-hidden className="h-4 w-4" strokeWidth={2} />
              Aanmelden voor mezelf of als verwijzer
            </button>
          )}
        </>
      ) : (
        <>
          {/* Rolkeuze, visueel, geen uitleg nodig */}
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
                    rol === r.id ? "border-brand bg-brand/[0.06]" : "border-field hover:border-ink/45"
                  }`}
                >
                  <span aria-hidden className="text-xl">{r.emoji}</span>
                  <span className="text-[13px] font-medium leading-tight text-ink">{r.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <input name="name" required autoComplete="name" placeholder="Je naam" aria-label="Je naam" className={`${VELD_BASIS} px-4 border-field`} />

          <div className="grid gap-3 sm:grid-cols-2">
            <input name="phone" type="tel" required autoComplete="tel" placeholder="Telefoonnummer" aria-label="Telefoonnummer" className={`${VELD_BASIS} px-4 border-field`} />
            <input name="woonplaats" required autoComplete="address-level2" placeholder="Woonplaats" aria-label="Woonplaats" className={`${VELD_BASIS} px-4 border-field`} />
          </div>

          <textarea
            name="message"
            rows={3}
            placeholder="Wat speelt er? Een paar zinnen is genoeg."
            aria-label="Wat speelt er?"
            className={`${VELD_BASIS} px-4 resize-y border-field`}
          />
        </>
      )}

      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-ink-soft">
          {fout}{" "}
          <a href={CONTACT.phoneHref} className="font-semibold text-brand-ink underline">
            Bel {CONTACT.phone}
          </a>
        </p>
      )}

      <button
        id={submitId}
        type="submit"
        disabled={status === "sending"}
        className="mt-1 min-h-12 rounded-pill bg-brand px-7 py-4 text-[15px] font-semibold text-canvas shadow-[0_10px_24px_-8px_rgba(31,102,255,0.55)] transition-[background-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-brand-2 hover:shadow-[0_14px_30px_-8px_rgba(31,102,255,0.6)] active:translate-y-0 motion-reduce:transform-none disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
      >
        {status === "sending" ? "Versturen…" : "Bel mij terug"}
      </button>

      {landing && (
        <p className="text-center text-sm text-ink-soft">Vrijblijvend. Bellen kan zonder verwijzing.</p>
      )}

      <p className="text-center text-xs text-grey">
        Geen BSN nodig ·{" "}
        <a href="/privacybeleid.pdf" target="_blank" rel="noopener" className="underline hover:text-ink">
          privacy
        </a>
      </p>
    </form>
  );
}
