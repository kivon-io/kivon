import { AppShell } from "@/components/app-shell"
import { EarnLayoutShell } from "@/components/earn/earn-layout-shell"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell>
      <EarnLayoutShell>{children}</EarnLayoutShell>
    </AppShell>
  )
}

export default Layout
