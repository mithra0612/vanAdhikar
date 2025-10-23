"use client";

import { DashboardCard } from "@/components/personal-information/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, ChevronRight, Building2, LandmarkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type SchemeType = {
  scheme_id: string;
  scheme_name: string;
  eligible_households: number;
  enrolled: number;
};

type SchemesEligibilityProps = {
  data: SchemeType[];
};

export function SchemesEligibility({ data }: SchemesEligibilityProps) {
  // Filter to only include government schemes (this is a simple example - in a real app you'd have a proper flag)
  const govSchemes = data.filter(scheme => 
    scheme.scheme_id.startsWith("PM") || 
    scheme.scheme_name.includes("Mission") || 
    scheme.scheme_name.includes("Yojana") ||
    scheme.scheme_name.includes("MGNREGA")
  );
  
  const totalEligible = govSchemes.reduce((sum, scheme) => sum + scheme.eligible_households, 0);
  const totalEnrolled = govSchemes.reduce((sum, scheme) => sum + scheme.enrolled, 0);
  
  // Sort schemes by enrollment progress percentage (descending)
  const sortedSchemes = [...govSchemes].sort((a, b) => {
    const progressA = (a.enrolled / a.eligible_households) * 100;
    const progressB = (b.enrolled / b.eligible_households) * 100;
    return progressB - progressA;
  });

  return (
    <DashboardCard 
      title="Government Schemes" 
      headerContent={
        <Badge variant="outline" className="flex items-center gap-1">
          <LandmarkIcon className="h-3 w-3" /> {govSchemes.length} Schemes
        </Badge>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shadow-sm">
              <LandmarkIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Enrolled</div>
              <div className="text-2xl font-bold text-primary">{totalEnrolled}</div>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Total Eligible</div>
            <div className="text-2xl font-bold">{totalEligible}</div>
            <div className="text-xs text-primary font-medium mt-1">
              {Math.round((totalEnrolled / totalEligible) * 100)}% enrolled
            </div>
          </div>
        </div>
        
        <Progress value={(totalEnrolled / totalEligible) * 100} className="h-2 my-2" />
        
        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {sortedSchemes.slice(0, 3).map(scheme => {
            const progress = (scheme.enrolled / scheme.eligible_households) * 100;
            return (
              <div key={scheme.scheme_id} className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="font-medium truncate max-w-[160px]" title={scheme.scheme_name}>
                      {scheme.scheme_name}
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{scheme.enrolled}/{scheme.eligible_households}</Badge>
                </div>
                <Progress value={progress} className="h-1.5 mt-2.5" />
                <div className="text-xs text-muted-foreground mt-1 text-right">{Math.round(progress)}% enrolled</div>
              </div>
            );
          })}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 mt-2">
              View All Government Schemes <ChevronRight className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Government Schemes & Eligibility</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pt-2">
              {sortedSchemes.map(scheme => {
                const progress = (scheme.enrolled / scheme.eligible_households) * 100;
                return (
                  <div key={scheme.scheme_id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <LandmarkIcon className="h-4 w-4 text-primary" />
                        <div className="font-medium">{scheme.scheme_name}</div>
                      </div>
                      <Badge variant="outline">
                        {scheme.enrolled} / {scheme.eligible_households}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                      <div>Scheme ID: {scheme.scheme_id}</div>
                      <div>{Math.round(progress)}% enrolled</div>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Enroll Households</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardCard>
  );
}
