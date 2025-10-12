import { COMPETITIONS_API_URL } from "@/lib/shared/constants"

type AddTradingVolArgs = {
  userAddress: string
  volume: number
  originChainId: number
  originAddress: string
  destinationChainId: number
  destinationAddress: string
}

export async function POST(request: Request) {
  try {
    const {
      userAddress,
      volume,
      originChainId,
      originAddress,
      destinationChainId,
      destinationAddress,
    }: AddTradingVolArgs = await request.json()

    // Fetch latest active competition
    const competitionRes = await fetch(`${COMPETITIONS_API_URL}/competitions/latest`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
    if (!competitionRes.ok) {
      return Response.json(
        { success: false, error: "Failed to fetch competition" },
        { status: 502 }
      )
    }
    const competition: Competition = await competitionRes.json()

    // Check active
    const ended = new Date(competition.endDate).getTime() <= Date.now()
    if (ended) {
      return Response.json({ success: false, error: "Competition ended" }, { status: 400 })
    }

    // Check user joined
    const joinedRes = await fetch(
      `${COMPETITIONS_API_URL}/competitions/${competition.id}/check-user-joined/${userAddress}`,
      { headers: { Accept: "application/json" } }
    )
    if (!joinedRes.ok) {
      return Response.json(
        { success: false, error: "Failed to verify membership" },
        { status: 502 }
      )
    }
    const isJoined: boolean = await joinedRes.json()
    if (!isJoined) {
      return Response.json({ success: false, error: "User not joined" }, { status: 403 })
    }

    // Optional network-to-network validation
    if (competition.enableNetworkToNetworkTrading) {
      const isValidRoute =
        originChainId.toString() === competition.originChain.chainId &&
        originAddress === competition.originCurrency.currencyAddress &&
        destinationChainId.toString() === competition.destinationChain.chainId &&
        destinationAddress === competition.destinationCurrency.currencyAddress
      if (!isValidRoute) {
        return Response.json({ success: false, error: "Invalid route" }, { status: 400 })
      }
    }

    // Update volume
    const updateRes = await fetch(
      `${COMPETITIONS_API_URL}/competitions/${competition.id}/update-volume`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ userAddress, volume }),
      }
    )
    if (!updateRes.ok) {
      return Response.json({ success: false, error: "Failed to update volume" }, { status: 502 })
    }

    const contentType = updateRes.headers.get("content-type") || ""
    let data: unknown = null
    if (contentType.includes("application/json")) {
      try {
        data = await updateRes.json()
      } catch {
        data = null
      }
    }
    return Response.json({ success: true, data })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: "Unexpected error" }, { status: 500 })
  }
}
