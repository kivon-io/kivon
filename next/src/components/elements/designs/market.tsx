"use client"

import { Area, AreaChart } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A simple area chart"

const chartData = [
  { month: "January", price: 50 },
  { month: "February", price: 100 },
  { month: "March", price: 90 },
  { month: "April", price: 200 },
  { month: "May", price: 120 },
  { month: "June", price: 300 },
]

const chartConfig = {
  price: {
    label: "BTC",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaDefault() {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        {/* <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} /> */}
        <Area
          dataKey='price'
          type='natural'
          fill='var(--chart-1) '
          fillOpacity={0.4}
          stroke='var(--chart-1)'
        />
      </AreaChart>
    </ChartContainer>
  )
}
