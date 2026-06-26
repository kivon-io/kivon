import type { EIP1193Provider } from "viem"

declare global {
  interface Window {
    // MiniPay (and other injected wallets) expose an EIP-1193 provider here.
    ethereum?: EIP1193Provider & { isMiniPay?: boolean }
  }
}

export {}
