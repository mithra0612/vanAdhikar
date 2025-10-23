"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Calendar, FileText, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type HeaderSummaryProps = {
  data: {
    name: string;
    fra_id: string;
    village: string;
    district: string;
    verified: boolean;
    confidence_score: number;
    verification_date: string;
    photo_url?: string;
  };
};

export function HeaderSummary({ data }: HeaderSummaryProps) {
  return (
    <Card className="w-full shadow-lg border border-border">
      <CardContent className="pt-6 pb-6 px-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-md">
            <AvatarImage src={data.photo_url} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {data.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2 flex-1 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground">{data.name}</h2>
              {data.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Verified by field officer on {data.verification_date}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">{data.fra_id}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  {data.village}, {data.district}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Verified: {new Date(data.verification_date).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                Confidence Score: {data.confidence_score}%
              </Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="px-4">
                    <Info size={16} className="mr-2" /> View Profile Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
              <DialogHeader>
                <DialogTitle>Individual Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarImage src={data.photo_url} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {data.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{data.name}</h2>
                    <div className="flex items-center gap-2">
                      {data.verified && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                     
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-md bg-muted/30">
                  <div>
                    <span className="text-sm text-muted-foreground">FRA ID</span>
                    <p className="font-medium">{data.fra_id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Village</span>
                    <p className="font-medium">{data.village}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">District</span>
                    <p className="font-medium">{data.district}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Verification Date</span>
                    <p className="font-medium">{new Date(data.verification_date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-muted/30">
                  <h3 className="font-medium mb-2">Verification Information</h3>
                  <div className="text-sm">
                    <p>This individual's information has been verified by a field officer on {new Date(data.verification_date).toLocaleDateString()}. The data extracted from submitted documents has a confidence score of {data.confidence_score}%.</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
