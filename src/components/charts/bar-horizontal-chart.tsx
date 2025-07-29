"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

export const description = "A horizontal bar chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarHorizontal({bartopsuppliers}:{bartopsuppliers:{ supplier:string , total_spent :string}[]
}) {
  const [longestTick, setLongestTick] = useState("");
  const getYAxisTickWidth = (): number => {
    const charWidth = 9;
    return longestTick.length * charWidth + 15;
  };
  const tickFormatter = (val: string): string => {
    const formattedTick = val;
    if (longestTick.length < formattedTick.length) {
      setLongestTick(formattedTick);
    }
    return formattedTick;
  };
  
   return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={bartopsuppliers}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="total_spent" hide />
            <YAxis
              dataKey="supplier"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
               width={getYAxisTickWidth()}
              tick={{ width: 250 }} // Most important part of whitespace formatting
              tickFormatter={tickFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="supplier" fill="var(--chart-2)" radius={5}>
              <LabelList
                dataKey="total_spent"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChartBarLabelCustom({barTopItems}:{barTopItems :{ item:string , total_spent :string}[]}) {

    const [longestTick, setLongestTick] = useState("");
  const getYAxisTickWidth = (): number => {
    const charWidth = 9;
    return longestTick.length * charWidth + 15;
  };
  const tickFormatter = (val: string): string => {
    const formattedTick = val;
    if (longestTick.length < formattedTick.length) {
      setLongestTick(formattedTick);
    }
    return formattedTick;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent  >
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={barTopItems}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="item"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="total_spent" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="total_spent"
              layout="vertical"
              fill="var(--chart-5)"
              radius={4}
            >
              <LabelList
                dataKey="item"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="total_spent"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this item <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 items
        </div>
      </CardFooter>
    </Card>
  );
}
