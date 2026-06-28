const OPTIMIZED_IMAGE_HOSTS = new Set([
  "coin-images.coingecko.com",
  "assets.relay.link",
  "wikimedia.org",
])

export function isOptimizableImageUrl(url: string) {
  try {
    return OPTIMIZED_IMAGE_HOSTS.has(new URL(url).hostname)
  } catch {
    return false
  }
}
