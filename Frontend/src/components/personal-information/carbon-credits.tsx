"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CarbonCreditsProps = {
  data: {
    tree_count: number;
    annual_co2_sequestration_kg: number;
    estimated_credits: number;
    market_price_per_credit: number;
    estimated_revenue: number;
    status: string;
  };
};

export function CarbonCredits({ data }: CarbonCreditsProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Carbon Credits</h3>
          <Badge 
            className={
              data.status === "Assigned" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : data.status === "Sold"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }
            variant="outline"
          >
            {data.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{data.tree_count} Trees</p>
              <p className="text-xs text-muted-foreground">{data.estimated_credits} tCO₂eq</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-green-700">₹{data.estimated_revenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Annual Revenue</p>
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs">
            <span>CO₂ Sequestration</span>
            <span>{data.annual_co2_sequestration_kg} kg/yr</span>
          </div>
          <Progress 
            value={80} 
            className="h-2" 
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Carbon Credits Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Tree Count</span>
                <p className="font-medium">{data.tree_count}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Annual CO₂ Sequestration</span>
                <p className="font-medium">{data.annual_co2_sequestration_kg} kg</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Estimated Carbon Credits</span>
                <p className="font-medium">{data.estimated_credits} tCO₂eq</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Market Price Per Credit</span>
                <p className="font-medium">₹{data.market_price_per_credit.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Status</span>
                <div>
                  <Badge 
                    className={
                      data.status === "Assigned" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : data.status === "Sold"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }
                    variant="outline"
                  >
                    {data.status}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Estimated Annual Revenue</span>
                <p className="font-medium text-xl text-green-700">₹{data.estimated_revenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 text-center p-3 border rounded-md bg-green-50">
              <p className="text-sm font-medium text-green-800">
                This land could generate ₹{data.estimated_revenue.toLocaleString()}/year in carbon credit revenue.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
