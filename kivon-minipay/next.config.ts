import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.4.58",
    ".ngrok.app",
    ".ngrok-free.dev",
    ".ngrok-free.app",
    "da8c-89-249-74-236.ngrok-free.app",
  ],
}

export default nextConfig
