import AppSidebar from "@/components/app-sidebar"
import { BridgeLayoutShell } from "@/components/bridge/bridge-layout-shell"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-svh bg-linear-to-b from-kivon-300/50 via-white to-white dark:from-kivon-500/50 dark:via-black dark:to-black">
      {/* pt-[max(1rem,env(safe-area-inset-top))]
      pb-[max(1rem,env(safe-area-inset-bottom))] */}
      <BridgeLayoutShell>
        <AppSidebar />
        {children}
      </BridgeLayoutShell>
    </div>
  )
}

export default Layout
