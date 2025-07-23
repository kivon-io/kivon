import { strapiImage } from "../strapi/strapiImage"

export function generateMetadataObject(seo: Seo) {
  return {
    title: seo?.metaTitle || "Kivon – Limitless Crypto Swaps, Buy, Sell, and Bridge",
    description:
      seo?.metaDescription ||
      "Kivon is your all-in-one Web3 platform for instant, secure, and limitless crypto swaps, buying, selling, and bridging. Trade over 1,400+ cryptocurrencies with no KYC, no tracking, and no limits. Experience seamless multichain swaps, fixed rates, and more.",
    keywords:
      seo?.keywords ||
      [
        "crypto exchange",
        "swap crypto",
        "buy crypto",
        "sell crypto",
        "bridge crypto",
        "multichain",
        "no KYC",
        "instant crypto swap",
        "limitless crypto",
        "Web3",
        "bitcoin",
        "ethereum",
        "altcoins",
      ].join(", "),
    openGraph: {
      title:
        seo?.ogTitle || seo?.metaTitle || "Kivon – Limitless Crypto Swaps, Buy, Sell, and Bridge",
      description:
        seo?.ogDescription ||
        seo?.metaDescription ||
        "Trade, buy, sell, and bridge 1,400+ cryptocurrencies instantly and securely. No KYC. No limits. No tracking. The only crypto exchange you’ll ever need.",
      url: "https://kivon.io",
      siteName: "Kivon",
      images: seo?.metaImage
        ? [{ url: strapiImage(seo?.metaImage.url) }]
        : [
            {
              url: "https://kivon.io/og-image.png",
              width: 1200,
              height: 630,
              alt: "Kivon Crypto Exchange",
            },
          ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: seo?.twitterCard || "summary_large_image",
      title:
        seo?.twitterTitle ||
        seo?.metaTitle ||
        "Kivon – Limitless Crypto Swaps, Buy, Sell, and Bridge",
      description:
        seo?.twitterDescription ||
        seo?.metaDescription ||
        "Trade, buy, sell, and bridge 1,400+ cryptocurrencies instantly and securely. No KYC. No limits. No tracking.",
      site: "@kivon_io",
      creator: "@kivon_io",
      images: seo?.twitterImage ? [{ url: seo.twitterImage }] : ["https://kivon.io/og-image.png"],
    },
  }
}
