'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Scan, MapPin, Edit3, CheckCircle, RotateCcw } from "lucide-react";
import { ProcessingStep } from "./types";

interface WorkflowProgressProps {
  currentStep: ProcessingStep;
  onReset: () => void;
  showReset?: boolean;
}

export function WorkflowProgress({ currentStep, onReset, showReset = false }: WorkflowProgressProps) {
  const workflowSteps = [
    { 
      id: 'upload', 
      title: 'Upload Document', 
      description: 'Upload FRA claim document', 
      icon: Upload 
    },
    { 
      id: 'claim_selection', 
      title: 'Select Claim Type', 
      description: 'Choose claim category', 
      icon: FileText 
    },
    { 
      id: 'fra_extraction', 
      title: 'FRA Extraction', 
      description: 'Extract claim data', 
      icon: Scan 
    },
    { 
      id: 'ffra_extraction', 
      title: 'FFRA Processing', 
      description: 'Process patta details', 
      icon: MapPin 
    },
    { 
      id: 'review', 
      title: 'Review Data', 
      description: 'Verify extracted data', 
      icon: Edit3 
    },
    { 
      id: 'map_processing', 
      title: 'Map Processing', 
      description: 'Generate visualization', 
      icon: MapPin 
    },
    { 
      id: 'final_review', 
      title: 'Final Review', 
      description: 'Complete processing', 
      icon: CheckCircle 
    }
  ] as const;

  const getCurrentStepIndex = () => {
    return workflowSteps.findIndex(step => step.id === currentStep);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">FRA Document Processing Workflow</h3>
            <p className="text-sm text-muted-foreground">Track your document processing progress</p>
          </div>
          {showReset && (
            <Button onClick={onReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          )}
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= getCurrentStepIndex();
            const isCurrent = step.id === currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                  isActive 
                    ? isCurrent
                      ? 'bg-primary border-primary text-primary-foreground animate-pulse'
                      : 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-muted-foreground'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-primary/80' : 'text-muted-foreground'}`}>
                    {step.description}
                  </p>
                  {isCurrent && (
                    <Badge className="mt-1 text-xs">Current</Badge>
                  )}
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 ${
                    index < getCurrentStepIndex() ? 'bg-primary' : 'bg-border'
                  }`} style={{ transform: 'translateX(50%)', zIndex: -1 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-4 gap-4">
            {workflowSteps.slice(0, 4).map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= getCurrentStepIndex();
              const isCurrent = step.id === currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all mb-2 ${
                    isActive 
                      ? isCurrent
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background border-border text-muted-foreground'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                  {isCurrent && (
                    <Badge className="mt-1 text-xs">Current</Badge>
                  )}
                </div>
              );
            })}
          </div>
          {workflowSteps.length > 4 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {workflowSteps.slice(4).map((step, index) => {
                const Icon = step.icon;
                const actualIndex = index + 4;
                const isActive = actualIndex <= getCurrentStepIndex();
                const isCurrent = step.id === currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all mb-2 ${
                      isActive 
                        ? isCurrent
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-primary border-primary text-primary-foreground'
                        : 'bg-background border-border text-muted-foreground'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    {isCurrent && (
                      <Badge className="mt-1 text-xs">Current</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= getCurrentStepIndex();
            const isCurrent = step.id === currentStep;
            
            return (
              <div key={step.id} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                isCurrent ? 'bg-primary/10 border border-primary/20' : ''
              }`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  isActive 
                    ? isCurrent
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-muted-foreground'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-primary/80' : 'text-muted-foreground'}`}>
                    {step.description}
                  </p>
                </div>
                {isCurrent && (
                  <Badge className="text-xs">Current</Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}