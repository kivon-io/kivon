import React from "react"

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-svh bg-linear-to-b from-kivon-300/50 via-white to-white dark:from-kivon-500/50 dark:via-black dark:to-black">
      {children}
    </div>
  )
}

export default AppContainer
