import { CHANGE_NOW_API_URL, EXCHANGE_PARAMS_DEFAULT } from "@/lib/shared/constants"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const fromCurrency = searchParams.get("sendToken")
  const fromNetwork = searchParams.get("sendTokenNetwork")
  const toCurrency = searchParams.get("receiveToken")
  const toNetwork = searchParams.get("receiveTokenNetwork")
  const flow = searchParams.get("flow") || EXCHANGE_PARAMS_DEFAULT.FLOW
  const sendAmount = searchParams.get("sendAmount")

  try {
    const response = await fetch(
      `${CHANGE_NOW_API_URL}/exchange/estimated-amount?fromCurrency=${fromCurrency}&fromNetwork=${fromNetwork}&toCurrency=${toCurrency}&toNetwork=${toNetwork}&flow=${flow}&fromAmount=${sendAmount}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-changenow-api-key": process.env.CHANGE_NOW_API_KEY!,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange estimate: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching exchange estimate:", error)
    return NextResponse.json({ error: "Failed to fetch exchange estimate" }, { status: 500 })
  }
}
