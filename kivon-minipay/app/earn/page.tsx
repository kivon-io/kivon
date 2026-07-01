import HeaderInfo from "@/components/earn/header-info"
import VaultInfo from "@/components/earn/vault-info"

export default function EarnPage() {
  return (
    <div className="relative flex flex-col gap-5">
      <HeaderInfo />
      <VaultInfo />
    </div>
  )
}
