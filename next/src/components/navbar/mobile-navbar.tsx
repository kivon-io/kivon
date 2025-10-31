"use client"

import { useIsIndex, useIsReviews } from "@/hooks/use-is-reviews"
import { cn } from "@/lib/utils"
import ConnectedWallet from "@/lib/wallet/connected-wallet"
import UserPointsNavbar from "@/lib/wallet/user-points-navbar"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { useMotionValueEvent, useScroll } from "motion/react"
import Link from "next/link"
import { useState } from "react"
import { IoIosClose, IoIosMenu } from "react-icons/io"
import Logo from "../logo"
import { ModeToggle } from "../toggle-theme"
import { Button } from "../ui/button"

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

const MobileNavbar = ({ items, logo }: Props) => {
  const [open, setOpen] = useState(false)
  const { primaryWallet, setShowAuthFlow } = useDynamicContext()
  const isReviews = useIsReviews()
  const isIndex = useIsIndex()

  const isChangeColor = isReviews || isIndex

  const { scrollY } = useScroll()

  const [showBackground, setShowBackground] = useState(false)

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true)
    } else {
      setShowBackground(false)
    }
  })

  return (
    <div
      className={cn(
        "flex justify-between bg-transparent items-center w-full rounded-none px-2.5 py-1.5 transition duration-200 top-0 relative",
        showBackground &&
          "bg-background dark:bg-neutral-900 shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
      )}
    >
      <Logo showBackground={showBackground} logo={logo.image} />

      <div className='flex items-center gap-2'>
        {/* <ModeToggle /> */}
        <ConnectWallet />
        <IoIosMenu
          className={cn(
            "text-black dark:text-white h-6 w-6",
            isChangeColor && !showBackground && "text-white"
          )}
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className='fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col items-start justify-start space-y-10  pt-5  text-xl text-zinc-600  transition duration-200 hover:text-zinc-800'>
          <div className='flex items-center justify-between w-full px-5'>
            <Logo />
            <div className='flex items-center space-x-2'>
              <ModeToggle />

              <IoIosClose
                className='h-8 w-8 text-black dark:text-white'
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div className='flex flex-col items-start justify-start gap-[14px] px-8'>
            {items.map(
              (
                navItem: { id: number; text: string; URL: string; target?: string | null },
                idx: number
              ) => (
                <div key={idx} className='w-full relative'>
                  <Link
                    key={`link=${idx}`}
                    href={navItem.URL}
                    onClick={() => setOpen(false)}
                    className='relative'
                  >
                    <span className='block text-[26px] text-black dark:text-white'>
                      {navItem.text}
                    </span>
                  </Link>
                </div>
              )
            )}
          </div>
          <div className='flex flex-row w-full items-start gap-2.5  px-8 py-4 '>
            {/* <Button
              className='rounded-lg bg-[#1B1B1B] dark:bg-white dark:text-black w-full'
              size='lg'
            >
              Connect Wallet
            </Button> */}
            {!primaryWallet ? (
              <Button
                className='rounded-lg bg-[#1B1B1B] dark:bg-white dark:text-black w-full'
                size='lg'
                onClick={() => setShowAuthFlow(true)}
              >
                Connect Wallet
              </Button>
            ) : (
              <div className='flex flex-col gap-2'>
                <ConnectedWallet />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNavbar

const ConnectWallet = () => {
  const { primaryWallet, setShowAuthFlow } = useDynamicContext()

  return !primaryWallet ? (
    <Button
      className='rounded-lg bg-[#1B1B1B] dark:bg-white dark:text-black w-fit'
      size='sm'
      onClick={() => setShowAuthFlow(true)}
    >
      Connect
    </Button>
  ) : (
    <>
      <ConnectedWallet />
      <UserPointsNavbar />
    </>
  )
}
