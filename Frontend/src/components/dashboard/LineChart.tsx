"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with a label";

// Default fallback data (used when no data prop provided)
const defaultChartData: SeriesPoint[] = [
  { x: "2020", y: 20, rejection: 80, pending: 0 },
  { x: "2021", y: 25, rejection: 75, pending: 0 },
  { x: "2022", y: 28, rejection: 72, pending: 0 },
  { x: "2023", y: 35, rejection: 65, pending: 0 },
  { x: "2024", y: 30, rejection: 70, pending: 0 },
  { x: "2025", y: 60, rejection: 40, pending: 0 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

// Accept data prop shaped like: [{ id: string; data: { x: string; y: number }[] }]
interface SeriesPoint {
  x: string;
  y: number;
  rejection?: number;
  pending?: number;
}
interface Series {
  id: string;
  data: SeriesPoint[];
}
interface Props {
  data?: Series[];
}

export default function CustomLineChart({ data }: Props) {
  // If consumer passes grouped series, flatten first series for now (single line). Could be expanded later.
  const activeSeries =
    data && data.length > 0 ? data[0].data : defaultChartData;
  // Add rejection rate to each data point if not present
  const chartDataWithRejection = activeSeries.map((point) => {
    const rejection =
      typeof point.rejection === "number" ? point.rejection : 100 - point.y;
    const pending =
      typeof point.pending === "number"
        ? point.pending
        : 100 - point.y - rejection;
    return {
      ...point,
      rejection,
      pending,
    };
  });

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        data={chartDataWithRejection}
        height={400}
        // margin={{
        //   top: 25,
        //   left: 20,
        //   right: 20,
        // }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{
            value: "Rate (%)",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
        />
        <XAxis
          dataKey="x"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            typeof value === "string" ? value.slice(0, 4) : ""
          }
        />
        {/* Add legend here */}
        <Legend
          payload={[
            { value: "Approval Rate", type: "line", color: "#1E88E5" },
            { value: "Rejection Rate", type: "line", color: "#E53935" },
            { value: "Pending Rate", type: "line", color: "#FBC02D" },
          ]}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--chart-tooltip-cursor)", strokeWidth: 1 }}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(value, name) => {
                if (name === "y") return [`Approval Rate: ${value}%`];
                if (name === "rejection") return [`Rejection Rate: ${value}%`];
                if (name === "pending") return [`Pending Rate: ${value}%`];
                return [value];
              }}
            />
          }
        />
        <Line
          dataKey="y"
          type="natural"
          stroke="#1E88E5"
          strokeWidth={4}
          dot={{
            fill: "#fff",
            stroke: "#1E88E5",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 6,
            fill: "#fff",
            stroke: "#1E88E5",
            strokeWidth: 2,
          }}
        />
        {/* New line for rejection rate in red */}
        <Line
          dataKey="rejection"
          type="natural"
          stroke="#E53935"
          strokeWidth={4}
          dot={{
            fill: "#fff",
            stroke: "#E53935",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 6,
            fill: "#fff",
            stroke: "#E53935",
            strokeWidth: 2,
          }}
        />
        {/* New line for pending rate in yellow */}
        <Line
          dataKey="pending"
          type="natural"
          stroke="#FBC02D"
          strokeWidth={4}
          dot={{
            fill: "#fff",
            stroke: "#FBC02D",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 6,
            fill: "#fff",
            stroke: "#FBC02D",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
