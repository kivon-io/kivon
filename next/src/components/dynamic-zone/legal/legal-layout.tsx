import Section from "@/components/section"
import fetchContentType from "@/lib/strapi/fetchContentType"
import LegalSidebar from "./legal-sidebar"

const LegalLayout = async ({ children }: { children: React.ReactNode }) => {
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
          },
        },
      },
    },
    true
  )

  const legalData = globalData?.footer.columns.find(
    (column: { title: string }) => column.title === "Legal"
  )

  return (
    <Section className='relative flex flex-col md:flex-row max-w-7xl mx-auto lg:gap-10 px-0'>
      <LegalSidebar items={legalData?.items} />
      <div className='flex-1'>{children}</div>
    </Section>
  )
}

export default LegalLayout
