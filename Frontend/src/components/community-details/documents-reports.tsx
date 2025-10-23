"use client";

import { DashboardCard } from "@/components/personal-information/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ChevronRight, 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  Download, 
  FileCheck,
  Search,
  File
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type DocumentType = {
  doc_id: string;
  title: string;
  type: "pdf" | "image" | "spreadsheet" | "text" | "other";
  category: string;
  uploaded_date: string;
  uploaded_by: string;
  size_kb: number;
  description?: string;
};

type DocumentsReportsProps = {
  documents: DocumentType[];
};

export function DocumentsReports({ documents }: DocumentsReportsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getDocumentIcon = (type: string) => {
    switch(type) {
      case "pdf": return <File className="h-4 w-4 text-red-500" />;
      case "image": return <FileImage className="h-4 w-4 text-blue-500" />;
      case "spreadsheet": return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
      case "text": return <FileText className="h-4 w-4 text-yellow-500" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  const formatFileSize = (sizeKb: number) => {
    if (sizeKb < 1024) {
      return `${sizeKb} KB`;
    } else {
      return `${(sizeKb / 1024).toFixed(1)} MB`;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group documents by category for the summary view
  const documentsByCategory = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <DashboardCard 
      title="Documents & Reports" 
      headerContent={
        <Badge variant="outline" className="flex items-center gap-1">
          <FileCheck className="h-3 w-3" /> {documents.length} files
        </Badge>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(documentsByCategory).slice(0, 4).map(([category, count]) => (
            <div 
              key={category}
              className="border rounded-md p-2 flex flex-col items-center justify-center"
            >
              <FileText className="h-5 w-5 text-blue-500 mb-1" />
              <div className="font-medium text-sm truncate max-w-full">{category}</div>
              <div className="text-xs text-muted-foreground">{count} documents</div>
            </div>
          ))}
        </div>
        
        <div className="border rounded-md p-3">
          <div className="font-medium mb-2">Recent Documents</div>
          <div className="space-y-2">
            {documents.slice(0, 3).map(doc => (
              <div key={doc.doc_id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {getDocumentIcon(doc.type)}
                  <div className="truncate max-w-[180px]">{doc.title}</div>
                </div>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              View All Documents <ChevronRight className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Documents & Reports</DialogTitle>
            </DialogHeader>
            
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No documents found matching "{searchTerm}"
                </div>
              ) : (
                filteredDocuments.map(doc => (
                  <div key={doc.doc_id} className="border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getDocumentIcon(doc.type)}
                        <div className="font-medium">{doc.title}</div>
                      </div>
                      <Badge variant="outline">{doc.category}</Badge>
                    </div>
                    
                    <div className="mt-2 text-sm text-muted-foreground">
                      {doc.description || "No description available"}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                      <div>Uploaded by {doc.uploaded_by} on {formatDate(doc.uploaded_date)}</div>
                      <div>{formatFileSize(doc.size_kb)}</div>
                    </div>
                    
                    <div className="flex justify-end mt-3 gap-2">
                      <Button size="sm" variant="outline">Preview</Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex justify-end mt-4">
              <Button className="flex items-center gap-1">
                Upload New Document <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardCard>
  );
}
