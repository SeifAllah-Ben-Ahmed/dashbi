"use client";

import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// TypeScript interfaces for props
interface BaseChartProps {
  title?: string;
  description?: string;
  data: any[];
  width?: number;
  height?: number;
  colors?: string[];
}

interface AreaChartProps extends BaseChartProps {
  type: "area";
  xKey: string;
  yKey: string;
  fillOpacity?: number;
}

interface BarChartProps extends BaseChartProps {
  type: "bar";
  xKey: string;
  yKey: string;
  layout?: "horizontal" | "vertical";
}

interface LineChartProps extends BaseChartProps {
  type: "line";
  xKey: string;
  yKey: string;
  strokeWidth?: number;
}

interface PieChartProps extends BaseChartProps {
  type: "pie";
  nameKey: string;
  valueKey: string;
  innerRadius?: number;
  outerRadius?: number;
}

interface RadarChartProps extends BaseChartProps {
  type: "radar";
  angleKey: string;
  radiusKey: string;
}

interface RadialChartProps extends BaseChartProps {
  type: "radial";
  angleKey: string;
  valueKey: string;
  innerRadius?: number;
  outerRadius?: number;
}

interface TableProps extends BaseChartProps {
  type: "table";
  columns: string[];
}

interface TextCardProps {
  type: "text";
  title?: string;
  description?: string;
  content: string;
  variant?: "default" | "destructive" | "outline" | "secondary";
}

type ChartProps =
  | AreaChartProps
  | BarChartProps
  | LineChartProps
  | PieChartProps
  | RadarChartProps
  | RadialChartProps
  | TableProps
  | TextCardProps;

export default function DynamicChart(props: ChartProps) {
  const defaultColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#00ff00",
    "#ff00ff",
  ];

  const renderChart = () => {
    const colors =
      "colors" in props ? props.colors || defaultColors : defaultColors;
    const width = "width" in props ? props.width || 600 : 600;
    const height = "height" in props ? props.height || 400 : 400;

    switch (props.type) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={props.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey={props.yKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={props.fillOpacity || 0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={props.data} layout={props.layout || "vertical"}>
              <CartesianGrid strokeDasharray="3 3" />
              {props.layout === "horizontal" ? (
                <>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey={props.xKey} />
                </>
              ) : (
                <>
                  <XAxis dataKey={props.xKey} />
                  <YAxis />
                </>
              )}
              <Tooltip />
              <Legend />
              <Bar dataKey={props.yKey} fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={props.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={props.xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={props.yKey}
                stroke={colors[0]}
                strokeWidth={props.strokeWidth || 2}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={props.data}
                dataKey={props.valueKey}
                nameKey={props.nameKey}
                cx="50%"
                cy="50%"
                innerRadius={props.innerRadius || 0}
                outerRadius={props.outerRadius || 80}
                fill="#8884d8"
              >
                {props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadarChart data={props.data}>
              <PolarGrid />
              <PolarAngleAxis dataKey={props.angleKey} />
              <PolarRadiusAxis />
              <Radar
                name="Value"
                dataKey={props.radiusKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );

      case "radial":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadialBarChart
              data={props.data}
              innerRadius={props.innerRadius || 20}
              outerRadius={props.outerRadius || 140}
            >
              <RadialBar
                dataKey={props.valueKey}
                cornerRadius={4}
                fill={colors[0]}
              />
              <Tooltip />
              <Legend />
            </RadialBarChart>
          </ResponsiveContainer>
        );

      case "table":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {props.columns.map((column) => (
                    <th
                      key={column}
                      className="border border-gray-300 px-4 py-2 text-left font-semibold"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.data.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {props.columns.map((column) => (
                      <td
                        key={column}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "text":
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{props.content}</p>
          </div>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        {(props.title || props.description) && (
          <>
            {props.title && <CardTitle>{props.title}</CardTitle>}
            {props.description && (
              <CardDescription>{props.description}</CardDescription>
            )}
          </>
        )}
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}

// Example usage with sample data
const ExampleCharts = () => {
  const sampleData = [
    { name: "Jan", value: 400, sales: 240 },
    { name: "Feb", value: 300, sales: 139 },
    { name: "Mar", value: 200, sales: 980 },
    { name: "Apr", value: 278, sales: 390 },
    { name: "May", value: 189, sales: 480 },
  ];

  const pieData = [
    { name: "Desktop", value: 400 },
    { name: "Mobile", value: 300 },
    { name: "Tablet", value: 200 },
  ];

  const radarData = [
    { subject: "Math", A: 120, B: 110, fullMark: 150 },
    { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
    { subject: "English", A: 86, B: 130, fullMark: 150 },
    { subject: "Geography", A: 99, B: 100, fullMark: 150 },
    { subject: "Physics", A: 85, B: 90, fullMark: 150 },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Dynamic Chart Component Examples
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DynamicChart
          type="area"
          title="Area Chart"
          description="Monthly sales data"
          data={sampleData}
          xKey="name"
          yKey="value"
          colors={["#8884d8"]}
        />

        <DynamicChart
          type="bar"
          title="Bar Chart"
          description="Monthly performance"
          data={sampleData}
          xKey="name"
          yKey="sales"
          colors={["#82ca9d"]}
        />

        <DynamicChart
          type="line"
          title="Line Chart"
          description="Trend analysis"
          data={sampleData}
          xKey="name"
          yKey="value"
          colors={["#ffc658"]}
          strokeWidth={3}
        />

        <DynamicChart
          type="pie"
          title="Pie Chart"
          description="Device usage distribution"
          data={pieData}
          nameKey="name"
          valueKey="value"
          colors={["#8884d8", "#82ca9d", "#ffc658"]}
        />

        <DynamicChart
          type="radar"
          title="Radar Chart"
          description="Performance metrics"
          data={radarData}
          angleKey="subject"
          radiusKey="A"
          colors={["#8884d8"]}
        />

        <DynamicChart
          type="radial"
          title="Radial Bar Chart"
          description="Circular progress"
          data={pieData}
          angleKey="name"
          valueKey="value"
          colors={["#ff7300"]}
        />
      </div>

      <DynamicChart
        type="table"
        title="Data Table"
        description="Sample data in table format"
        data={sampleData}
        columns={["name", "value", "sales"]}
      />

      <DynamicChart
        type="text"
        title="Text Card"
        description="Information display"
        content="This is a text card component that can display formatted text content. It supports markdown-like formatting and can be used to show descriptions, notes, or any textual information alongside your charts."
      />
    </div>
  );
};
