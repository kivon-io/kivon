import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import { AutoConnect } from "@/components/providers/auto-connect"
import { QueryProvider } from "@/components/providers/query-provider"
import { Web3Provider } from "@/components/providers/web3-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables safe-area insets (notch, home bar)
}
export const metadata: Metadata = {
  title: "Kivon Bridge",
  description: "Bridge from Celo with Kivon",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Web3Provider>
            <QueryProvider>
              <AutoConnect />
              <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col">
                {children}
              </div>
            </QueryProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
