"use client";

import { DashboardCard } from "./dashboard-card";

type MapGeometryProps = {
  data: {
    gps_point: number[];
    patta_polygon: {
      type: string;
      coordinates: number[][][];
    };
    satellite_snapshot_url: string;
  };
};

export function MapGeometry({ data }: MapGeometryProps) {
  return (
    <DashboardCard title="WebGIS Map">
      <div className="h-full rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* Using the provided satellite image - made bigger */}
        <div className="absolute inset-0 bg-cover bg-center transform scale-110" style={{ 
          backgroundImage: `url('${data.satellite_snapshot_url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        </div>

        {/* Information overlay */}
        <div className="absolute bottom-3 right-3 bg-background/90 p-3 rounded-lg text-sm z-10 shadow-lg border border-border">
          <p className="font-semibold text-foreground">Area: 1.24 ha</p>
          <p className="text-muted-foreground">GPS: {data.gps_point[0]}, {data.gps_point[1]}</p>
        </div>
        
        {/* Map type switcher */}
        <div className="absolute top-3 right-3 z-10 flex bg-background rounded-lg overflow-hidden shadow-lg border border-border">
          <button className="px-4 py-2 text-sm bg-primary text-primary-foreground font-medium">Satellite</button>
          <button className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted">Cadastral</button>
        </div>
      </div>
    </DashboardCard>
  );
}
