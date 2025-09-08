"use client"

import { useTheme } from "next-themes"
// TradingViewWidget.jsx
import { memo, useEffect, useRef } from "react"

const TradingViewWidget = ({ ticker }: { ticker: string }) => {
  const container = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!container.current) return

    // Clear any existing content to prevent duplicates
    container.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
    script.type = "text/javascript"
    script.async = true

    const isDark = resolvedTheme === "dark"
    const config = {
      lineWidth: 2,
      lineType: isDark ? 2 : 0,
      chartType: "area",
      fontColor: "rgb(106, 109, 120)",
      gridLineColor: isDark ? "rgba(242, 242, 242, 0.06)" : "rgba(46, 46, 46, 0.06)",
      volumeUpColor: "rgba(34, 171, 148, 0.5)",
      volumeDownColor: "rgba(247, 82, 95, 0.5)",
      backgroundColor: isDark ? "#0F0F0F" : "#ffffff",
      widgetFontColor: isDark ? "#DBDBDB" : "#0F0F0F",
      upColor: "#22ab94",
      downColor: "#f7525f",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f",
      colorTheme: isDark ? "dark" : "light",
      isTransparent: false,
      locale: "en",
      chartOnly: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      valuesTracking: "1",
      changeMode: "no-values",
      symbols: [[`CRYPTO:${ticker}USD|ALL`]],
      dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      fontSize: "10",
      headerFontSize: "medium",
      autosize: true,
      width: "100%",
      height: "100%",
      noTimeScale: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
    }

    script.innerHTML = JSON.stringify(config)
    container.current.appendChild(script)

    return () => {
      if (container.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        container.current.innerHTML = ""
      }
    }
  }, [resolvedTheme, ticker])

  return (
    <div className='tradingview-widget-container' ref={container}>
      <div className='tradingview-widget-container__widget'></div>
    </div>
  )
}

export default memo(TradingViewWidget)
