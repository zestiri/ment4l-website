import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import Tracker from "@/components/site/Tracker";
import { BottomBlur } from "@/components/site/BottomBlur";
import "./globals.css";

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
        {children}
        <BottomBlur />
        <Tracker />
      </body>
    </html>
  );
}
