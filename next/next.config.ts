import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "content-api.changenow.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      { hostname: process.env.IMAGE_HOSTNAME || "localhost" },
      {
        protocol: "https",
        hostname: "changenow.io",
      },
      {
        protocol: "https",
        hostname: "trusty-dinosaur-aff6ef4f16.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "trusty-dinosaur-aff6ef4f16.media.strapiapp.com",
      },
    ],
  },
}

export default nextConfig
