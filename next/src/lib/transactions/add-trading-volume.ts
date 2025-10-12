export type AddTradingVolArgs = {
  userAddress: string
  volume: number
  originChainId: number
  originAddress: string
  destinationChainId: number
  destinationAddress: string
}

export async function addTradingVolume(args: AddTradingVolArgs): Promise<boolean> {
  try {
    const proxyRes = await fetch(`/api/competitions/add-volume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    })
    if (!proxyRes.ok) return false
    const json = await proxyRes.json()
    return Boolean(json?.success)
  } catch (error) {
    console.error(error)
    return false
  }
}
