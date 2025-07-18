import Hero from "@/components/dynamic-zone/hero"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative w-full'>
      <Hero className='mt-40' />
      {children}
    </div>
  )
}

export default Layout
