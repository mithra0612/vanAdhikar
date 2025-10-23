"use client";

import { LabelList, Legend, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export const description = "A pie chart with a label list";

const chartData = [
    { community: "Gond", count: 120, fill: "var(--color-chrome)" },
    { community: "Santhal", count: 95, fill: "var(--color-safari)" },
    { community: "Bhil", count: 80, fill: "var(--color-firefox)" },
    { community: "Oraon", count: 60, fill: "var(--color-edge)" },
    { community: "Munda", count: 45, fill: "var(--color-other)" },
];

const chartConfig = {
    count: {
        label: "Count",
    },
    chrome: {
        label: "Gond",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Santhal",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Bhil",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Oraon",
        color: "var(--chart-4)",
    },
    other: {
        label: "Munda",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export function RoundedPieChart() {
    return (
        <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background h-full w-full min-h-[280px] sm:min-h-[320px]"
        >
                <PieChart width={300} height={300}>
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                nameKey="community"
                                hideLabel={true}
                            />
                        }
                    />
                <Pie
                    data={chartData}
                    innerRadius={30}
                    dataKey="count"
                    nameKey="community"
                    radius={10}
                    outerRadius={100}
                    cornerRadius={8}
                    paddingAngle={4}
                >
                    <LabelList
                        dataKey="count"
                        stroke="none"
                        fontSize={12}
                        fontWeight={500}
                        fill="currentColor"
                        formatter={(value: number) => value.toString()}
                        position="inside"
                    />
                </Pie>
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                        fontSize: "12px",
                        fontWeight: "500",
                        paddingTop: "10px",
                    }}
                />
            </PieChart>
        </ChartContainer>
    );
}
