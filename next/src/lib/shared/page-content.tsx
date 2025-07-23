import DynamicZoneManager from "@/components/dynamic-zone/manager"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone

  return (
    <main className='relative w-full'>
      {dynamicZone && <DynamicZoneManager dynamicZone={dynamicZone} />}
    </main>
  )
}
