import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Het subdomein scholen.ment4l.nl is samengevoegd in de hoofdsite. Al het
      // verkeer op dat subdomein gaat 307 naar /scholen; paden blijven behouden
      // (/professionals -> /scholen/professionals, /programma/x -> /scholen/programma/x).
      // De host-conditie zorgt dat dit ALLEEN op scholen.ment4l.nl vuurt en nooit
      // op www.ment4l.nl. Niet-permanent zodat de samenvoeging reversibel blijft.
      {
        source: "/:path*",
        has: [{ type: "host", value: "scholen.ment4l.nl" }],
        destination: "https://www.ment4l.nl/scholen/:path*",
        permanent: false,
      },
      // /spoed is opgeheven: de crisis-triage met landelijke noodnummers hoort
      // niet bij MENT4L. Verkeer gaat 301 naar de reguliere ambulante-funnel.
      { source: "/spoed", destination: "/ambulante-begeleiding", permanent: true },
      // De schooltak is samengevoegd: jeugdcoaching-op-scholen leidt nu naar de
      // scholen-hub (/scholen). Niet-permanent zodat het reversibel blijft.
      { source: "/trajecten/jeugdcoaching-op-scholen", destination: "/scholen", permanent: false },
    ];
  },
};

export default nextConfig;
