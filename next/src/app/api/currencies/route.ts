import { CHANGE_NOW_API_URL, EXCHANGE_PARAMS_DEFAULT } from "@/lib/shared/constants"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const active = searchParams.get("active") || EXCHANGE_PARAMS_DEFAULT.ACTIVE
  const flow = searchParams.get("flow") || EXCHANGE_PARAMS_DEFAULT.FLOW
  const buy = searchParams.get("buy") || EXCHANGE_PARAMS_DEFAULT.BUY
  const sell = searchParams.get("sell") || EXCHANGE_PARAMS_DEFAULT.SELL

  try {
    const apiKey = process.env.CHANGE_NOW_API_KEY

    const url = `${CHANGE_NOW_API_URL}/exchange/currencies?active=${active}&flow=${flow}&buy=${buy}&sell=${sell}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey!,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`ChangeNow API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching currencies:", error)
    return NextResponse.json({ error: "Failed to fetch currencies" }, { status: 500 })
  }
}
