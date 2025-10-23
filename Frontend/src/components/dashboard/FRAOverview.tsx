import React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { Badge } from "../ui/badge";

export interface FRAOverviewProps {
  potentialFRA: number;
  grantedFRA: number;
  title?: string;
  className?: string;
}

export const FRAOverview: React.FC<FRAOverviewProps> = ({
  potentialFRA,
  grantedFRA,
  title = "FRA Overview",
  className,
}) => {
  const coverage = potentialFRA > 0 ? (grantedFRA / potentialFRA) * 100 : 0;
  const remaining = Math.max(potentialFRA - grantedFRA, 0);

  return (
    <Card className={clsx(className)}>

      <CardHeader className="pb-3 flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            <CardTitle className="text-lg font-semibold">
              {title}
            </CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs font-normal">
            <TrendingUp className="h-3 w-3 mr-1" />
            +5.2%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 h-full">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[#1E88E5]">
                Potential FRA
              </div>
              <div className="mt-1 text-2xl font-bold text-[#1E88E5] tabular-nums">
                {potentialFRA.toLocaleString()}
              </div>
              <div className="text-[10px] text-blue-500">hectares</div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#1E88E3]/70 backdrop-blur-sm shadow ring-2 ring-white" />
            </div>

            <div className="relative rounded-lg border border-green-100 bg-gradient-to-br from-green-50 to-white p-3">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[#388E3C]">
                Granted FRA
              </div>
              <div className="mt-1 text-2xl font-bold text-[#388E3C] tabular-nums">
                {grantedFRA.toLocaleString()}
              </div>
              <div className="text-[10px] text-green-600">hectares</div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#388E3C]/70 backdrop-blur-sm shadow ring-2 ring-white" />
            </div>
          </div>

          {/* Circular Coverage */}
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  strokeDasharray="98"
                  strokeLinecap="round"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="url(#gradCoverage)"
                  strokeWidth="3.2"
                  strokeDasharray={`${(coverage / 100) * 98} 98`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 0.6s ease" }}
                />
                <defs>
                  <linearGradient
                    id="gradCoverage"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#388E3C" />
                    <stop offset="100%" stopColor="#66BB6A" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-medium text-gray-500 leading-none">
                  Coverage
                </span>
                <span className="text-lg font-semibold text-[#388E3C] leading-tight">
                  {coverage.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 flex flex-col gap-3">
              <div>
                <div className="flex items-center justify-between text-[11px] text-gray-600 mb-1">
                  <span>Progress to Potential</span>
                  <span className="font-semibold text-[#388E3C]">
                    {grantedFRA.toLocaleString()} /{" "}
                    {potentialFRA.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded bg-gradient-to-r from-[#388E3C] to-[#66BB6A]"
                    style={{ width: `${coverage}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2 text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#388E3C]" /> Granted
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#F4511E]" />{" "}
                  Remaining
                </span>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="mt-1 text-[11px] text-gray-600 bg-gray-50 border border-gray-100 rounded-md px-3 py-2 flex items-center gap-2">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#8E24AA]/20 text-[#8E24AA] text-[9px] font-bold">
              i
            </span>
            <span className="leading-snug">
              {remaining.toLocaleString()} ha still to recognise.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FRAOverview;
