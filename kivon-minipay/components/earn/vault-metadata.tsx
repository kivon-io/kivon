"use client"

import type { VaultDetails } from "@/lib/earn/types"

type VaultMetadataProps = {
  vault: Pick<
    VaultDetails,
    "curator" | "timelockLabel" | "vaultVersion" | "performanceFeePercent"
  >
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

export function VaultMetadata({ vault }: VaultMetadataProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 px-4">
      <MetadataRow label="Curator" value={vault.curator} />
      <div className="border-t border-border">
        <MetadataRow label="Guardian / Timelock" value={vault.timelockLabel} />
      </div>
      <div className="border-t border-border">
        <MetadataRow label="Vault version" value={vault.vaultVersion} />
      </div>
    </div>
  )
}
