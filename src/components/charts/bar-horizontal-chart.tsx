"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
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
import { useMemo, useState } from "react";

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

export function ChartBarHorizontal({
  bartopsuppliers,
}: {
  bartopsuppliers: {
    supplier: string;
    total_spent: number;
  }[];
}) {
  // Support both 'category' and 'supplier' keys for Y axis

  console.log({ bartopsuppliers });

  const maxItemLength = Math.max(
    ...bartopsuppliers.map((item) => item?.supplier?.length)
  );

  const leftMargin = Math.max(100, maxItemLength * 8);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription> </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            supplier: {
              label: "supplier",
              color: "var(--chart-2)",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            data={bartopsuppliers}
            layout="vertical"
            margin={{
              left: leftMargin / 2,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={"supplier"}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
              // hide
            />
            <XAxis type="number" dataKey="total_spent" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="total_spent" fill="var(--chart-2)" radius={4}>
              <LabelList
                dataKey="total_spent"
                position="end"
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

export function ChartBarLabelCustom({
  barTopItems,
}: {
  barTopItems: { item: string; total_spent: string }[];
}) {
  const processedData = barTopItems.map((item) => ({
    ...item,
    total_spent: parseInt(item.total_spent, 10) || 0,
  }));

  // Calculate dynamic dimensions
  const maxItemLength = (key: "total_spent" | "item") =>
    Math.max(...barTopItems.map((item) => item?.[key].length));

  const rightMargin = Math.max(100, maxItemLength("total_spent") * 8);
  const leftMargin = Math.max(100, maxItemLength("item") * 8);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={processedData}
            layout="vertical"
            margin={{
              bottom: 25,
              right: rightMargin, // Space for value labels
              left: 50,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="item"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, textAnchor: "end" }}
              width={leftMargin / 2}
            />
            <XAxis dataKey="total_spent" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="total_spent" fill="var(--chart-5)" radius={4}>
              <LabelList
                dataKey="total_spent"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: string) => `${value}`}
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
