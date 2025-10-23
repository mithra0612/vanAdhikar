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
import { HeaderSummary } from "@/components/community-details/header-summary";
import { MapGeometry } from "@/components/community-details/map-geometry";
import { CommunityMembers } from "@/components/community-details/community-members";
import { CommunityAssets } from "@/components/community-details/community-assets";
import { SchemesEligibility } from "@/components/community-details/schemes-eligibility";
import { IoTEnvironment } from "@/components/community-details/iot-environment";
import { FeedbackParticipation } from "@/components/community-details/feedback-participation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, MapPin, ArrowLeft } from "lucide-react";
import { communityData } from "@/components/community-details/mock-data";
import { Button } from "@/components/ui/button";

export default function CommunityDetailsPage() {
  // In a real application, we would fetch this data from an API
  const {
    headerSummary,
    mapGeometry,
    members,
    assets,
    schemesSummary,
    iotNetwork,
    feedback
  } = communityData;

  return (
    <>
      <header className="sticky top-0 z-99 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
              <ArrowLeft className="h-8 w-8" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Community Details</h1>
            </div>
          </div>
        </div>
      </header>
      <ContentLayout title="Community Details">
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
        <div className="w-full mb-6 mt-2">
          <Card className="bg-background shadow-sm">
            <CardContent className="py-8 px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-5">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Kundiyam Village Community</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800 flex items-center gap-1 px-3 py-1">
                        <CheckCircle className="h-3 w-3" /> Verified
                      </Badge>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Erode, Tamil Nadu</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Community ID: COMM-4567
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-center border-r pr-6">
                    <div className="text-2xl font-bold text-primary">{headerSummary.total_households}</div>
                    <div className="text-sm text-muted-foreground">Households</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{headerSummary.total_members}</div>
                    <div className="text-sm text-muted-foreground">Members</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Row */}
          <div className="flex h-[420px] md:h-[380px] lg:h-[420px]">
            <MapGeometry data={mapGeometry} />
          </div>
          <div className="flex h-[420px] md:h-[380px] lg:h-[420px]">
            <CommunityMembers members={members} />
          </div>
          <div className="flex h-[420px] md:h-[380px] lg:h-[420px]">
            <CommunityAssets data={assets} />
          </div>

          {/* Second Row */}
          <div className="flex h-[420px] md:h-[380px] lg:h-[420px]">
            <SchemesEligibility data={schemesSummary} />
          </div>
          <div className="flex h-[420px] md:h-[380px] lg:h-[420px]">
            <IoTEnvironment
              sensors={iotNetwork.sensor_types.map((type, idx) => ({
                id: `SEN00${idx + 1}`,
                type,
                value: idx === 0 ? iotNetwork.avg_groundwater :
                  idx === 1 ? iotNetwork.monthly_rainfall / 10 :
                    iotNetwork.avg_soil_moisture,
                unit: idx === 0 ? "m" : idx === 1 ? "mm" : "%",
                timestamp: iotNetwork.last_update,
                status: "normal"
              }))}
              devices={[
                {
                  device_id: "DEV001",
                  name: "Weather Station",
                  type: "Environmental",
                  status: iotNetwork.online > 0 ? "online" : "offline",
                  last_reading: iotNetwork.last_update
                },
                {
                  device_id: "DEV002",
                  name: "Water Level Recorder",
                  type: "DWLR",
                  status: iotNetwork.online > 1 ? "online" : "offline",
                  last_reading: iotNetwork.last_update
                }
              ]}
            />
          </div>
          <div className="flex h-[420px] md:h-[380px] lg:h-[420px]">
            <FeedbackParticipation
              feedback={[
                {
                  id: "FB001",
                  type: "Meeting",
                  topic: "Community Forest Management",
                  submitted_by: members[0].name,
                  date: feedback.last_meeting_date,
                  status: "reviewed"
                },
                {
                  id: "FB002",
                  type: "IVR Survey",
                  topic: "Water Access Satisfaction",
                  submitted_by: members[1].name,
                  date: feedback.next_meeting_date,
                  status: "pending",
                  rating: 4
                },
                {
                  id: "FB003",
                  type: "Complaint",
                  topic: "Trail maintenance needed",
                  submitted_by: members[2].name,
                  date: "2023-05-10",
                  status: "resolved"
                }
              ]}
              stats={{
                meetings_attendance: Math.round(feedback.meeting_participation_pct * 0.01 * headerSummary.total_households),
                total_meetings: 15,
                survey_participation: Math.round(feedback.ivr_responses_pct * 0.01 * headerSummary.total_households),
                total_surveys: headerSummary.total_households,
                feedback_submitted: feedback.total_feedback_received,
                community_involvement_score: feedback.meeting_participation_pct
              }}
            />
          </div>

        </div>
      </ContentLayout>
    </>
  );
}
