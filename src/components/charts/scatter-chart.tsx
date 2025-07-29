"use client";

import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { x: 10, y: 20, size: 400, category: "A" },
  { x: 15, y: 35, size: 600, category: "A" },
  { x: 20, y: 45, size: 800, category: "A" },
  { x: 25, y: 55, size: 300, category: "A" },
  { x: 30, y: 65, size: 900, category: "A" },
  { x: 35, y: 75, size: 500, category: "A" },
  { x: 40, y: 85, size: 1200, category: "A" },
  { x: 12, y: 25, size: 350, category: "B" },
  { x: 18, y: 30, size: 450, category: "B" },
  { x: 22, y: 40, size: 650, category: "B" },
  { x: 28, y: 50, size: 750, category: "B" },
  { x: 32, y: 60, size: 550, category: "B" },
  { x: 38, y: 70, size: 850, category: "B" },
  { x: 42, y: 80, size: 1000, category: "B" },
  { x: 14, y: 15, size: 200, category: "C" },
  { x: 19, y: 25, size: 400, category: "C" },
  { x: 24, y: 35, size: 600, category: "C" },
  { x: 29, y: 45, size: 300, category: "C" },
  { x: 34, y: 55, size: 700, category: "C" },
  { x: 39, y: 65, size: 500, category: "C" },
  { x: 44, y: 75, size: 900, category: "C" },
];

interface DataPoint {
  x: number;
  y: number;
  size: number;
  category: string;
}

interface ShapeProps {
  cx: number;
  cy: number;
  fill: string;
  payload: DataPoint;
}

export default function ScatterCharts() {
  const calculateDotSize = (size: number) => {
    // Scale the size to a reasonable range for visualization (20-120 pixels)
    const minSize = 20;
    const maxSize = 120;
    const minData = Math.min(...data.map((d) => d.size));
    const maxData = Math.max(...data.map((d) => d.size));

    return (
      minSize + ((size - minData) / (maxData - minData)) * (maxSize - minSize)
    );
  };

  const renderCustomShape = (props: ShapeProps) => {
    const size = calculateDotSize(props.payload.size);
    return (
      <circle
        cx={props.cx}
        cy={props.cy}
        r={size / 2}
        fill={props.fill}
        fillOpacity={0.7}
        stroke={props.fill}
        strokeWidth={2}
      />
    );
  };
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales Performance Analysis</CardTitle>
        <CardDescription>
          Marketing Spend vs Revenue Generated (Bubble size represents Customer
          Count)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={{
            categoryA: {
              label: "Product A",
              color: "var(--chart-1)",
            },
            categoryB: {
              label: "Product B",
              color: "var(--chart-2)",
            },
            categoryC: {
              label: "Product C",
              color: "var(--chart-3)",
            },
          }}
          className="mx-auto aspect-square"
        >
          <ScatterChart accessibilityLayer data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Marketing Spend"
              unit="k"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Revenue"
              unit="k"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value, payload) => {
                    if (payload && payload[0]) {
                      const data = payload[0].payload as DataPoint;
                      return `Product ${data.category} • ${data.size} customers`;
                    }
                    return "";
                  }}
                  formatter={(value, name) => [
                    `$${value}k`,
                    name === "x" ? "Marketing Spend" : "Revenue",
                  ]}
                />
              }
            />
            <Scatter
              dataKey="y"
              fill="var(--color-categoryA)"
              data={data.filter((d) => d.category === "A")}
              name="Product A"
              shape={renderCustomShape}
            />
            <Scatter
              dataKey="y"
              fill="var(--color-categoryB)"
              data={data.filter((d) => d.category === "B")}
              name="Product B"
              shape={renderCustomShape}
            />
            <Scatter
              dataKey="y"
              fill="var(--color-categoryC)"
              data={data.filter((d) => d.category === "C")}
              name="Product C"
              shape={renderCustomShape}
            />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
