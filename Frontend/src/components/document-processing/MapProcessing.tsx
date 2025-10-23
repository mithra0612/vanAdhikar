'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, CheckCircle, Navigation } from "lucide-react";
import { FFRAPatttaData } from "./types";

interface MapProcessingProps {
  patttaData: FFRAPatttaData;
  onProcessingComplete: () => void;
}

export function MapProcessing({ patttaData, onProcessingComplete }: MapProcessingProps) {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<string>('Initializing map processing...');

  useEffect(() => {
    // Simulate map processing phases
    const processingPhases = [
      { phase: 'Initializing map processing...', progress: 10, duration: 800 },
      { phase: 'Loading Tripura forest boundary data...', progress: 25, duration: 1200 },
      { phase: 'Processing coordinates and DSS data...', progress: 45, duration: 1500 },
      { phase: 'Generating land parcel boundaries...', progress: 65, duration: 1800 },
      { phase: 'Overlaying with satellite imagery...', progress: 80, duration: 1200 },
      { phase: 'Finalizing map visualization...', progress: 95, duration: 800 },
      { phase: 'Map processing complete!', progress: 100, duration: 500 }
    ];

    let currentIndex = 0;
    const processPhase = () => {
      if (currentIndex < processingPhases.length) {
        const phase = processingPhases[currentIndex];
        setCurrentPhase(phase.phase);
        setProgress(phase.progress);
        
        if (phase.progress === 100) {
          setIsProcessing(false);
          setTimeout(() => onProcessingComplete(), 1500);
        }
        
        currentIndex++;
        setTimeout(processPhase, phase.duration);
      }
    };

    processPhase();
  }, [onProcessingComplete]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Map Processing & Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Map Processing Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isProcessing ? (
              <Layers className="h-4 w-4 animate-pulse" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            {currentPhase}
          </div>
        </div>

        {/* Map Preview and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Map Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                {/* Mock map with forest area representation */}
                <div className="absolute inset-0">
                  {/* Background forest pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-repeat" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zm-8 0c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                  </div>
                  
                  {/* Land parcel representation */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-16 border-2 border-red-500 bg-red-100 dark:bg-red-900/50 rounded-sm relative">
                      <MapPin className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-6 w-6 text-red-500" />
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-700 dark:text-red-300 whitespace-nowrap">
                        Claimed Land
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Processing overlay */}
                {isProcessing && progress > 30 && (
                  <div className="absolute inset-0 bg-background/90 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="h-8 w-8 mx-auto mb-2 animate-spin text-primary" />
                      <p className="text-sm">Processing map data...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location Data Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">DSS Click Box</p>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-mono">
                      {patttaData.dssClickBox}
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Navigation className="h-4 w-4 text-green-600" />
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">Coordinates</p>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 font-mono">
                      {patttaData.coordinates.latitude}°N, {patttaData.coordinates.longitude}°E
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-purple-600 text-white">Patta No</Badge>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300 font-mono">
                      {patttaData.pattNo}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                      <p className="text-xs font-medium text-orange-900 dark:text-orange-100 mb-1">Name</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300">{patttaData.name}</p>
                    </div>
                    <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-lg border border-teal-200 dark:border-teal-800">
                      <p className="text-xs font-medium text-teal-900 dark:text-teal-100 mb-1">Village</p>
                      <p className="text-sm text-teal-700 dark:text-teal-300">{patttaData.village}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Layers Information */}
        {progress > 50 && (
          <Card className="bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800">
            <CardHeader>
              <CardTitle className="text-base text-indigo-900 dark:text-indigo-100">
                Map Layers Being Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Forest Boundaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Water Bodies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Claimed Land</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-indigo-700 dark:text-indigo-300">Village Boundaries</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completion Status */}
        {progress === 100 && (
          <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    Map Processing Complete!
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Successfully generated map visualization with all location data. Ready for final review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}