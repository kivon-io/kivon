"use client"

import { useIsTradingCompetition } from "@/hooks/use-is-reviews"
import { cn } from "@/lib/utils"
import ConnectedWallet from "@/lib/wallet/connected-wallet"
import UserPointsNavbar from "@/lib/wallet/user-points-navbar"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useEffect, useState } from "react"
import Logo from "../logo"
import { ModeToggle } from "../toggle-theme"
import { Button } from "../ui/button"
import NavbarItem from "./navbar-item"

type Props = {
  items: {
    id: number
    text: string
    URL: string
    target?: string | null
  }[]
  logo: {
    company: string
    image: ImageType
  }
}

const DesktopNavbar = ({ items, logo }: Props) => {
  const { scrollY } = useScroll()
  const [showBackground, setShowBackground] = useState(false)
  const { primaryWallet, setShowAuthFlow } = useDynamicContext()
  const isTradingCompetition = useIsTradingCompetition()

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true)
    } else {
      setShowBackground(false)
    }
  })

  useEffect(() => {
    if (isTradingCompetition) {
      setShowBackground(true)
    }
  }, [isTradingCompetition, showBackground])

  return (
    <motion.div
      className={cn(
        "w-full flex relative justify-between px-4 py-3 transition duration-200 bg-transparent mx-auto"
      )}
      animate={{
        backgroundColor: showBackground ? "#171717" : "rgba(0,0,0,0)",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <AnimatePresence>
        {showBackground && (
          <motion.div
            key={String(showBackground)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
            }}
            className={cn(
              "absolute inset-0 h-full w-full bg-white dark:bg-neutral-900 pointer-events-none [mask-image:linear-gradient(to_bottom,white,white,white)]"
            )}
          />
        )}
      </AnimatePresence>
      <motion.div
        className='relative max-w-7xl mx-auto w-full flex justify-between items-center'
        animate={{
          width: showBackground ? "70%" : "100%",
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <div className='flex flex-row gap-2 items-center'>
          <Logo showBackground={showBackground} logo={logo.image} />
          {items.map((item) => (
            <NavbarItem
              key={item.id}
              href={item.URL as never}
              target={item.target ?? undefined}
              showBackground={showBackground}
            >
              {item.text}
            </NavbarItem>
          ))}
        </div>
        <div className='flex space-x-2 items-center'>
          {!primaryWallet ? (
            <Button
              className='rounded-lg bg-primary dark:bg-white dark:text-black'
              size='lg'
              onClick={() => setShowAuthFlow(true)}
            >
              Connect Wallet
            </Button>
          ) : (
            <>
              <ConnectedWallet />
              <UserPointsNavbar />
            </>
          )}

          <ModeToggle />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DesktopNavbar
