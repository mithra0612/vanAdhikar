"use client";

import { LabelList, Pie, PieChart, Cell, Legend } from "recharts";

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
import { TrendingDown } from "lucide-react";

const chartData = [
    { browser: "IFR", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "CR", visitors: 200, fill: "var(--color-safari)" },
    { browser: "CFR", visitors: 187, fill: "var(--color-firefox)" },
];

// Sort the data by visitors in ascending order (smallest to largest) it will make graph look better
const sortedChartData = [...chartData].sort((a, b) => a.visitors - b.visitors);

// Configure the size increase between each pie ring
const BASE_RADIUS = 50; // Starting radius for the smallest pie
const SIZE_INCREMENT = 10; // How much to increase radius for each subsequent pie

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export function IncreaseSizePieChart() {
    return (

        <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
            <PieChart width={600} height={600}>
                <ChartTooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const entry = payload[0].payload;
                            return (
                                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', padding: '12px 16px', color: '#222' }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                                        {entry.browser} <span style={{ marginLeft: 8 }}>{entry.visitors}</span>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                {sortedChartData.map((entry, index) => (
                    <Pie
                        key={`pie-${index}`}
                        data={[entry]}
                        innerRadius={30}
                        outerRadius={BASE_RADIUS + index * SIZE_INCREMENT}
                        dataKey="visitors"
                        cornerRadius={4}
                        startAngle={
                            // Calculate the percentage of total visitors up to current index
                            (sortedChartData
                                .slice(0, index)
                                .reduce((sum, d) => sum + d.visitors, 0) /
                                sortedChartData.reduce((sum, d) => sum + d.visitors, 0)) *
                            360
                        }
                        endAngle={
                            // Calculate the percentage of total visitors up to and including current index
                            (sortedChartData
                                .slice(0, index + 1)
                                .reduce((sum, d) => sum + d.visitors, 0) /
                                sortedChartData.reduce((sum, d) => sum + d.visitors, 0)) *
                            360
                        }
                    >
                        <Cell fill={entry.fill} />
                        <LabelList
                            dataKey="visitors"
                            stroke="none"
                            fontSize={12}
                            fontWeight={500}
                            fill="currentColor"
                            formatter={(value: number) => value.toString()}
                        />
                    </Pie>

                ))}
                <Legend
                    verticalAlign="bottom"
                    align="center"
                    layout="horizontal"
                    iconType="circle"
                    wrapperStyle={{
                        fontSize: "12px",
                        fontWeight: "500"
                    }}
                    payload={[
                        { value: "IFR", type: "circle", color: "var(--color-chrome)" },
                        { value: "CR", type: "circle", color: "var(--color-safari)" },
                        { value: "CFR", type: "circle", color: "var(--color-firefox)" }
                    ]}
                />
            </PieChart>
        </ChartContainer>

    );
}
