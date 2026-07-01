import AppContainer from "@/components/app-container"
import { AppLogo } from "@/components/app-logo"
import { HomeActionCards } from "@/components/home-action-cards"

export default function Page() {
  return (
    <AppContainer>
      <div className="flex min-h-dvh flex-col gap-8 px-4 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col items-center gap-2 pt-6 text-center">
          <AppLogo size="md" />
          <p className="max-w-xs text-base text-muted-foreground">
            Bridge across chains or earn yield on your stablecoins.
          </p>
        </div>

        <div className="flex flex-1 flex-col">
          <HomeActionCards />
        </div>
      </div>
    </AppContainer>
  )
}
