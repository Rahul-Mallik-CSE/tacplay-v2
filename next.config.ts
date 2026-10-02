import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "b9xftvgx-8000.asse.devtunnels.ms",
      },
    ],
  },
};

export default nextConfig;
