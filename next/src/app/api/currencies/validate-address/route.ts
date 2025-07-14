import { CHANGE_NOW_API_URL } from "@/lib/shared/constants"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const address = searchParams.get("address")
  const network = searchParams.get("network")

  const apiKey = process.env.CHANGE_NOW_API_KEY

  try {
    const response = await fetch(
      `${CHANGE_NOW_API_URL}/exchange/validate-address?address=${address}&network=${network}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-changenow-api-key": apiKey!,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to validate address: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error validating address:", error)
    return NextResponse.json({ error: "Failed to validate address" }, { status: 500 })
  }
}
