"use client"

import navbarData from "@/data/navbar.json"
import { motion } from "motion/react"
import DesktopNavbar from "./desktop-navbar"
import MobileNavbar from "./mobile-navbar"

const Navbar = () => {
  const { items } = navbarData

  return (
    <motion.nav className='fixed top-0 mx-auto inset-x-0 z-50 w-[95%] lg:w-full'>
      <div className='hidden lg:block w-full'>
        <DesktopNavbar items={items} />
      </div>
      <div className='block lg:hidden w-full'>
        <MobileNavbar items={items} />
      </div>
    </motion.nav>
  )
}

export default Navbar
