"use client";

import { Card } from "@/components/ui/card";

export function ComponentsIndex() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Personal Information Page Components</h2>
      <p className="text-muted-foreground mb-6">
        This page displays comprehensive personal information using multiple components. Below is the index of all components used in this page:
      </p>
      <ol className="list-decimal list-inside space-y-2 pl-4">
        <li className="font-medium">Header Summary 
          <p className="text-muted-foreground text-sm ml-6">Displays basic identification with name, ID, location and verification status</p>
        </li>
        <li className="font-medium">Map Geometry
          <p className="text-muted-foreground text-sm ml-6">Shows land parcel geometry on a map with satellite imagery</p>
        </li>
        <li className="font-medium">Patta Details
          <p className="text-muted-foreground text-sm ml-6">Official land title information and documentation</p>
        </li>
        <li className="font-medium">Claims History
          <p className="text-muted-foreground text-sm ml-6">Record of claims submissions and verification processes</p>
        </li>
        <li className="font-medium">Asset Evidence
          <p className="text-muted-foreground text-sm ml-6">Land classification and natural resource analysis</p>
        </li>
        <li className="font-medium">Schemes Eligibility
          <p className="text-muted-foreground text-sm ml-6">Government schemes eligibility and application information</p>
        </li>
        <li className="font-medium">IoT Environment
          <p className="text-muted-foreground text-sm ml-6">Sensor-based environmental monitoring data</p>
        </li>
        <li className="font-medium">Socio-Economic Data
          <p className="text-muted-foreground text-sm ml-6">Household and agricultural information</p>
        </li>
        <li className="font-medium">Documents
          <p className="text-muted-foreground text-sm ml-6">Attached files and supporting documentation</p>
        </li>
      </ol>
    </Card>
  );
}
