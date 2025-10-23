"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { HeaderSummary } from "@/components/personal-information/header-summary";
import { MapGeometry } from "@/components/personal-information/map-geometry";
import { PattaDetails } from "@/components/personal-information/patta-details";
import { ClaimsHistory } from "@/components/personal-information/claims-history";
import { AssetEvidence } from "@/components/personal-information/asset-evidence";
import { SchemesEligibility } from "@/components/personal-information/schemes-eligibility";
import { IoTEnvironment } from "@/components/personal-information/iot-environment";
import { SocioEconomic } from "@/components/personal-information/socio-economic";
import { Documents } from "@/components/personal-information/documents";
import { personalData } from "@/components/personal-information/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PersonalInformationPage() {
  return (
    <>
      <header className="sticky top-0 z-99 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
              <ArrowLeft className="h-8 w-8" />
            </Button>    <div>
              <h1 className="text-xl font-semibold">Individual Details</h1>
            </div>
          </div>
        </div>
      </header>
      <ContentLayout title="Personal Information">
        <Breadcrumb className="mb-4 mt-2">
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Personal Information</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="space-y-4">
          {/* Top Row: Header Summary - Full width but more condensed */}
          <div className="w-full">
            <HeaderSummary data={personalData.headerSummary} />
          </div>

          {/* Main Dashboard Grid - Professional layout with proper alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* First Column */}
            <div className="flex flex-col gap-6">
              <div className="h-[420px]">
                <MapGeometry data={personalData.mapGeometry} />
              </div>
              <div className="h-[320px]">
                <PattaDetails data={personalData.pattaDetails} />
              </div>
              <div className="h-[300px]">
                <AssetEvidence data={personalData.assetEvidence} />
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-6">
              <div className="h-[320px]">
                <ClaimsHistory data={personalData.claimsHistory} />
              </div>
              <div className="h-[360px]">
                <IoTEnvironment data={personalData.iotEnvironment} />
              </div>
              <div className="h-[360px]">
                <SocioEconomic data={personalData.socioEconomic} />
              </div>
            </div>

            {/* Third Column */}
            <div className="flex flex-col gap-6 lg:col-span-2 xl:col-span-1">
              <div className="h-[400px]">
                <SchemesEligibility data={personalData.schemes} />
              </div>
              <div className="h-[640px]">
                <Documents data={personalData.documents} />
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
