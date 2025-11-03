import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos", // necesario si tus imágenes vienen de este dominio
      },
    ],
  },
};

export default nextConfig;
