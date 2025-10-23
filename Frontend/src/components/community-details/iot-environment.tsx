"use client";

import { DashboardCard } from "@/components/personal-information/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  ThermometerSun, 
  Droplets, 
  Wind, 
  Sun, 
  Leaf, 
  WifiIcon 
} from "lucide-react";

type SensorReading = {
  id: string;
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  status: "normal" | "warning" | "critical";
};

type IoTDevice = {
  device_id: string;
  name: string;
  type: string;
  status: "online" | "offline" | "maintenance";
  last_reading: string;
};

type IoTEnvironmentProps = {
  sensors: SensorReading[];
  devices: IoTDevice[];
};

export function IoTEnvironment({ sensors, devices }: IoTEnvironmentProps) {
  const onlineDevices = devices.filter(d => d.status === "online").length;
  
  const getSensorIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "temperature": return <ThermometerSun className="h-4 w-4" />;
      case "humidity": return <Droplets className="h-4 w-4" />;
      case "wind": return <Wind className="h-4 w-4" />;
      case "solar": return <Sun className="h-4 w-4" />;
      case "air quality": return <Leaf className="h-4 w-4" />;
      default: return <WifiIcon className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      case "online": return "bg-green-500";
      case "offline": return "bg-slate-300";
      case "maintenance": return "bg-blue-500";
      default: return "bg-slate-300";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <DashboardCard 
      title="IoT & Environment" 
      headerContent={
        <Badge variant="outline" className="flex items-center gap-1">
          <WifiIcon className="h-3 w-3" /> {onlineDevices}/{devices.length} online
        </Badge>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {sensors.slice(0, 4).map(sensor => (
            <div 
              key={sensor.id}
              className="border rounded-md p-2 flex flex-col items-center justify-center"
            >
              <div className="flex items-center justify-center gap-1 text-xs mb-1">
                {getSensorIcon(sensor.type)}
                <span>{sensor.type}</span>
              </div>
              <div className="text-lg font-bold">{sensor.value}{sensor.unit}</div>
              <div 
                className={`w-2 h-2 rounded-full mt-1 ${getStatusColor(sensor.status)}`}
                title={sensor.status}
              ></div>
            </div>
          ))}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 mt-2">
              Environmental Dashboard <ChevronRight className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>IoT & Environment Dashboard</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="sensors">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="sensors">Sensor Readings</TabsTrigger>
                <TabsTrigger value="devices">IoT Devices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sensors" className="max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {sensors.map(sensor => (
                    <div key={sensor.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {getSensorIcon(sensor.type)}
                          <div className="font-medium">{sensor.type}</div>
                        </div>
                        <div 
                          className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(sensor.status)}`}
                        >
                          {sensor.status}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-2xl font-bold">
                          {sensor.value}{sensor.unit}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(sensor.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="devices" className="max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {devices.map(device => (
                    <div key={device.device_id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{device.name}</div>
                        <div 
                          className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}
                          title={device.status}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {device.type} • ID: {device.device_id}
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <Badge variant="outline" className="text-xs">
                          {device.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          Last reading: {formatDate(device.last_reading)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardCard>
  );
}
