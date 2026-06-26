import { BridgeLayoutShell } from "@/components/bridge/bridge-layout-shell"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-linear-to-b from-kivon-300/50 via-white to-white pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] dark:from-kivon-500/50 dark:via-black dark:to-black">
      <BridgeLayoutShell>{children}</BridgeLayoutShell>
    </div>
  )
}

export default Layout
