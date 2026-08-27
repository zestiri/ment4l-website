# Conversiemeting MENT4L

Hoe de meting op www.ment4l.nl werkt en wat je in Google Ads moet doen om hem aan te zetten.
Gecontroleerd tegen Google's eigen documentatie op 27 aug 2026; de bronnen staan onderaan.

## De keuze die hieronder alles bepaalt

MENT4L verkoopt jeugdhulp. Dat is voor Google een **gevoelige categorie** (gezondheids- en
medische informatie). Daar volgt één harde regel uit:

> "Conversions related to sensitive categories can't be used for measurement in enhanced
> conversions or store sales (uploads)."

**Enhanced conversions mogen hier dus niet.** Dat is geen voorzichtigheid maar beleid, en het
raakt het hele account als je het toch doet. Enhanced conversions sturen namelijk een gehasht
mailadres of telefoonnummer van de aanmelder naar Google. Bij een ouder die hulp zoekt voor
zijn kind is dat precies het gegeven dat niet weg mag.

Daarom loopt de meting hier via de **Google-klik-id (GCLID)**. Die bevat geen persoonsgegeven,
alleen een verwijzing naar de advertentieklik. Het is de enige route naar offline conversies
die in deze sector overblijft, en de site is er al op gebouwd: de klik-id komt binnen via de
URL, blijft in het geheugen van de draaiende app en staat in elke aanmeldmail.

Bewust geen cookie en geen localStorage: opslag op het apparaat vraagt toestemming, en een
banner kost hier meer meting dan hij oplevert. Google's conversiemodellering, die de gaten van
geweigerde toestemming vult, start pas rond 700 klikken per dag; wij verwachten er 15 tot 25
per maand. Wat een banner wegneemt komt dus nooit terug.

## Wat er al in de code zit

| Onderdeel | Waar |
|---|---|
| Toestemming (Consent Mode v2) + laden van de tag | `www/src/app/layout.tsx` |
| Toestemmingsbalk, bel-klikmeting, doorzetten van de keuze | `www/src/components/site/Meting.tsx` |
| Conversie-events, waardes, klik-id bewaren en lezen | `www/src/lib/conversie.ts` |
| Conversie bij aanmelding + klik-id meesturen | `www/src/components/site/AanmeldForm.tsx` |
| Conversie bij contactformulier | `www/src/components/site/ContactForm.tsx` |
| Klik-id in de leadmail | `www/src/app/api/contact/route.ts` |

Drie conversies worden gemeten: **aanmelding** (vanuit de success-handler, want er is geen
bedankt-URL), **contactformulier** en **bel-klik** (één gedelegeerde listener vangt elke
`tel:`-link op de site).

Zolang `NEXT_PUBLIC_GOOGLE_ADS_ID` leeg is, laadt er geen Google-script, staat er geen cookie
en verschijnt er geen balk. De site blijft dan precies zo cookieloos als hij nu is.

## Stap 1: drie conversieacties aanmaken in Google Ads

Ga naar **Doelen → Conversies → Conversieactie maken → Website**.

Kies bij alle drie **"Handmatig met code"**, niet "Automatisch zonder code". De URL-variant
werkt hier niet: onze conversies gebeuren zonder paginawissel, in de success-handler van het
formulier en bij een klik op een telefoonlink.

| Conversieactie | Categorie | Waarde | Primair? |
|---|---|---|---|
| Aanmelding jeugdhulp | Formulier voor leads verzenden | €100 | Ja |
| Bel-klik | Telefoontjes | €120 | Ja |
| Contactformulier | Contact | €40 | Nee (secundair) |

De waardes zijn geen omzet maar een verhouding, zodat Smart Bidding later weet wat zwaarder
weegt. Een bel-klik telt hoger dan een formulier omdat een ouder die belt vaker doorgaat; een
contactvraag is vaak nog oriënterend en hoort daarom secundair. Diezelfde waardes staan in
`conversie.ts`, dus wijzig ze op beide plekken of op geen van beide.

**Zet bij elke conversieactie "Verbeterde conversies" uit.** Sinds april 2026 is dat één
schakelaar per conversieactie in plaats van drie losse instellingen. Opt-out kan op elk moment.
Dit is de stap uit de eerste alinea; sla hem niet over.

## Stap 2: de id en de labels overnemen

Na het aanmaken toont Google het tagfragment. Daarin staat:

