import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/context/app-context"
import { TRPCProvider } from "@/trpc/client"
import { Metadata, Viewport } from "next"

import { Toaster } from "@/components/ui/sonner"
import { generateMetadataObject } from "@/lib/shared/metadata"
import fetchContentType from "@/lib/strapi/fetchContentType"
import DynamicWalletContext from "@/lib/wallet/dynamic-wallet-context"
import { Barlow, Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    "global",
    {
      populate: "seo.metaImage",
    },
    true
  )

  const seo = pageData?.seo as unknown as Seo

  const metadata = generateMetadataObject(seo as Seo)
  return metadata
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const globalData = await fetchContentType(
    "global",
    {
      populate: {
        footer: {
          populate: {
            columns: {
              populate: {
                items: true,
              },
            },
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText", "name"],
                },
              },
            },
          },
        },
        navbar: {
          populate: {
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText", "name"],
                },
              },
            },
            items: {
              populate: {
                items: true,
              },
            },
          },
        },
        contact: {
          populate: {
            social_media_links: true,
          },
        },
      },
    },
    true
  )

  const footer = globalData?.footer
  const navbar = globalData?.navbar

  return (
    <html lang='en' className='bg-background dark:bg-neutral-950' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable} antialiased bg-background`}
        suppressHydrationWarning
      >
        <TRPCProvider>
          <AppProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <DynamicWalletContext>
                <Navbar {...navbar} />
                {children}
                <Toaster />
                <Footer {...footer} social_media_links={globalData?.contact?.social_media_links} />
              </DynamicWalletContext>
            </ThemeProvider>
          </AppProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}
