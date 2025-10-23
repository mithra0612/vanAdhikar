'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileText, CheckCircle, Scan } from "lucide-react";
import { FFRAPatttaData, SAMPLE_FFRA_PATTA_DATA } from "./types";

interface FFRAExtractionProps {
  onExtractionComplete: (patttaData: FFRAPatttaData) => void;
}

export function FFRAExtraction({ onExtractionComplete }: FFRAExtractionProps) {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<string>('Processing FFRA Patta document...');
  const [patttaData, setPatttaData] = useState<FFRAPatttaData | null>(null);

  useEffect(() => {
    // Simulate FFRA Patta extraction process
    const extractionPhases = [
      { phase: 'Processing FFRA Patta document...', progress: 20, duration: 1000 },
      { phase: 'Extracting DSS click box data...', progress: 40, duration: 800 },
      { phase: 'Processing coordinates...', progress: 60, duration: 1200 },
      { phase: 'Extracting Patta number and details...', progress: 80, duration: 1000 },
      { phase: 'Validating location data...', progress: 95, duration: 600 },
      { phase: 'FFRA extraction complete!', progress: 100, duration: 400 }
    ];

    let currentIndex = 0;
    const processPhase = () => {
      if (currentIndex < extractionPhases.length) {
        const phase = extractionPhases[currentIndex];
        setCurrentPhase(phase.phase);
        setProgress(phase.progress);
        
        if (phase.progress === 100) {
          setIsProcessing(false);
          setPatttaData(SAMPLE_FFRA_PATTA_DATA);
          setTimeout(() => onExtractionComplete(SAMPLE_FFRA_PATTA_DATA), 1000);
        }
        
        currentIndex++;
        setTimeout(processPhase, phase.duration);
      }
    };

    processPhase();
  }, [onExtractionComplete]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          FFRA Patta Details Extraction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">FFRA Processing Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isProcessing ? (
              <Scan className="h-4 w-4 animate-pulse" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            {currentPhase}
          </div>
        </div>

        {/* FFRA Data Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">FFRA Patta Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">FFRA Patta Details</p>
                  <Badge variant="secondary" className="mt-2">
                    Tripura Forest Department
                  </Badge>
                </div>
                
                {/* Processing overlay */}
                {isProcessing && progress > 20 && (
                  <div className="absolute inset-0 bg-background/90 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2 animate-pulse text-primary" />
                      <p className="text-sm">Processing location data...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Extracted Patta Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Extracted Patta Details</CardTitle>
            </CardHeader>
            <CardContent>
              {progress === 100 && patttaData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">DSS Click Box</p>
                      <p className="font-medium">{patttaData.dssClickBox}</p>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Coordinates</p>
                      <p className="font-medium">
                        {patttaData.coordinates.latitude}°N, {patttaData.coordinates.longitude}°E
                      </p>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Patta No</p>
                      <p className="font-medium">{patttaData.pattNo}</p>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{patttaData.name}</p>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Village</p>
                      <p className="font-medium">{patttaData.village}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                  <p>Extracting patta details...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Details */}
        {progress === 100 && patttaData && (
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-base text-blue-900 dark:text-blue-100">
                Additional Patta Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Survey Number</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{patttaData.surveyNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Area</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{patttaData.area}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Boundary Details</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{patttaData.boundaryDetails}</p>
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
                    FFRA Patta Extraction Complete!
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Successfully extracted patta details and location information. Ready for map processing.
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