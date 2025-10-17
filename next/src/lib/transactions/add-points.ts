export type AddPointsArgs = {
  userAddress: string
  volume: number
}

export async function addPoints(args: AddPointsArgs): Promise<boolean> {
  try {
    const proxyRes = await fetch(`/api/competitions/add-points`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    })
    if (!proxyRes.ok) return false
    const data = await proxyRes.json()
    return Boolean(data?.success)
  } catch (error) {
    console.error(error)
    return false
  }
}
