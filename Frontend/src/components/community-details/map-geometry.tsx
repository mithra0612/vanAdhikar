"use client";

import { DashboardCard } from "@/components/personal-information/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

type MapGeometryProps = {
  data: {
    community_polygon: {
      type: string;
      coordinates: number[][][];
    };
    satellite_snapshot_url: string;
    assets: {
      forest: { area_ha: number; percentage: number };
      agriculture: { area_ha: number; percentage: number };
      settlement: { area_ha: number; percentage: number };
      water: { area_ha: number; percentage: number };
    };
  };
};

export function MapGeometry({ data }: MapGeometryProps) {
  return (
    <DashboardCard 
      title="Community WebGIS Map"
      headerContent={
        <Badge variant="outline" className="flex gap-1 items-center">
          <Layers className="h-3 w-3" /> 4 Layers
        </Badge>
      }
    >
      <div className="h-full rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* Using satellite image from public folder */}
        <div className="absolute inset-0 bg-cover bg-center transform scale-110" style={{ 
          backgroundImage: `url('/mapPreview/Satellite.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        </div>

        {/* Community boundary overlay */}
        <div className="absolute inset-8 border-2 border-primary border-dashed rounded-lg bg-primary/10"></div>

        {/* Information overlay */}
        <div className="absolute bottom-3 right-3 bg-background/95 p-3 rounded-lg text-sm z-10 shadow-lg max-w-64 border border-border">
          <div className="font-semibold mb-2 text-foreground">Land Distribution:</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-muted-foreground">Forest: {data.assets.forest.percentage}% ({data.assets.forest.area_ha} ha)</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-muted-foreground">Agriculture: {data.assets.agriculture.percentage}% ({data.assets.agriculture.area_ha} ha)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-muted-foreground">Water: {data.assets.water.percentage}% ({data.assets.water.area_ha} ha)</span>
          </div>
        </div>
        
        {/* Map type switcher */}
        <div className="absolute top-3 right-3 z-10 flex bg-background rounded-lg overflow-hidden shadow-lg border border-border">
          <button className="px-4 py-2 text-sm bg-primary text-primary-foreground font-medium">Satellite</button>
          <button className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted">Cadastral</button>
          <button className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted">Assets</button>
        </div>
      </div>
    </DashboardCard>
  );
}
