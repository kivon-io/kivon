import { NextResponse } from "next/server"
import { RELAY_LINK_API_URL } from "@/lib/relay/constants"

export async function GET() {
  try {
    const response = await fetch(`${RELAY_LINK_API_URL}/chains`)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch chains: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data.chains as Chain[])
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch chains"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
