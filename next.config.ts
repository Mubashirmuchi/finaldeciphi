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
        protocol: "http",
        hostname: "43.204.19.133",
        port: "1337",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "*.strapi.io",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
