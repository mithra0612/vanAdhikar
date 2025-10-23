"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Leaf, Droplets, Home, Building, Coins } from "lucide-react";

// Register Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface AssetData {
  category: string;
  current: number;
  target: number;
  icon: any;
  color: string;
  bgColor: string;
}

interface PolarAreaChartProps {
  data?: AssetData[];
  className?: string;
}

const defaultData: AssetData[] = [
  {
    category: "Land Assets",
    current: 85,
    target: 95,
    icon: Leaf,
    color: "#22c55e", // Green-500
    bgColor: "rgba(34, 197, 94, 0.2)",
  },
  {
    category: "Forest Rights",
    current: 72,
    target: 90,
    icon: Leaf,
    color: "#16a34a", // Green-600
    bgColor: "rgba(22, 163, 74, 0.2)",
  },
  {
    category: "Water Resources",
    current: 68,
    target: 85,
    icon: Droplets,
    color: "#3b82f6", // Blue-500
    bgColor: "rgba(59, 130, 246, 0.2)",
  },
  {
    category: "Housing",
    current: 78,
    target: 88,
    icon: Home,
    color: "#f59e0b", // Amber-500
    bgColor: "rgba(245, 158, 11, 0.2)",
  },
  {
    category: "Infrastructure",
    current: 65,
    target: 80,
    icon: Building,
    color: "#8b5cf6", // Violet-500
    bgColor: "rgba(139, 92, 246, 0.2)",
  },
  {
    category: "Livelihood Assets",
    current: 70,
    target: 85,
    icon: Coins,
    color: "#ef4444", // Red-500
    bgColor: "rgba(239, 68, 68, 0.2)",
  },
];

export function AssetsPolarAreaChart({ data = defaultData, className }: PolarAreaChartProps) {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: "Current Asset Coverage (%)",
        data: data.map(item => item.current),
        backgroundColor: data.map(item => item.bgColor),
        borderColor: data.map(item => item.color),
        borderWidth: 2,
        hoverBackgroundColor: data.map(item => item.color.replace('1)', '0.4)')),
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    layout: {
      padding: {
        top: 15,
        bottom: 15,
        left: 15,
        right: 15
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the legend since we're creating a custom one
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const dataIndex = context.dataIndex;
            const current = data[dataIndex].current;
            return `Current: ${current}%`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          display: false, // Hide tick values to save space
          backdropColor: 'transparent',
        },
        grid: {
          color: '#e5e7eb',
          lineWidth: 0.5,
        },
        angleLines: {
          color: '#e5e7eb',
          lineWidth: 0.5,
        },
        pointLabels: {
          display: false, // Hide point labels to save space
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  return (
    <div className={`${className} flex flex-col h-full w-full`}>
      <div className="flex-1 w-full flex items-center justify-center pt-2">
        <div className="w-full max-w-[280px] h-[280px]">
          <PolarArea data={chartData} options={options} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-4 gap-y-2 py-3 flex-wrap px-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {item.category.replace(' Assets', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}