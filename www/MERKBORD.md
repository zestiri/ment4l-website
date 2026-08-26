# MENT4L merkbord — de regels die deze site volgt

Het volledige bord staat hier: <https://claude.ai/code/artifact/067875e0-d191-436c-ad3a-a7aad9105b08>
Bronbestand: `IT-BUSINESS/klanten/ment4l/brandboard.html` (Facet-framework).

Dit bestand is de korte versie voor wie code aan deze site schrijft. Wijkt de code af van het bord,
dan is de code fout, niet het bord. Verandert het bord, werk dan ook dit bestand bij.

## Logo

Er zijn precies twee vormen, allebei op `currentColor`:

| Vorm | Bestand | Waar |
|---|---|---|
| Merkteken (de 4) | `public/ment4l-mark.svg` | **Nav en footer**, favicon, app-icoon, avatar |
| Woordmerk | `public/ment4l-wordmark.svg` | Breed liggend gebruik: OG-beeld, drukwerk, presentaties |

**In de interface staat het merkteken, geen letters.** De nav draagt de 4 op 28px (32px vanaf md),
de footer op 36px.

Beide zitten in `src/components/site/Logo.tsx`; `variant="mark"` geeft de 4, zonder variant het
woordmerk. Regel de maat met de **hoogte** (`h-7`, `h-9`), nooit met `font-size`. De kleur komt van de tekstkleur eromheen:
`text-white` op donker, `text-ink` op licht.

**Nooit het woordmerk natypen in een font.** Dat stond hier eerder (`MENT` + gekleurde `4` + `L` in
IBM Plex Serif) en dat is niet het logo: de 4 is een tekening met een gezicht erin, geen karakter.

## Kleur (65-25-10)

| Rol | Token | Hex |
|---|---|---|
| Canvas, 65% | `bg-canvas` | `#FFFDFA` |
| Charcoal, 25% | `bg-charcoal` | `#121212` |
| Blauw, 10% | `text-brand` | `#1F66FF` |
| Spoed | `text-coral` | `#EE634E` |

Blauw haalt AA op wit (4,7:1) en mag dus tekst zijn. **Koraal haalt dat niet** (3,2:1): gebruik het
als vulling of icoonkleur in een getint vlak, nooit als bodytekst op wit en nooit wit op koraal.
Koraal is bovendien semantisch: alleen spoed en crisis, altijd naast een telefoonnummer.

Precies één donker vlak per pagina. Twee halen elkaar onderuit.

## Iconen

Alles via `src/components/site/IconBadge.tsx`. Geen losse `<span className="grid h-… rounded-…">`
meer bouwen; dat leverde eerder acht verschillende maten en drie radii op dezelfde site op.

```tsx
<IconBadge icon={Phone} />                     // 44px, merkblauw — de standaard
<IconBadge icon={Clock} size="sm" />           // 36px
<IconBadge icon={Check} size="lg" />           // 56px
<IconBadge icon={Phone} tone="coral" />        // alleen spoed en crisis
<CheckBullet />                                // vinkje in een opsomming
```

Regels: lucide-react, lijnstijl, `strokeWidth` 1.9, altijd rond, altijd een getinte vulling.
Geen gevulde of meerkleurige iconen, en geen emoji of tekst-vinkjes waar een icoon hoort.

Knoppen en menu-triggers vallen hier buiten: dat zijn bedienelementen, geen icoonvlakken.

## Typografie

Koppen IBM Plex Serif, bodytekst Switzer (Fontshare, als woff2 in `src/fonts/`), kleine labels
IBM Plex Mono. Bodytekst nooit onder 14px.

## Toon

Mensentaal, korte zinnen, en zeggen wat er gebeurt en wanneer. Geen beleidstaal, geen "ontzorgen",
geen "holistisch". Een belofte krijgt een termijn of hij gaat eruit.
