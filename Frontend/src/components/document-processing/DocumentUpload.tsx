'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
}

export function DocumentUpload({ onFileUpload }: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
      setIsProcessing(true);
      setTimeout(() => {
        onFileUpload(file);
        setIsProcessing(false);
      }, 500);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload FRA Claim Document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver ? 'border-primary bg-primary/10' : 'border-border'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Upload Your FRA Claim Document</h3>
          <p className="text-base text-muted-foreground mb-4 px-2">
            Drag and drop your Forest Rights Act claim document here, or click to browse
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" disabled={isProcessing} className="w-full sm:w-auto">
              {isProcessing ? 'Processing...' : 'Choose File'}
            </Button>
          </label>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: PDF, JPG, PNG (Max 10MB)
          </p>
        </div>

        {/* Sample Documents for Tripura */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-lg text-foreground text-center">Try with Sample Documents (Tripura)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                name: "Kumarghat", 
                type: "PDF",
                description: "Sample FRA individual forest land rights application from Unakoti district",
                location: "Unakoti District"
              },
              { 
                name: "Agartala", 
                type: "PDF",
                description: "Sample community forest rights management application from West Tripura",
                location: "West Tripura District"
              },
              { 
                name: "Dharmanagar", 
                type: "PDF",
                description: "Sample community forest resource access application from North Tripura",
                location: "North Tripura District"
              }
            ].map((doc, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-5 border border-border rounded-lg cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-200 group"
                onClick={() => {
                  // Create a mock file for demo
                  const mockFile = new File([''], doc.name, { type: 'application/pdf' });
                  Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 });
                  handleFileSelect(mockFile);
                }}
              >
                <div className="text-center mb-3">
                  <FileText className="h-10 w-10 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {doc.type}
                  </span>
                </div>
                <h5 className="font-semibold text-sm text-foreground mb-2 text-center leading-tight">{doc.name}</h5>
                <p className="text-xs text-muted-foreground mb-2 text-center leading-relaxed">{doc.description}</p>
                <div className="text-center">
                  <span className="text-xs text-primary font-medium">📍 {doc.location}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Click on any sample document to start the processing workflow
          </p>
        </div>

        {/* Information about document types */}
        <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Accepted Document Types:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Forest Rights Act (FRA) Claim Forms</li>
              <li>• Community Forest Rights Applications</li>
              <li>• Individual Forest Land Rights Claims</li>
              <li>• Forest Resource Access Claims</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}