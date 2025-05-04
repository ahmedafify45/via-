import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  build: {
    env: {
      DISABLE_ESLINT_PLUGIN: "true",
    },
  },
};

export default nextConfig;
