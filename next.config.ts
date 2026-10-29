import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname:
          "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "http",
        hostname: "209.145.55.109",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;