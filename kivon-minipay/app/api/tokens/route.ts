import { NextRequest, NextResponse } from "next/server"
import { RELAY_LINK_API_URL } from "@/lib/relay/constants"
import { getTokensSchema } from "@/lib/relay/schemas"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const parsed = getTokensSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { chainId, term, address, defaultList, limit } = parsed.data

    const response = await fetch(`${RELAY_LINK_API_URL}/currencies/v2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(chainId && { chainIds: [chainId] }),
        ...(term && { term }),
        ...(address && { address }),
        ...(defaultList && { defaultList: true }),
        ...(limit && { limit }),
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch tokens: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data as Token[])
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch tokens"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
