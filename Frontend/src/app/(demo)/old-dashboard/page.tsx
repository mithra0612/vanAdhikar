import React from "react";
import {
  Users,
  Home,
  Group,
  BadgeCheck,
  Map,
  PieChart,
  Percent,
  TrendingUp,
  Award,
  BarChart3,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BarGraph from "@/components/dashboard/BarGraph";
import LineChart from "@/components/dashboard/LineChart";
import PieChartOne from "@/components/dashboard/PieChartOne";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import FRAOverview from "@/components/dashboard/FRAOverview";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { RoundedPieChart } from "@/components/dashboard/evil-pieChart";
import { Badge } from "@/components/ui/badge";
import { AssetsPolarAreaChart } from "@/components/dashboard/radar";
import { IncreaseSizePieChart } from "@/components/dashboard/evil-pieChart2";
import SearchNavbar from "@/components/dashboard/header/headerSearch";

export default function DashboardPage() {
  // FRA metrics
  const potentialFRA = 12500;
  const grantedFRA = 8700;
  const coverage = (grantedFRA / potentialFRA) * 100;

  return (
    <ContentLayout title="Dashboard">
      <SearchNavbar />
      <Breadcrumb className="my-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        {/* KPI Cards Row */}
        <div className="flex gap-2 items-stretch h-[110px]">
          {/* Tribal Population */}
          <div className="w-[20%] min-w-0 flex flex-col h-full">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-center">
              <CardHeader className="pb-3 h-full flex flex-col justify-center">
                <div className="flex items-center gap-4 h-full">
                  <div className="flex items-center justify-center h-14 w-14 bg-emerald-50 rounded-lg">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium text-muted-foreground">
                      Tribal Population
                    </CardTitle>
                    <div className="text-2xl font-bold text-foreground mt-1">
                      45,678
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Communities */}
          <div className="w-[20%] min-w-0 flex flex-col h-full">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-center">
              <CardHeader className="pb-3 h-full flex flex-col justify-center">
                <div className="flex items-center gap-4 h-full">
                  <div className="flex items-center justify-center h-14 w-14 bg-violet-50 rounded-lg">
                    <Group className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium text-muted-foreground">
                      Communities
                    </CardTitle>
                    <div className="text-2xl font-bold text-foreground mt-1">
                      12
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Village Name */}
          <div className="w-[20%] min-w-0 flex flex-col h-full">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-center">
              <CardHeader className="pb-3 h-full flex flex-col justify-center">
                <div className="flex items-center gap-4 h-full">
                  <div className="flex items-center justify-center h-14 w-14 bg-blue-50 rounded-lg">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium text-muted-foreground">
                      Village Name
                    </CardTitle>
                    <div className="text-2xl font-bold text-foreground mt-1">
                      Rampur
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Schemes Implemented */}
          <div className="w-[20%] min-w-0 flex flex-col h-full">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-center">
              <CardHeader className="pb-3 h-full flex flex-col justify-center">
                <div className="flex items-center gap-4 h-full">
                  <div className="flex items-center justify-center h-14 w-14 bg-amber-50 rounded-lg">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium text-muted-foreground">
                      Active Schemes
                    </CardTitle>
                    <div className="text-2xl font-bold text-foreground mt-1">
                      3
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Total Claims Processed */}
          <div className="w-[20%] min-w-0 flex flex-col h-full">
            <Card className="bg-card shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col justify-center">
              <CardHeader className="pb-3 h-full flex flex-col justify-center">
                <div className="flex items-center gap-4 h-full">
                  <div className="flex items-center justify-center h-14 w-14 bg-lime-50 rounded-lg">
                    <Percent className="h-6 w-6 text-lime-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium text-muted-foreground">
                      Total Claims
                    </CardTitle>
                    <div className="text-2xl font-bold text-foreground mt-1">
                      9,947
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Main Analytics Row */}
        <div className="hidden lg:flex gap-3">
          {/* Map Section */}
          <div className="w-[40%] min-w-0">
            <Card className="bg-card shadow-sm h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-50 rounded-lg">
                    <Map className="h-5 w-5 text-cyan-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Geographic Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center text-muted-foreground border border-dashed">
                  <div className="text-center">
                    <Map className="h-8 w-8 mx-auto mb-2 text-muted-foreground/60" />
                    <p className="text-sm">Interactive Map Preview</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Community Distribution */}
          <div className="w-[30%] min-w-0">
            <Card className="bg-card shadow-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-rose-50 rounded-lg">
                      <PieChart className="h-5 w-5 text-rose-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">Community Distribution</CardTitle>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <CardDescription></CardDescription>
                  <Badge
                    variant="outline"
                    className="text-green-500 bg-green-500/10 border-none"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>5.2%</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <RoundedPieChart />
              </CardContent>
            </Card>
          </div>

          {/* Asset Distribution */}
          <div className="w-[30%] min-w-0">
            <Card className="bg-card shadow-sm h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Asset Distribution</CardTitle>
                </div>

                <div className="flex items-center justify-between">
                  <CardDescription></CardDescription>
                  <Badge
                    variant="outline"
                    className="text-green-500 bg-green-500/10 border-none"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>5.2%</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 px-4">
                <AssetsPolarAreaChart />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Analytics Row */}
        <div className="hidden lg:flex gap-3">
          {/* Claims Trend */}
          <div className="w-[40%] min-w-0">
            <Card className="bg-card shadow-sm h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    Claims & Approval Trends
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    {
                      id: "Claims",
                      data: [
                        { x: "2020", y: 18, rejection: 10, pending: 72 },
                        { x: "2021", y: 24, rejection: 15, pending: 61 },
                        { x: "2022", y: 30, rejection: 12, pending: 58 },
                        { x: "2023", y: 38, rejection: 20, pending: 42 },
                        { x: "2024", y: 45, rejection: 18, pending: 37 },
                        { x: "2025", y: 55, rejection: 25, pending: 20 },
                      ],
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </div>

          {/* FRA Overview */}
          <div className="w-[30%] min-w-0">
            <FRAOverview
              className="h-full"
              potentialFRA={potentialFRA}
              grantedFRA={grantedFRA}
            />
          </div>

          {/* Claims by Category */}
          <div className="w-[30%] min-w-0">
            <Card className="bg-card shadow-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <PieChart className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">Claims by Category</CardTitle>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <CardDescription></CardDescription>
                  <Badge
                    variant="outline"
                    className="text-green-500 bg-green-500/10 border-none"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>5.2%</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <IncreaseSizePieChart />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="lg:hidden flex flex-col md:flex-row gap-3">
          {/* Claims Trend */}
          <div className="w-full md:w-[40%] min-w-0">
            <Card className="bg-card shadow-sm h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    Claims & Approval Trends
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    {
                      id: "Claims",
                      data: [
                        { x: "2020", y: 18, rejection: 10, pending: 72 },
                        { x: "2021", y: 24, rejection: 15, pending: 61 },
                        { x: "2022", y: 30, rejection: 12, pending: 58 },
                        { x: "2023", y: 38, rejection: 20, pending: 42 },
                        { x: "2024", y: 45, rejection: 18, pending: 37 },
                        { x: "2025", y: 55, rejection: 25, pending: 20 },
                      ],
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </div>

          {/* FRA Overview */}
          <div className="w-full md:w-[30%] min-w-0">
            <FRAOverview
              className="h-full"
              potentialFRA={potentialFRA}
              grantedFRA={grantedFRA}
            />
          </div>

          {/* Claims by Category */}
          <div className="w-full md:w-[30%] min-w-0">
            <Card className="bg-card shadow-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <PieChart className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold">Claims by Category</CardTitle>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <CardDescription></CardDescription>
                  <Badge
                    variant="outline"
                    className="text-green-500 bg-green-500/10 border-none"
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>5.2%</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <IncreaseSizePieChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

