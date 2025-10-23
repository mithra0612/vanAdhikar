"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Droplets } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type IoTEnvironmentProps = {
  data: {
    sensors: {
      id: string;
      type: string;
      last_seen: string;
      reading: { value: number; unit: string };
      battery_pct: number;
      status: string;
      trend_data: number[];
    }[];
  };
};

export function IoTEnvironment({ data }: IoTEnvironmentProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Simple sparkline chart renderer
  const renderSparkline = (data: number[], height: number = 30) => {
    if (!data || data.length < 2) return null;
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const width = 100;
    const points: string[] = [];
    
    data.forEach((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      points.push(`${x},${y}`);
    });
    
    const polyline = points.join(' ');
    
    return (
      <svg width="100%" height={height} className="overflow-visible">
        <polyline
          points={polyline}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
      </svg>
    );
  };

  // Find the primary sensor (groundwater)
  const primarySensor = data.sensors.find(s => s.type.toLowerCase().includes('groundwater')) || data.sensors[0];
  const soilSensor = data.sensors.find(s => s.type.toLowerCase().includes('soil'));

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Environmental Data</h3>
          <Badge 
            className={
              data.sensors.every(s => s.status === "Online")
                ? "bg-green-50 text-green-700 border-green-200" 
                : "bg-amber-50 text-amber-700 border-amber-200"
            }
            variant="outline"
          >
            {data.sensors.every(s => s.status === "Online") ? "All Online" : "Check Status"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main sensor display */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Droplets size={16} className="text-primary" />
                <span className="text-sm font-medium">{primarySensor.type}</span>
              </div>
              <div className="text-xl font-semibold">
                {primarySensor.reading.value} <span className="text-xs font-normal">{primarySensor.reading.unit}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <div>Updated {formatDateTime(primarySensor.last_seen)}</div>
              <div className="flex items-center gap-1 justify-end mt-1">
                <span className="w-2 h-2 rounded-full" 
                  style={{backgroundColor: primarySensor.battery_pct > 20 ? '#22c55e' : '#ef4444'}}></span>
                <span>Battery: {primarySensor.battery_pct}%</span>
              </div>
            </div>
          </div>
          
          {/* Sparkline trend */}
          <div>
            {renderSparkline(primarySensor.trend_data, 24)}
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>7 days trend</span>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1 mt-1">
                <Activity size={14} /> View All Sensors
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>IoT & Environment Monitoring</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                {data.sensors.map((sensor) => (
                  <div key={sensor.id} className="border rounded-md p-4 bg-card">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                      <div>
                        <h4 className="font-medium">{sensor.type}</h4>
                        <p className="text-sm text-muted-foreground">{sensor.id}</p>
                      </div>
                      <Badge 
                        className={
                          sensor.status === "Online" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                        variant="outline"
                      >
                        {sensor.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div>
                        <div className="text-2xl font-semibold">
                          {sensor.reading.value} <span className="text-sm font-normal">{sensor.reading.unit}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last updated: {formatDateTime(sensor.last_seen)}
                        </div>
                      </div>
                      
                      <div className="sm:col-span-2">
                        <div className="relative h-10">
                          {renderSparkline(sensor.trend_data)}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>7 days trend</span>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" 
                              style={{backgroundColor: sensor.battery_pct > 20 ? '#22c55e' : '#ef4444'}}></span>
                            <span>Battery: {sensor.battery_pct}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
