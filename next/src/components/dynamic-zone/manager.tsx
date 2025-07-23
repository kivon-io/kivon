"use client"
import dynamic from "next/dynamic"
import React from "react"

interface DynamicZoneComponent {
  __component: string
  id: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface Props {
  dynamicZone: DynamicZoneComponent[]
}

const componentMapping: { [key: string]: any } = {
  "dynamic-zone.steps": dynamic(() => import("./steps"), {
    ssr: false,
  }),
  "dynamic-zone.discover-coins": dynamic(() => import("./coins"), {
    ssr: false,
  }),
  "dynamic-zone.services": dynamic(() => import("./services"), {
    ssr: false,
  }),
  "dynamic-zone.testimonials": dynamic(() => import("./testimonials"), {
    ssr: false,
  }),
  "dynamic-zone.faq": dynamic(() => import("./faq"), {
    ssr: false,
  }),
}

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone }) => {
  return (
    <div>
      {dynamicZone.map((componentData) => {
        const Component = componentMapping[componentData.__component]
        if (!Component) {
          console.warn(`No component found for: ${componentData.__component}`)
          return null
        }
        return <Component key={componentData.id} {...componentData} />
      })}
    </div>
  )
}

export default DynamicZoneManager
