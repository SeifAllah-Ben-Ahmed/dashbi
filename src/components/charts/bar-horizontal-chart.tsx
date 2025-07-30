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
    supplier?: string;
    category?: string;
    total_spent: number;
  }[];
}) {
  // Support both 'category' and 'supplier' keys for Y axis
  const yKey =
    bartopsuppliers && bartopsuppliers.length > 0
      ? bartopsuppliers[0].category !== undefined
        ? "category"
        : "supplier"
      : "supplier";
  const longestTick = useMemo(() => {
    if (!bartopsuppliers || bartopsuppliers.length === 0) return "";
    return bartopsuppliers.reduce((max, curr) => {
      const label = curr.category ?? curr.supplier ?? "";
      return label.length > max.length ? label : max;
    }, "");
  }, [bartopsuppliers]);

  const getYAxisTickWidth = () => {
    const charWidth = 9;
    if (!longestTick || typeof longestTick !== "string") return 50;
    return longestTick.length * charWidth + 15;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            [yKey]: {
              label: yKey,
              color: "var(--chart-2)",
            },
          }}
        >
          <BarChart accessibilityLayer data={bartopsuppliers} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={yKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
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
              {/* <LabelList
                dataKey="supplier"
                position="left"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              /> */}
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
      <CardContent>
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
