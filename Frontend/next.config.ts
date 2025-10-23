import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optional: disable errors on production build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
