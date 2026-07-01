import { NextResponse } from "next/server"

import { fetchVaultDetails } from "@/lib/earn/fetch-vault"
import { CELO_CHAIN_ID, IS_TESTNET } from "@/lib/network/config"

export async function GET() {
  if (IS_TESTNET) {
    return NextResponse.json(
      {
        error:
          "Earn vault is only available on Celo mainnet. Disable testnet mode to view vault data.",
      },
      { status: 503 }
    )
  }

  try {
    const vault = await fetchVaultDetails()
    return NextResponse.json({ ...vault, chainId: CELO_CHAIN_ID })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch vault details"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
