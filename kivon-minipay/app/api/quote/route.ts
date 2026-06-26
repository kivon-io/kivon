import { RELAY_APP_CONFIG } from "@/lib/relay/config"
import {
  APP_NAME,
  PROTOCOL_VERSION,
  RELAY_LINK_API_URL,
  TRADE_TYPE,
} from "@/lib/relay/constants"
import { getQuoteSchema } from "@/lib/relay/schemas"
import { parseUnits } from "@/lib/relay/units"
import { NextRequest, NextResponse } from "next/server"

// Quotes are revalidated at fill time — never serve a cached one.
export const dynamic = "force-dynamic"

// Cap how long we'll wait on Relay so a slow upstream can't hang the request.
const UPSTREAM_TIMEOUT_MS = 15_000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const parsed = getQuoteSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const {
      user,
      originChainId,
      destinationChainId,
      originCurrency,
      destinationCurrency,
      amount,
      decimals,
      slippageTolerance,
      recipient,
      // destinationVmType and connectedChainId are validation-only.
    } = parsed.data

    const payload = {
      user,
      originChainId,
      destinationChainId,
      originCurrency,
      destinationCurrency,
      amount: parseUnits(amount, decimals),
      tradeType: TRADE_TYPE.EXACT_INPUT,
      ...(slippageTolerance && { slippageTolerance }),
      ...(recipient && { recipient }),
      appFees: [
        {
          recipient: RELAY_APP_CONFIG.APP,
          fee: RELAY_APP_CONFIG.FEE,
        },
      ],
      protocolVersion: PROTOCOL_VERSION.PREFER_V2,
      refundTo: user,
      referrer: APP_NAME,
    }

    const response = await fetch(`${RELAY_LINK_API_URL}/quote/v2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return NextResponse.json(
        {
          error:
            errorData?.message || `Failed to fetch quote: ${response.status}`,
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data as Quote)
  } catch (error) {
    // AbortSignal.timeout rejects with a TimeoutError.
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Quote request timed out. Please try again." },
        { status: 504 }
      )
    }
    const message =
      error instanceof Error ? error.message : "Failed to fetch quote"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
