import dynamic from "next/dynamic"

import AppContainer from "@/components/app-container"
import { AutoConnect } from "@/components/providers/auto-connect"
import { Web3Provider } from "@/components/providers/web3-provider"

const AppSidebar = dynamic(() => import("@/components/app-sidebar"), {
  loading: () => <div className="h-12 shrink-0" aria-hidden />,
})

/** Shared shell (Wagmi + MiniPay auto-connect, container, sidebar) for app routes. */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AutoConnect />
      <AppContainer>
        <AppSidebar />
        {children}
      </AppContainer>
    </Web3Provider>
  )
}
