import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/insights",
        destination: "/guias-de-seguros",
        permanent: true,
      },
      {
        source: "/insights/:slug",
        destination: "/guias-de-seguros/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
