import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
