import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.4.58",
    ".ngrok.app",
    ".ngrok-free.dev",
    ".ngrok-free.app",
    "497e-84-252-95-166.ngrok-free.app",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
      {
        protocol: "https",
        hostname: "assets.relay.link",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/bridge",
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              "<https://coin-images.coingecko.com>; rel=preconnect, <https://assets.relay.link>; rel=preconnect",
          },
        ],
      },
    ]
  },
}

export default nextConfig
