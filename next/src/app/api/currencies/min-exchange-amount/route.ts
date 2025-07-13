import { CHANGE_NOW_API_URL, EXCHANGE_PARAMS_DEFAULT } from "@/lib/shared/constants"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const fromCurrency = searchParams.get("sendToken")
  const fromNetwork = searchParams.get("sendTokenNetwork")
  const toCurrency = searchParams.get("receiveToken")
  const toNetwork = searchParams.get("receiveTokenNetwork")
  const flow = searchParams.get("flow") || EXCHANGE_PARAMS_DEFAULT.FLOW

  try {
    const response = await fetch(
      `${CHANGE_NOW_API_URL}/exchange/min-amount?fromCurrency=${fromCurrency}&fromNetwork=${fromNetwork}&toCurrency=${toCurrency}&toNetwork=${toNetwork}&flow=${flow}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-changenow-api-key": process.env.CHANGE_NOW_API_KEY!,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch min exchange amount: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data as MinExchangeAmountResponse)
  } catch (error) {
    console.error("Error fetching min exchange amount:", error)
    return NextResponse.json({ error: "Failed to fetch min exchange amount" }, { status: 500 })
  }
}
