import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: "/keepsurfing",
  assetPrefix: "/keepsurfing",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
