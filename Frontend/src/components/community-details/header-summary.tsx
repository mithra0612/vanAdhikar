"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, CheckCircle } from "lucide-react";

type HeaderSummaryProps = {
  data: {
    community_id: string;
    name: string;
    district: string;
    state: string;
    verified: boolean;
    total_households: number;
    total_members: number;
  };
};

export function HeaderSummary({ data }: HeaderSummaryProps) {
  return (
    <Card className="w-full">
      <CardContent className="py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{data.name}</h2>
                {data.verified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{data.district}, {data.state}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Community ID: {data.community_id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full sm:w-auto">
            <div className="text-center">
              <p className="text-2xl font-bold">{data.total_households.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Households</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{data.total_members.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Members</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
