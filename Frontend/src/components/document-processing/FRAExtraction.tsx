'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Scan, FileText, CheckCircle } from "lucide-react";
import { ExtractedField, ClaimType, SAMPLE_FRA_CLAIM_DATA } from "./types";

interface FRAExtractionProps {
  documentUrl: string;
  claimType: ClaimType;
  onExtractionComplete: (fields: ExtractedField[]) => void;
}

export function FRAExtraction({ documentUrl, claimType, onExtractionComplete }: FRAExtractionProps) {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<string>('Analyzing document structure...');
  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>([]);

  useEffect(() => {
    // Simulate FRA document extraction process
    const extractionPhases = [
      { phase: 'Analyzing document structure...', progress: 15, duration: 1000 },
      { phase: 'Extracting personal information...', progress: 35, duration: 1500 },
      { phase: 'Processing family details...', progress: 55, duration: 1200 },
      { phase: 'Extracting claim details...', progress: 75, duration: 1800 },
      { phase: 'Validating extracted data...', progress: 95, duration: 800 },
      { phase: 'Extraction complete!', progress: 100, duration: 500 }
    ];

    let currentIndex = 0;
    const processPhase = () => {
      if (currentIndex < extractionPhases.length) {
        const phase = extractionPhases[currentIndex];
        setCurrentPhase(phase.phase);
        setProgress(phase.progress);
        
        if (phase.progress === 100) {
          setIsProcessing(false);
          // Generate extracted fields based on claim type
          const fields = generateExtractedFields(claimType);
          setExtractedFields(fields);
          setTimeout(() => onExtractionComplete(fields), 1000);
        }
        
        currentIndex++;
        setTimeout(processPhase, phase.duration);
      }
    };

    processPhase();
  }, [claimType, onExtractionComplete]);

  const generateExtractedFields = (type: ClaimType): ExtractedField[] => {
    const baseFields: ExtractedField[] = [
      {
        field: "Name of the claimant(s)",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.claimantName || "Ratan Kumar Tripura",
        confidence: 95,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.claimantName || "Ratan Kumar Tripura",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Name of the spouse",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.spouseName || "Sunita Tripura",
        confidence: 92,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.spouseName || "Sunita Tripura",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Name of father/mother",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.fatherMotherName || "Late Biren Tripura",
        confidence: 88,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.fatherMotherName || "Late Biren Tripura",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Address",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.address || "Village Kumarghat, Post Office Kumarghat",
        confidence: 90,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.address || "Village Kumarghat, Post Office Kumarghat",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Village",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.village || "Kumarghat",
        confidence: 96,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.village || "Kumarghat",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Gram Panchayat",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.gramPanchayat || "Kumarghat Gram Panchayat",
        confidence: 93,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.gramPanchayat || "Kumarghat Gram Panchayat",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Tehsil/Taluka",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.tehsilTaluka || "Kumarghat",
        confidence: 91,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.tehsilTaluka || "Kumarghat",
        isLocked: false,
        isEdited: false
      },
      {
        field: "District",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.district || "Unakoti",
        confidence: 97,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.district || "Unakoti",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Scheduled Tribe",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.scheduledTribe ? "Yes" : "No",
        confidence: 94,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.scheduledTribe ? "Yes" : "No",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Other Traditional Forest Dweller",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.otherTraditionalForestDweller ? "Yes" : "No",
        confidence: 89,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.otherTraditionalForestDweller ? "Yes" : "No",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Extent of forest land for habitation",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.habitationLand || "0.25 acres",
        confidence: 85,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.habitationLand || "0.25 acres",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Extent of forest land for self-cultivation",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.selfCultivationLand || "2.5 acres",
        confidence: 87,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.selfCultivationLand || "2.5 acres",
        isLocked: false,
        isEdited: false
      },
      {
        field: "Evidence in support",
        extractedValue: SAMPLE_FRA_CLAIM_DATA.evidence || "Residing in the area since 1985, cultivation records",
        confidence: 78,
        verifiedValue: SAMPLE_FRA_CLAIM_DATA.evidence || "Residing in the area since 1985, cultivation records",
        isLocked: false,
        isEdited: false
      }
    ];

    // Add specific fields based on claim type
    if (type === 'community_rights') {
      baseFields.push({
        field: "Community Name",
        extractedValue: "Kumarghat Tribal Community",
        confidence: 92,
        verifiedValue: "Kumarghat Tribal Community",
        isLocked: false,
        isEdited: false
      });
    } else if (type === 'community_forest_resource') {
      baseFields.push({
        field: "Forest Resource Type",
        extractedValue: "NTFP Collection, Grazing Rights",
        confidence: 86,
        verifiedValue: "NTFP Collection, Grazing Rights",
        isLocked: false,
        isEdited: false
      });
    }

    return baseFields;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          FRA Document Extraction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Extraction Progress</span>
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

        {/* Document Preview and Extraction Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">FRA Claim Document</p>
                  <Badge variant="secondary" className="mt-2">
                    {claimType.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                
                {/* Scanning overlay */}
                {isProcessing && progress > 30 && (
                  <div className="absolute inset-0 bg-background/90 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative">
                        <Scan className="h-8 w-8 mx-auto mb-2 animate-pulse text-primary" />
                        <div className="absolute inset-0 animate-ping">
                          <Scan className="h-8 w-8 text-primary/30" />
                        </div>
                      </div>
                      <p className="text-sm">Scanning document...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Extracted Data Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Extracted Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {progress === 100 ? (
                  extractedFields.slice(0, 6).map((field, index) => (
                    <div 
                      key={field.field}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{field.field}</p>
                        <p className="text-sm text-muted-foreground truncate">{field.extractedValue}</p>
                      </div>
                      <Badge 
                        variant={field.confidence > 90 ? "default" : field.confidence > 70 ? "secondary" : "destructive"}
                        className="ml-2"
                      >
                        {field.confidence}%
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Scan className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                    <p>Extracting FRA claim data...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completion Status */}
        {progress === 100 && (
          <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    FRA Document Extraction Complete!
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Successfully extracted {extractedFields.length} fields from the FRA claim document.
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