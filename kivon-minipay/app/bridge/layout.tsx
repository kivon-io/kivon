import dynamic from "next/dynamic"

import { BridgeLayoutShell } from "@/components/bridge/bridge-layout-shell"
import { BridgeProviders } from "@/components/providers/bridge-providers"

const AppSidebar = dynamic(() => import("@/components/app-sidebar"), {
  loading: () => <div className="h-12 shrink-0" aria-hidden />,
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BridgeProviders>
      <div className="min-h-svh bg-linear-to-b from-kivon-300/50 via-white to-white dark:from-kivon-500/50 dark:via-black dark:to-black">
        <BridgeLayoutShell>
          <AppSidebar />
          {children}
        </BridgeLayoutShell>
      </div>
    </BridgeProviders>
  )
}

export default Layout
