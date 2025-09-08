import { createContext, useContext, useState } from "react"

const TradingViewContext = createContext<{
  isChartOpen: boolean
  handleToggleChart: () => void
}>({
  isChartOpen: false,
  handleToggleChart: () => {},
})

export const TradingViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChartOpen, setIsChartOpen] = useState(false)

  const handleToggleChart = () => {
    setIsChartOpen(!isChartOpen)
  }

  const values = {
    isChartOpen,
    handleToggleChart,
  }

  return <TradingViewContext.Provider value={values}>{children}</TradingViewContext.Provider>
}

export const useTradingView = () => {
  const context = useContext(TradingViewContext)

  if (!context) {
    throw new Error("useTradingView must be used within a <TradingViewProvider />")
  }

  return context
}
