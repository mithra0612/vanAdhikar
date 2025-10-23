"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AssetEvidenceProps = {
  data: {
    landcover_class: string;
    agriculture_area: number;
    forest_cover_pct: number;
    waterbody_area_m2: number;
    homestead_count: number;
    tree_count: number;
  };
};

export function AssetEvidence({ data }: AssetEvidenceProps) {
  // Calculate percentages for visualization
  const agriculturePct = (data.agriculture_area / 1.24) * 100;
  const waterPct = (data.waterbody_area_m2 / 12400) * 100;
  const otherPct = 100 - data.forest_cover_pct - agriculturePct - waterPct;

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Land Assets</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Land Classification</span>
              <span className="font-medium">{data.landcover_class}</span>
            </div>
          </div>
          
          {/* Land Cover Visualization */}
          <div>
            <div className="flex gap-1 h-5 mb-1 rounded-sm overflow-hidden">
              <div className="bg-green-400" style={{ width: `${data.forest_cover_pct}%` }} title="Forest"></div>
              <div className="bg-yellow-300" style={{ width: `${agriculturePct}%` }} title="Agriculture"></div>
              <div className="bg-blue-300" style={{ width: `${waterPct}%` }} title="Water"></div>
              <div className="bg-muted" style={{ width: `${otherPct}%` }} title="Other"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Forest {Math.round(data.forest_cover_pct)}%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span>Agri {Math.round(agriculturePct)}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs pt-1">
            <div>
              <span className="text-muted-foreground">Tree Count</span>
              <p className="font-medium">{data.tree_count} trees</p>
            </div>
            <div>
              <span className="text-muted-foreground">Agricultural Area</span>
              <p className="font-medium">{data.agriculture_area} ha</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1 mt-1">
                <Info size={14} /> Detailed Land Analysis
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Land Assets Analysis</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Land Classification</span>
                    <p className="font-medium">{data.landcover_class}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Agricultural Area</span>
                    <p className="font-medium">{data.agriculture_area} ha</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Water Bodies</span>
                    <p className="font-medium">{data.waterbody_area_m2} m²</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Homestead Count</span>
                    <p className="font-medium">{data.homestead_count}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Tree Count</span>
                    <p className="font-medium">{data.tree_count}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium mb-2 block">Forest Cover</span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{data.forest_cover_pct}%</span>
                      <span>100%</span>
                    </div>
                    <Progress value={data.forest_cover_pct} className="h-2" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <span className="text-sm font-medium mb-2 block">Land Cover Distribution</span>
                  <div className="mt-2 flex gap-1 h-8">
                    <div className="bg-green-400 rounded-l-sm flex items-center justify-center" 
                         style={{ width: `${data.forest_cover_pct}%` }} title="Forest">
                      {data.forest_cover_pct >= 15 && (
                        <span className="text-xs text-white font-medium">Forest</span>
                      )}
                    </div>
                    <div className="bg-yellow-300 flex items-center justify-center" 
                         style={{ width: `${agriculturePct}%` }} title="Agriculture">
                      {agriculturePct >= 15 && (
                        <span className="text-xs font-medium">Agriculture</span>
                      )}
                    </div>
                    <div className="bg-blue-300 flex items-center justify-center" 
                         style={{ width: `${waterPct}%` }} title="Water">
                      {waterPct >= 15 && (
                        <span className="text-xs font-medium">Water</span>
                      )}
                    </div>
                    <div className="bg-muted rounded-r-sm flex items-center justify-center" 
                         style={{ width: `${otherPct}%` }} title="Other">
                      {otherPct >= 15 && (
                        <span className="text-xs text-muted-foreground font-medium">Other</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
