import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.4.58",
    ".ngrok.app",
    ".ngrok-free.dev",
    ".ngrok-free.app",
    "ea33-146-70-133-138.ngrok-free.app",
  ],
}

export default nextConfig
