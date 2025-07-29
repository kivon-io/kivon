"use client"

import { motion } from "motion/react"
import DesktopNavbar from "./desktop-navbar"
import MobileNavbar from "./mobile-navbar"

interface NavbarProps {
  logo: {
    company: string
    image: ImageType
  }
  items: {
    id: number
    title: string
    key: string
    items: {
      id: number
      text: string
      URL: string
      target?: string | null
    }[]
  }[]
}

const Navbar = ({ logo, items }: NavbarProps) => {
  const navItems = items.find((item) => item.key === "business")
  return (
    <motion.nav className='fixed top-0 mx-auto inset-x-0 z-50 w-full md:w-[95%] lg:w-full'>
      <div className='hidden lg:block w-full'>
        {navItems && <DesktopNavbar logo={logo} items={navItems.items} />}
      </div>
      <div className='block lg:hidden w-full '>
        {navItems && <MobileNavbar logo={logo} items={navItems.items} />}
      </div>
    </motion.nav>
  )
}

export default Navbar
