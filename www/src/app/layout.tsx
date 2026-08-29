import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import Tracker from "@/components/site/Tracker";
import { KlikId } from "@/components/site/KlikId";
import { Meting } from "@/components/site/Meting";
import { BottomBlur } from "@/components/site/BottomBlur";
import { ADS_ID, METING_AAN, GA4_ID, GA4_AAN, TAG_AAN } from "@/lib/conversie";
import "./globals.css";

// De id's komen uit onze eigen env, maar ze worden in een inline script gezet.
// Alles buiten [A-Za-z0-9-] eruit, zodat een typefout in .env geen scriptfout wordt.
const ADS_ID_VEILIG = ADS_ID.replace(/[^A-Za-z0-9-]/g, "");
const GA4_ID_VEILIG = GA4_ID.replace(/[^A-Za-z0-9-]/g, "");

// gtag.js laadt met de eerste beschikbare id; daarna configureren we elke id apart.
const BOOTSTRAP_ID = ADS_ID_VEILIG || GA4_ID_VEILIG;
const CONFIG_REGELS = [
  // Ads-tag met enhanced conversions AAN: gtag hasht de contactgegevens die het
  // formulier meegeeft en koppelt de conversie zo aan de klik. Werkt alleen na
  // toestemming (ad_user_data granted) en zonder ad-personalisatie (zie Meting).
  METING_AAN ? `gtag('config','${ADS_ID_VEILIG}',{allow_enhanced_conversions:true});` : "",
  // GA4 met Google Signals en ad-personalisatie UIT: pure statistiek, geen
  // personalisatie op gevoelig (zorg)gedrag.
  GA4_AAN
    ? `gtag('config','${GA4_ID_VEILIG}',{allow_google_signals:false,allow_ad_personalization_signals:false});`
    : "",
]
  .filter(Boolean)
  .join("\n");

/**
 * Toestemming eerst, tag daarna, in één blok.
 *
 * De volgorde is de hele truc: Consent Mode werkt alleen als de defaults in de
 * dataLayer staan vóórdat gtag.js draait. Daarom laadt dit script gtag.js zélf,
 * als laatste regel. Dan kan de volgorde niet omvallen door een andere
 * laadstrategie of een trage verbinding.
 *
 * Alles staat op "denied" tot de bezoeker ja zegt. `ads_data_redaction` en
 * `url_passthrough` zorgen dat Google in de tussentijd zonder cookies meet en
 * de klik-id via de URL doorgeeft in plaats van via opslag.
 */
const CONSENT_EN_TAG = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
gtag('js',new Date());
${CONFIG_REGELS}
var s=document.createElement('script');
s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${BOOTSTRAP_ID}';
document.head.appendChild(s);
`;

// Switzer (Fontshare / ITF Free Font License) — hoofd-body-font van de live site.
const switzer = localFont({
  src: [
    { path: "../fonts/switzer/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer/Switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer/Switzer-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/switzer/Switzer-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-plex-serif",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ment4l.nl"),
  title: {
    default: "MENT4L - IT'S ALL ABOUT MENT4LITY",
    template: "%s - MENT4L",
  },
  description:
    "Ambulante (spoed)hulp en jeugdcoaching door echte professionals. MENT4L begeleidt jongeren thuis, op school en op weg naar een nieuwe start.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MENT4L - IT'S ALL ABOUT MENT4LITY",
    description:
      "Ambulante (spoed)hulp en jeugdcoaching door echte professionals.",
    type: "website",
    locale: "nl_NL",
    url: "https://www.ment4l.nl/",
    images: ["/og-image.jpg"],
  },
  robots: { "max-image-preview": "large" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${switzer.variable} ${inter.variable} ${plexSerif.variable} ${plexMono.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        {TAG_AAN && (
          <Script id="consent-en-tag" strategy="afterInteractive">
            {CONSENT_EN_TAG}
          </Script>
        )}
        {children}
        <BottomBlur />
        <Tracker />
        {/* Primaire meting: draait altijd, slaat niets op. */}
        <KlikId />
        {/* Aanvulling: alleen actief met een Ads-id, en dan mét toestemmingsbalk. */}
        <Meting />
      </body>
    </html>
  );
}
