"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Accept the same prop shape previously used: { asset: string; value: number }[]
interface AssetDatum {
  asset: string;
  value: number;
}
interface Props {
  data: AssetDatum[];
}

export const description = "A bar chart with a label";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const BarGraph: React.FC<Props> = ({ data }) => {
  // Use the data prop directly
  const chartData = data?.length
    ? data.map((d) => ({
        asset: d.asset,
        value: d.value,
      }))
    : [];

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <ChartContainer
        config={chartConfig}
        style={{ width: "100%", height: "100%" }}
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
          }}
          width="100%"
          height={350}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="asset"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) =>
              value.length > 9 ? value.slice(0, 8) + "…" : value
            }
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value: number, name: string, props: any) =>
                  `${props.payload.asset}: ${value}`
                }
                hideLabel
              />
            }
          />
          <Bar dataKey="value" fill="var(--chart-1)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarGraph;
