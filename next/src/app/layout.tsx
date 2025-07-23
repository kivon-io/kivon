import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/context/app-context"
import { TRPCProvider } from "@/trpc/client"
import { Metadata } from "next"

import { generateMetadataObject } from "@/lib/shared/metadata"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
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
              <Navbar {...navbar} />
              {children}
              <Footer {...footer} social_media_links={globalData?.contact?.social_media_links} />
            </ThemeProvider>
          </AppProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}
