import { api } from "@/lib/api"
import type { MerklRewardsResponse, VaultDetails } from "@/lib/earn/types"

export async function fetchVault(): Promise<VaultDetails> {
  const { data } = await api.get<VaultDetails>("/earn/vault")
  return data
}

export async function fetchRewards(
  address: string
): Promise<MerklRewardsResponse> {
  const { data } = await api.get<MerklRewardsResponse>("/earn/rewards", {
    params: { address },
  })
  return data
}
