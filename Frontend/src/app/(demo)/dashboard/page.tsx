"use client";

import React from "react";
import {
  Users,
  Home,
  Group,
  Map,
  PieChart,
  Percent,
  TrendingUp,
  Award,
  BarChart3,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/dashboard/LineChart";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import FRAOverview from "@/components/dashboard/FRAOverview";
import { RoundedPieChart } from "@/components/dashboard/evil-pieChart";
import { Badge } from "@/components/ui/badge";
import { AssetsPolarAreaChart } from "@/components/dashboard/radar";
import { IncreaseSizePieChart } from "@/components/dashboard/evil-pieChart2";
import SearchNavbar from "@/components/dashboard/header/headerSearch";
import Image from "next/image";
import dashboardMapImage from "../../../../public/images/maps/dashboardMap.png";

export default function DashboardPage() {
  const [dashboardLoading, setDashboardLoading] = React.useState(false);

  // Store dashboard data in state
  const [dashboardData, setDashboardData] = React.useState({
    tribalPopulation: 45678,
    communities: 12,
    villageName: "Rampur",
    activeSchemes: 3,
    totalClaims: 9947,
    potentialFRA: 12500,
    grantedFRA: 8700,
    lineChartData: [
      { x: "2020", y: 18, rejection: 10, pending: 72 },
      { x: "2021", y: 24, rejection: 15, pending: 61 },
      { x: "2022", y: 30, rejection: 12, pending: 58 },
      { x: "2023", y: 38, rejection: 20, pending: 42 },
      { x: "2024", y: 45, rejection: 18, pending: 37 },
      { x: "2025", y: 55, rejection: 25, pending: 20 },
    ],
  });

  const handleDashBoardLoading = () => {
    console.log("Dashboard loading triggered");
    setDashboardLoading(true);

    // Simulate fetching new data after search
    setTimeout(() => {
      setDashboardData({
        tribalPopulation: 47200,
        communities: 14,
        villageName: "Auliraipara",
        activeSchemes: 5,
        totalClaims: 10234,
        potentialFRA: 13500,
        grantedFRA: 9200,
        lineChartData: [
          { x: "2020", y: 20, rejection: 12, pending: 68 },
          { x: "2021", y: 28, rejection: 16, pending: 56 },
          { x: "2022", y: 35, rejection: 14, pending: 51 },
          { x: "2023", y: 42, rejection: 22, pending: 36 },
          { x: "2024", y: 50, rejection: 20, pending: 30 },
          { x: "2025", y: 60, rejection: 28, pending: 12 },
        ],
      });
      setDashboardLoading(false);
    }, 3000);
  };

  return (
    <ContentLayout title="Dashboard">
      <SearchNavbar handleDashBoardLoading={handleDashBoardLoading} />

      <div className="relative mt-5">
        {/* Loading Overlay */}
        {dashboardLoading && (
          <div className="absolute inset-0 z-50 flex justify-center bg-background/80 backdrop-blur-xs rounded-lg min-h-screen">
            <div className="flex flex-col align-middle items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Loading dashboard...
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div
          className={`space-y-3 transition-all duration-200 ${
            dashboardLoading ? "pointer-events-none" : ""
          }`}
        >
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Tribal Population */}
            <div className="bg-card rounded-xl border py-3 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Tribal Population
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {dashboardData.tribalPopulation}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-md">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Communities */}
            <div className="bg-card rounded-xl border py-3 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Communities
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {dashboardData.communities}
                    </p>
                  </div>
                  <div className="p-2 bg-violet-50 rounded-md">
                    <Group className="h-4 w-4 text-violet-600" />
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Village Name */}
            <div className="bg-card rounded-xl border py-3 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Village Name
                    </p>
                    <p className="text-xl font-semibold tracking-tight">
                      {dashboardData.villageName}
                    </p>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-md">
                    <Home className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Active Schemes */}
            <div className="bg-card rounded-xl border py-3 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Active Schemes
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {dashboardData.activeSchemes}
                    </p>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-md">
                    <Award className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </div>

            {/* Total Claims */}
            <div className="bg-card rounded-xl border py-3 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Total Claims
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {dashboardData.totalClaims}
                    </p>
                  </div>
                  <div className="p-2 bg-rose-50 rounded-md">
                    <Percent className="h-4 w-4 text-rose-600" />
                  </div>
                </div>
              </CardContent>
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-6">
              <Card className="h-full">
                <CardHeader className="pb-4 space-y-0">
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                      Geographic Overview
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-72 bg-slate-50 rounded border border-dashed border-slate-200 flex items-center justify-center">
                    {/* <div className="text-center space-y-2">
                      <Map className="h-8 w-8 mx-auto text-slate-400" />
                      <p className="text-sm text-muted-foreground">
                        Map visualization
                      </p>
                    </div> */}
                    <Image 
                      src={dashboardMapImage} 
                      alt="Geographic distribution map of tribal communities"
                      className="w-full h-full object-cover rounded-md"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Community Distribution */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                      Community Distribution
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs font-normal">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2%
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Force remount for animation */}
                  <RoundedPieChart
                    key={dashboardLoading ? "loading" : Date.now()}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Asset Distribution */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                      Asset Distribution
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs font-normal">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2%
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <AssetsPolarAreaChart
                    key={dashboardLoading ? "loading" : Date.now()}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-4">
              <FRAOverview
                className="h-full"
                potentialFRA={dashboardData.potentialFRA}
                grantedFRA={dashboardData.grantedFRA}
                key={dashboardLoading ? "loading" : Date.now()}
              />
            </div>

            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                      Claims by Category
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs font-normal">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2%
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <IncreaseSizePieChart
                    key={dashboardLoading ? "loading" : Date.now()}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                      Claims & Approval Trends
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <LineChart
                    key={dashboardLoading ? "loading" : Date.now()}
                    data={[
                      {
                        id: "Claims",
                        data: dashboardData.lineChartData.map((d) => ({
                          x: d.x,
                          y: d.y,
                          rejection: d.rejection,
                          pending: d.pending,
                        })),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
