# MENT4L website

Workspace-repo. De Next.js-site staat in `www/`, de Google Ads-tooling in `google-ads/`,
referentiemateriaal uit de Framer-migratie in `ment4l-migration/`.

## Preview: nooit lokaal, altijd via Vercel

**Start geen Next.js dev-server.** Niet met `npm run dev`, niet via `preview_start` met een
launch-configuratie. Een hook blokkeert het en dat is met opzet.

Op 27 aug 2026 viel deze laptop twee keer hard uit. De oorzaak is uitputting van de Windows
commit-limiet (31,6 GB RAM plus 13,5 GB wisselbestand, samen circa 45 GB), niet de accu of de
temperatuur: er is in dertig dagen geen enkele thermische of WHEA-gebeurtenis, en elke crash
volgde binnen acht minuten op een melding "geen virtueel geheugen meer".

```
19:07  dev-server gestart   ->  19:15  geen virtueel geheugen meer
19:25  dev-server gestart   ->  19:27  idem  ->  19:31  crash
19:39  dev-server gestart   ->  19:42  idem  ->  19:47  crash
```

Bij de derde stonden er 2282 node-processen, samen 29,4 GB, allemaal kinderen van de
dev-server. Turbopack draait de PostCSS- en Tailwind-transform in losse node-kindprocessen.
De pool per stuk is begrensd op het aantal CPU-threads, maar het aantal pools is nergens
begrensd. Dev-servers die wél netjes met `preview_stop` werden afgesloten gaven diezelfde
middag geen enkel probleem.

Meet je het wisselbestand ná een herstart, dan zie je niets bijzonders. Dat is de valkuil.

### De werkwijze

```bash
# 1. Branch (nooit rechtstreeks op main werken)
git checkout -b preview/<korte-naam>

# 2. Werk, commit, push
git push -u origin preview/<korte-naam>

# 3. Wacht op de preview en haal de URL op
TOKEN=$(tr -d ' \r\n' < /c/Users/nabst/vercel-token.txt)
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://api.vercel.com/v6/deployments?projectId=prj_ONdUMj6IJ4LBq4PXe6ALWXwX6sGM&limit=1"
```

Vercel bouwt elke branch die niet `main` is automatisch als preview. Production hangt aan
`main`, root directory is `www`.

### De preview openen of delen

Preview-URL's staan achter Vercel-authenticatie. Er is een bypass-sleutel; die staat in
`C:\Users\nabst\vercel-preview-bypass.txt` en hoort daar te blijven (nooit in de repo, nooit
in een chat).

```bash
SECRET=$(tr -d ' \r\n' < /c/Users/nabst/vercel-preview-bypass.txt)

# Voor jezelf of om te delen: plak dit achter de URL
#   ?x-vercel-protection-bypass=$SECRET&x-vercel-set-bypass-cookie=true

# Voor curl of scripts is een header netter:
curl -H "x-vercel-protection-bypass: $SECRET" <preview-url>/pad
```

Verifiëren doe je op die URL: de Browser-pane mag daar gewoon heen, screenshots en
DOM-checks werken er normaal. Alleen het starten van een lokale server is dicht.

### Wat wel lokaal mag

Het gaat specifiek om `next dev`, niet om zwaar werk in het algemeen:

| Wel | Waarom |
|---|---|
| `npm run build`, `eslint`, `tsc` | Zwaar maar eindig, sluit zichzelf af |
| `npx next start -p 3111 -H 127.0.0.1` | Draait een gebouwde output, compileert niets, dus geen kindprocespool |
| `vite` | Andere bundler, kent deze pathologie niet |

De lichte route als je tóch lokaal wilt kijken: eerst `npm run build`, dan `next start`.

Er draait een wachter (`C:\Users\nabst\tools\devguard.ps1`) die ingrijpt bij 200
node-processen. Dat is een vangnet, geen vrijbrief. Moet er echt een dev-server draaien,
vraag het dan eerst aan de gebruiker, zet `TOESTA_LOKALE_DEVSERVER=1`, en sluit hem daarna
af met `preview_stop`. Niet afsluiten is wat de crashes veroorzaakte.

## Schrijfregels

Nooit een em dash in zichtbare tekst. Vervang door `:` bij een opsomming, `.` tussen twee
gedachten, `,` bij een doorlopende tussenzin of `()` bij een terzijde. In code-comments mag
hij blijven staan. Zie de skill `web-copy`.

## Conversiemeting

De opzet en de redenering staan in [`google-ads/CONVERSIEMETING.md`](google-ads/CONVERSIEMETING.md).
Kort: de meting loopt via de Google-klik-id, niet via een browsertag, omdat jeugdhulp een
gevoelige categorie is en enhanced conversions daar verboden zijn. De klik-id blijft in het
geheugen van de app, niet in een cookie.

Wat je NIET moet proberen: de klik-id doorgeven door het `href`-attribuut van interne links
te herschrijven. De Next-router navigeert op de React-prop en negeert dat.
