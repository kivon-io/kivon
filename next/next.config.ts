import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "content-api.changenow.io",
      },
    ],
  },
}

export default nextConfig
