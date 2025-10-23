"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SocioEconomicProps = {
  data: {
    household_size: number;
    occupation: string;
    crop_types: string[];
    annual_income_est: number;
    benefits_received: string[];
  };
};

export function SocioEconomic({ data }: SocioEconomicProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Socio-Economic</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Users size={20} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">{data.household_size} Member Household</div>
            <div className="text-xs text-muted-foreground">{data.occupation}</div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="text-xs text-muted-foreground mb-1">Annual Income</div>
          <div className="text-sm font-semibold">₹{data.annual_income_est.toLocaleString()}</div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {data.crop_types.slice(0, 2).map((crop, index) => (
            <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs">
              {crop}
            </Badge>
          ))}
          {data.crop_types.length > 2 && (
            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs">
              +{data.crop_types.length - 2} more
            </Badge>
          )}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1 mt-1">
              View Complete Profile <ChevronRight size={14} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Socio-Economic Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <h4 className="text-sm font-medium mb-1">Household Information</h4>
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-md">
                  <div>
                    <div className="text-xs text-muted-foreground">Household Size</div>
                    <div className="font-medium">{data.household_size} members</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Primary Occupation</div>
                    <div className="font-medium">{data.occupation}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Annual Income</div>
                    <div className="font-medium">₹{data.annual_income_est.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Agricultural Activities</h4>
                <div className="p-3 bg-muted/30 rounded-md">
                  <div className="text-xs text-muted-foreground mb-2">Crop Types</div>
                  <div className="flex flex-wrap gap-2">
                    {data.crop_types.map((crop, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-700">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Government Benefits</h4>
                <div className="p-3 bg-muted/30 rounded-md">
                  <div className="text-xs text-muted-foreground mb-2">Benefits Received</div>
                  <div className="flex flex-wrap gap-2">
                    {data.benefits_received.map((benefit, index) => (
                      <Badge key={index} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
