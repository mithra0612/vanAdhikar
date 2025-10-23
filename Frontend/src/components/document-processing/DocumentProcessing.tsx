'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText } from "lucide-react";
import { DocumentUpload } from "./DocumentUpload";
import { ClaimTypeSelection } from "./ClaimTypeSelection";
import { FRAExtraction } from "./FRAExtraction";
import { FFRAExtraction } from "./FFRAExtraction";
import { DataReview } from "./DataReview";
import { MapProcessing } from "./MapProcessing";
import { FinalReview } from "./FinalReview";
import { WorkflowProgress } from "./WorkflowProgress";
import { 
  DocumentProcessingState, 
  ExtractedField, 
  FFRAPatttaData, 
  ClaimType, 
  ProcessingStep 
} from "./types";

export function DocumentProcessing() {
  const [state, setState] = useState<DocumentProcessingState>({
    currentStep: 'upload',
    selectedClaimType: null,
    uploadedDocument: null,
    documentUrl: '',
    fraClaimData: {},
    ffraPatttaData: {},
    extractedFields: [],
    isProcessing: false,
    allFieldsLocked: false
  });

  // Handle file upload
  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setState(prev => ({
      ...prev,
      uploadedDocument: file,
      documentUrl: url,
      currentStep: 'claim_selection'
    }));
  };

  // Handle claim type selection
  const handleClaimTypeSelect = (claimType: ClaimType) => {
    setState(prev => ({
      ...prev,
      selectedClaimType: claimType,
      currentStep: 'fra_extraction'
    }));
  };

  // Handle FRA extraction completion
  const handleFRAExtractionComplete = (fields: ExtractedField[]) => {
    setState(prev => ({
      ...prev,
      extractedFields: fields,
      currentStep: 'ffra_extraction'
    }));
  };

  // Handle FFRA extraction completion
  const handleFFRAExtractionComplete = (patttaData: FFRAPatttaData) => {
    setState(prev => ({
      ...prev,
      ffraPatttaData: patttaData,
      currentStep: 'review'
    }));
  };

  // Handle field updates in review
  const handleFieldUpdate = (fieldIndex: number, newValue: string) => {
    setState(prev => ({
      ...prev,
      extractedFields: prev.extractedFields.map((field, index) => 
        index === fieldIndex 
          ? { ...field, verifiedValue: newValue, isEdited: true }
          : field
      )
    }));
  };

  // Handle field lock/unlock
  const handleFieldLock = (fieldIndex: number, isLocked: boolean) => {
    setState(prev => ({
      ...prev,
      extractedFields: prev.extractedFields.map((field, index) => 
        index === fieldIndex 
          ? { ...field, isLocked }
          : field
      )
    }));
  };

  // Handle lock all / unlock all
  const handleLockAll = () => {
    setState(prev => ({
      ...prev,
      allFieldsLocked: !prev.allFieldsLocked,
      extractedFields: prev.extractedFields.map(field => ({
        ...field,
        isLocked: !prev.allFieldsLocked
      }))
    }));
  };

  // Handle continue to map processing
  const handleContinueToMap = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'map_processing'
    }));
  };

  // Handle map processing completion
  const handleMapProcessingComplete = () => {
    setState(prev => ({
      ...prev,
      currentStep: 'final_review'
    }));
  };

  // Handle final completion
  const handleComplete = () => {
    // Show completion message or redirect
    alert('Document processing simulation completed successfully!');
    handleReset();
  };

  // Reset workflow
  const handleReset = () => {
    setState({
      currentStep: 'upload',
      selectedClaimType: null,
      uploadedDocument: null,
      documentUrl: '',
      fraClaimData: {},
      ffraPatttaData: {},
      extractedFields: [],
      isProcessing: false,
      allFieldsLocked: false
    });
  };

  return (
    <div className="min-h-screen bg-background py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Forest Rights Act Document Processing
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground px-4 max-w-3xl mx-auto">
            Upload your FRA claim documents, extract data automatically, and process claims with interactive map visualization. 
            
          </p>
        </div>

        {/* Workflow Progress */}
        <div className="mb-6 md:mb-8">
          <WorkflowProgress 
            currentStep={state.currentStep} 
            onReset={handleReset}
            showReset={state.currentStep === 'final_review'}
          />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {state.currentStep === 'upload' && (
            <DocumentUpload onFileUpload={handleFileUpload} />
          )}

          {state.currentStep === 'claim_selection' && (
            <ClaimTypeSelection
              onClaimTypeSelect={handleClaimTypeSelect}
              selectedClaimType={state.selectedClaimType}
            />
          )}

          {state.currentStep === 'fra_extraction' && state.selectedClaimType && (
            <FRAExtraction
              documentUrl={state.documentUrl}
              claimType={state.selectedClaimType}
              onExtractionComplete={handleFRAExtractionComplete}
            />
          )}

          {state.currentStep === 'ffra_extraction' && (
            <FFRAExtraction
              onExtractionComplete={handleFFRAExtractionComplete}
            />
          )}

          {state.currentStep === 'review' && (
            <DataReview
              extractedFields={state.extractedFields}
              onFieldUpdate={handleFieldUpdate}
              onFieldLock={handleFieldLock}
              onLockAll={handleLockAll}
              onContinue={handleContinueToMap}
              allFieldsLocked={state.allFieldsLocked}
            />
          )}

          {state.currentStep === 'map_processing' && (
            <MapProcessing
              patttaData={state.ffraPatttaData as FFRAPatttaData}
              onProcessingComplete={handleMapProcessingComplete}
            />
          )}

          {state.currentStep === 'final_review' && state.selectedClaimType && (
            <FinalReview
              claimType={state.selectedClaimType}
              extractedFields={state.extractedFields}
              patttaData={state.ffraPatttaData as FFRAPatttaData}
              onComplete={handleComplete}
            />
          )}
        </div>


      </div>
    </div>
  );
}