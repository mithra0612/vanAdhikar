'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileText, Users, Calendar, CheckCircle, Download, Share } from "lucide-react";
import { ExtractedField, FFRAPatttaData, ClaimType } from "./types";
import Link from "next/link";

interface FinalReviewProps {
  claimType: ClaimType;
  extractedFields: ExtractedField[];
  patttaData: FFRAPatttaData;
  onComplete: () => void;
}

export function FinalReview({ claimType, extractedFields, patttaData, onComplete }: FinalReviewProps) {
  const getClaimTypeDisplay = (type: ClaimType) => {
    switch (type) {
      case 'individual_rights':
        return 'Individual Forest Land Rights';
      case 'community_rights':
        return 'Community Forest Rights';
      case 'community_forest_resource':
        return 'Community Forest Resource Rights';
      default:
        return 'Forest Rights Claim';
    }
  };

  const getClaimTypeIcon = (type: ClaimType) => {
    switch (type) {
      case 'individual_rights':
        return FileText;
      case 'community_rights':
        return Users;
      case 'community_forest_resource':
        return Users;
      default:
        return FileText;
    }
  };

  const ClaimIcon = getClaimTypeIcon(claimType);

  // Extract key fields for display
  const keyFields = {
    claimantName: extractedFields.find(f => f.field.toLowerCase().includes('claimant'))?.verifiedValue || 'N/A',
    village: extractedFields.find(f => f.field.toLowerCase().includes('village'))?.verifiedValue || 'N/A',
    district: extractedFields.find(f => f.field.toLowerCase().includes('district'))?.verifiedValue || 'N/A',
    scheduledTribe: extractedFields.find(f => f.field.toLowerCase().includes('scheduled tribe'))?.verifiedValue || 'N/A',
    habitationLand: extractedFields.find(f => f.field.toLowerCase().includes('habitation'))?.verifiedValue || 'N/A',
    cultivationLand: extractedFields.find(f => f.field.toLowerCase().includes('cultivation'))?.verifiedValue || 'N/A'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Final Document Review
        </CardTitle>
        <p className="text-muted-foreground">
          Review all processed information before completing the document scanning simulation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Claim Type Summary */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <ClaimIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{getClaimTypeDisplay(claimType)}</h3>
                <p className="text-sm text-muted-foreground">Forest Rights Act Claim - Tripura</p>
              </div>
              <div className="ml-auto">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Processing Complete
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Map and Location Data */}
          <div className="flex flex-col h-full">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Map & Location Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Map Preview */}
                <div className="relative bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-repeat" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zm-8 0c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-12 border-2 border-red-500 bg-red-100 dark:bg-red-900/50 rounded-sm relative">
                      <MapPin className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-4 w-4 text-red-500" />
                    </div>
                  </div>
                  <Link href="/atlas/demomap" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                  <button
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white px-3 py-1 rounded shadow-lg text-sm font-medium"
                  >
                    Go to Map
                  </button>
                </div>

                {/* Location Details */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">DSS Click Box:</span>
                      <span className="text-sm font-mono">{patttaData.dssClickBox}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Coordinates:</span>
                      <span className="text-sm font-mono">
                        {patttaData.coordinates.latitude}°N, {patttaData.coordinates.longitude}°E
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Patta No:</span>
                      <span className="text-sm font-mono">{patttaData.pattNo}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm">{patttaData.name}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium">Village:</span>
                      <span className="text-sm">{patttaData.village}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Claim Details */}
          <div className="flex flex-col space-y-6">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Extracted Claim Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">Claimant Name</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">{keyFields.claimantName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-xs font-medium text-green-900 dark:text-green-100 mb-1">Village</p>
                        <p className="text-sm text-green-700 dark:text-green-300">{keyFields.village}</p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-xs font-medium text-purple-900 dark:text-purple-100 mb-1">District</p>
                        <p className="text-sm text-purple-700 dark:text-purple-300">{keyFields.district}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                      <p className="text-xs font-medium text-orange-900 dark:text-orange-100 mb-1">Scheduled Tribe Status</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300">{keyFields.scheduledTribe}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-lg border border-teal-200 dark:border-teal-800">
                        <p className="text-xs font-medium text-teal-900 dark:text-teal-100 mb-1">Habitation Land</p>
                        <p className="text-sm text-teal-700 dark:text-teal-300">{keyFields.habitationLand}</p>
                      </div>
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        <p className="text-xs font-medium text-indigo-900 dark:text-indigo-100 mb-1">Cultivation Land</p>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">{keyFields.cultivationLand}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    View Full Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access complete claimant information and detailed personal records
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    DSS Engine Option
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Advanced spatial analysis tools and mapping utilities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Processing Summary */}
        <Card className="bg-gray-50 dark:bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-base">Processing Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{extractedFields.length}</p>
                <p className="text-sm text-muted-foreground">Fields Extracted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{extractedFields.filter(f => f.isLocked).length}</p>
                <p className="text-sm text-muted-foreground">Fields Verified</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{extractedFields.filter(f => f.isEdited).length}</p>
                <p className="text-sm text-muted-foreground">Fields Edited</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(extractedFields.reduce((acc, f) => acc + f.confidence, 0) / extractedFields.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timestamp and Reference */}
        <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Document Processing Completed
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {new Date().toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Simulation Complete
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onComplete} className="px-8">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Document Scanning
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            <Share className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}