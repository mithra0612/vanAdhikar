"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SchemesEligibilityProps = {
  data: {
    schemes: {
      scheme_id: string;
      name: string;
      eligibility_score: number;
      status: string;
      matched_criteria: string[];
      apply_link: string;
    }[];
  };
};

export function SchemesEligibility({ data }: SchemesEligibilityProps) {
  // Find the scheme with the highest eligibility score
  const highestEligibilityScheme = [...data.schemes].sort((a, b) => 
    b.eligibility_score - a.eligibility_score
  )[0];

  // Count eligible schemes
  const eligibleSchemesCount = data.schemes.filter(
    scheme => scheme.status === "Eligible"
  ).length;
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Schemes & Eligibility</h3>
          <Badge variant="outline">{eligibleSchemesCount} Eligible</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {highestEligibilityScheme && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{highestEligibilityScheme.name}</p>
                  <p className="text-xs text-muted-foreground">{highestEligibilityScheme.scheme_id}</p>
                </div>
              </div>
              <Badge 
                className={
                  highestEligibilityScheme.status === "Eligible" 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }
                variant="outline"
              >
                {highestEligibilityScheme.status}
              </Badge>
            </div>
            
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs">
                <span>Eligibility</span>
                <span>{highestEligibilityScheme.eligibility_score}%</span>
              </div>
              <Progress 
                value={highestEligibilityScheme.eligibility_score} 
                className="h-2" 
              />
            </div>
          </div>
        )}
        
        {/* Brief summary of other schemes */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {data.schemes.slice(1, 5).map(scheme => (
            <div key={scheme.scheme_id} className="text-xs border rounded-md p-2">
              <div className="font-medium truncate">{scheme.name}</div>
              <div className="flex justify-between items-center mt-1">
                <span>{scheme.eligibility_score}%</span>
                <Badge 
                  className={
                    scheme.status === "Eligible" 
                      ? "bg-green-50 text-green-700 border-green-200 text-[10px] py-0" 
                      : "bg-yellow-50 text-yellow-700 border-yellow-200 text-[10px] py-0"
                  }
                  variant="outline"
                >
                  {scheme.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">View All Schemes</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Schemes & Eligibility</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {data.schemes.map((scheme) => (
                <div key={scheme.scheme_id} className="border rounded-md p-4 bg-card">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <div>
                      <h4 className="font-medium">{scheme.name}</h4>
                      <p className="text-sm text-muted-foreground">{scheme.scheme_id}</p>
                    </div>
                    <Badge 
                      className={
                        scheme.status === "Eligible" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : scheme.status === "Not Eligible"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                      variant="outline"
                    >
                      {scheme.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs">
                      <span>Eligibility Score</span>
                      <span>{scheme.eligibility_score}%</span>
                    </div>
                    <Progress 
                      value={scheme.eligibility_score} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm text-muted-foreground">Matched Criteria:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {scheme.matched_criteria.map((criterion, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {criterion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <a 
                      href={scheme.apply_link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Apply Now <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
