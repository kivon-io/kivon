import Steps from "@/components/dynamic-zone/steps"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative'>
      {children}
      <Steps />
    </div>
  )
}

export default Layout
