"use client";

import { DashboardCard } from "@/components/personal-information/dashboard-card";
import { 
  TreePine, 
  Tractor, 
  Droplets, 
  GraduationCap, 
  Home,
  Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CommunityAssetsProps = {
  data: {
    forest_cover_pct: number;
    agriculture_area_ha: number;
    waterbodies: { count: number; total_area_m2: number };
    grazing_land_ha: number;
    homesteads: number;
  };
};

export function CommunityAssets({ data }: CommunityAssetsProps) {
  const totalLandArea = 
    data.agriculture_area_ha + 
    data.grazing_land_ha + 
    (data.forest_cover_pct / 100) * (data.agriculture_area_ha + data.grazing_land_ha) / (1 - data.forest_cover_pct / 100);

  const waterbodiesAreaHa = data.waterbodies.total_area_m2 / 10000; // Convert m² to ha
  
  return (
    <DashboardCard title="Community Assets & Resources">
      <div className="space-y-4">
        {/* Land Distribution */}
        <div className="space-y-1 mb-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <TreePine className="h-4 w-4 text-green-600" /> Forest Cover
            </span>
            <span className="font-medium">{data.forest_cover_pct}%</span>
          </div>
          <Progress value={data.forest_cover_pct} className="h-2" />
        </div>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tractor className="h-4 w-4 text-green-600" />
                <span className="text-sm">Agriculture</span>
              </div>
              <span className="text-sm font-medium">{data.agriculture_area_ha} ha</span>
            </div>
          </div>
          
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-amber-600" />
                <span className="text-sm">Homesteads</span>
              </div>
              <span className="text-sm font-medium">{data.homesteads}</span>
            </div>
          </div>
          
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Waterbodies</span>
              </div>
              <span className="text-sm font-medium">{data.waterbodies.count}</span>
            </div>
          </div>
          
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Grazing Land</span>
              </div>
              <span className="text-sm font-medium">{data.grazing_land_ha} ha</span>
            </div>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
              <Info className="h-4 w-4" /> Detailed Resource Information
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Community Assets & Resources</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <h4 className="font-medium mb-2">Land Distribution</h4>
                <div className="flex gap-1 h-8 rounded-md overflow-hidden">
                  <div className="bg-green-500" style={{ width: `${data.forest_cover_pct}%` }} title="Forest"></div>
                  <div className="bg-yellow-500" style={{ width: `${(data.agriculture_area_ha / totalLandArea) * 100}%` }} title="Agriculture"></div>
                  <div className="bg-amber-500" style={{ width: `${(data.grazing_land_ha / totalLandArea) * 100}%` }} title="Grazing"></div>
                  <div className="bg-blue-500" style={{ width: `${(waterbodiesAreaHa / totalLandArea) * 100}%` }} title="Water"></div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <span>Forest: {data.forest_cover_pct}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                    <span>Agriculture: {Math.round((data.agriculture_area_ha / totalLandArea) * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
                    <span>Grazing: {Math.round((data.grazing_land_ha / totalLandArea) * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <span>Water: {Math.round((waterbodiesAreaHa / totalLandArea) * 100)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Total Land Area</div>
                  <div className="text-2xl font-bold">{Math.round(totalLandArea)} ha</div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Forest Area</div>
                  <div className="text-2xl font-bold">{Math.round((data.forest_cover_pct / 100) * totalLandArea)} ha</div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Water Resources</div>
                  <div className="text-2xl font-bold">{data.waterbodies.count} bodies</div>
                  <div className="text-xs text-muted-foreground">{(data.waterbodies.total_area_m2 / 10000).toFixed(1)} hectares</div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Per Household Land</div>
                  <div className="text-2xl font-bold">{(data.agriculture_area_ha / data.homesteads).toFixed(2)} ha</div>
                  <div className="text-xs text-muted-foreground">Agricultural land</div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardCard>
  );
}
