"use client"

import { TrendingUp } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple pie chart"

 


export function ChartPieSimple({data}:{data:{category:string,total_spent:string}[]}) {

 
const chartConfig = {
  total_spent: {
    label: "total_spent",
  },
   "Accessoire": {
    label: "Accessoire",
    color: "var(--chart-1)",
  },
  "Matière_1ère": {
    label: "Matière 1ère",
    color: "var(--chart-2)",
  },
  
 } satisfies ChartConfig

  const dataChart = data.map((item)=>({
    category: item.category.split(' ').join("_"),
    total_spent: Number(item.total_spent),
    fill:`var(--color-${item.category.split(' ').join("_")})`
  }))
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 5 items</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={dataChart} dataKey="total_spent" nameKey="category" >
                 {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={`var(--chart-${index+1})`} />
        ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total_spent for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
