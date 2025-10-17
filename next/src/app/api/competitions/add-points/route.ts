import { COMPETITIONS_API_URL } from "@/lib/shared/constants"

export async function POST(request: Request) {
  const { userAddress, volume } = await request.json()

  const payload = {
    walletAddress: userAddress,
    usdAmount: Number(volume),
  }

  try {
    const response = await fetch(`${COMPETITIONS_API_URL}/users/wallet/${userAddress}/add-points`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error(error)
      return Response.json({ success: false, error: "Failed to add points" }, { status: 502 })
    }

    const data = await response.json()
    return Response.json({ success: true, data })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: "Unexpected error" }, { status: 500 })
  }
}
