import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(process.env.NODE_ENV === "development" && {
      unoptimized: true,
    }),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.deciphone.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
