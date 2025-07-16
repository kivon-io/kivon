import Hero from "@/components/dynamic-zone/hero"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative w-full'>
      <Hero />
      {children}
    </div>
  )
}

export default Layout