```
gtag('event', 'conversion', {'send_to': 'AW-123456789/AbCdEfGhIjKlMnOp'})
                                         ^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
                                         conversie-id  conversielabel
```

Het deel vóór de schuine streep is voor alle drie hetzelfde, het deel erna is per
conversieactie uniek.

Zet ze op Vercel als environment variables (Production):

```
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-123456789
NEXT_PUBLIC_GADS_LABEL_AANMELDING=<label van Aanmelding jeugdhulp>
NEXT_PUBLIC_GADS_LABEL_TELEFOON=<label van Bel-klik>
NEXT_PUBLIC_GADS_LABEL_CONTACT=<label van Contactformulier>
```

Daarna opnieuw deployen: dit zijn `NEXT_PUBLIC_`-variabelen, die worden bij de build in de
pagina gebakken en niet live gelezen.

Ontbreekt een label? Dan zet de site het event nog wel in de dataLayer maar telt Ads het niet.
Je kunt de meting dus alvast aanzetten voordat alle drie de conversieacties bestaan.

## Stap 3: controleren

1. Bezoek de site met `?gclid=TEST123` erachter en accepteer de balk.
2. Vul het aanmeldformulier in.
3. Kijk 24 tot 48 uur later in Ads of de conversieactie van **"Niet geverifieerd"** naar
   **"Conversies vastleggen"** is gesprongen. Sneller kan met de Tag Assistant.

## De toestemming

De banner is zelfgebouwd, en dat mag: Google eist een gecertificeerde CMP alleen van
*publishers* (AdSense, Ad Manager, AdMob met TCF). Voor adverteerders schrijft Google
letterlijk dat je een eigen banner mag maken, mits je de integratie met de Consent API zelf
verzorgt. Dat is precies wat `Meting.tsx` doet.

De volgorde is daarbij het enige dat echt kritiek is. Google: *"The order of the code here is
vital. If your consent code is called out of order, consent defaults won't work."* Daarom laadt
het script in `layout.tsx` gtag.js **zelf**, als laatste regel, ná de defaults. Zo kan de
volgorde niet omvallen door een andere laadstrategie of een trage verbinding.

Alle vier de signalen (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`)
starten op `denied`, met `wait_for_update: 500`. Daarnaast staan `ads_data_redaction` en
`url_passthrough` aan, zodat Google bij een weigering cookieloos meet en de klik-id via de URL
doorgeeft in plaats van via opslag.

## Wat je hierna niet moet doen

- **Geen remarketing of doelgroeplijsten.** Targeting op gezondheidsinteresse is verboden. De
  beperkingen gelden voor doelgroep-targeting, niet voor zoekwoorden: een zoekcampagne op
  keywords mag gewoon.
- **Geen lead form assets.** Die zijn voor zorg expliciet uitgesloten.
- **Geen Performance Max of Demand Gen** in deze fase. Bij gevoelige categorieën kunnen die
  stilvallen zonder foutmelding.
- **Geen BSN of gezondheidsdetails in het formulier.** Het open veld is bewust kort gehouden;
  de rest vraag je telefonisch.

## Later, als GA4 erbij komt

Vanaf 15 juni 2026 is Consent Mode voor een GA4-property die aan Google Ads gekoppeld is de
enige regelaar over of er advertentiedata verzameld wordt. Google Signals verdwijnt als
achtervang. Dat verandert niets aan de opzet hierboven, maar het betekent wel dat een fout in
de toestemmingsketen dan direct doorwerkt in Ads.

## Bronnen

- [Customer data policies](https://support.google.com/adspolicy/answer/7475709) — gevoelige categorieën en de uitsluiting van enhanced conversions
- [Set up consent mode on websites](https://developers.google.com/tag-platform/security/guides/consent) — de volgorde, de vier signalen, `ads_data_redaction`, `url_passthrough`
- [Toestemmingsbanner instellen](https://support.google.com/google-ads/answer/14546213) — eigen banner is toegestaan voor adverteerders
- [Offline conversies met GCLID](https://support.google.com/google-ads/answer/7012522) — 90 dagen bij handmatige upload, 14 dagen via een CRM-koppeling
- [De Google-tag voor conversietracking](https://support.google.com/google-ads/answer/7548399) — `AW-CONVERSION_ID/CONVERSION_LABEL`
- [Updates to your enhanced conversions settings](https://support.google.com/google-ads/answer/16884284) — één schakelaar sinds april 2026
