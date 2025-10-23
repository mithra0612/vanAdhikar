"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Download, Files } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DocumentsProps = {
  data: {
    documents: {
      id: string;
      type: string;
      url: string;
      uploaded_by: string;
      upload_date: string;
    }[];
  };
};

export function Documents({ data }: DocumentsProps) {
  // Group documents by type
  const documentsByType: Record<string, typeof data.documents> = {};
  data.documents.forEach(doc => {
    if (!documentsByType[doc.type]) {
      documentsByType[doc.type] = [];
    }
    documentsByType[doc.type].push(doc);
  });

  // Get document types for display
  const documentTypes = Object.keys(documentsByType);

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Documents</h3>
          <span className="text-sm text-muted-foreground">{data.documents.length} files</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {documentTypes.map((type) => (
            <Dialog key={type}>
              <DialogTrigger asChild>
                <div className="border rounded-md p-3 hover:bg-muted/30 cursor-pointer transition-colors">
                  <div className="h-8 w-8 rounded flex items-center justify-center bg-muted/50 mx-auto mb-2">
                    {type.toLowerCase().includes('photo') ? (
                      <Image className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs font-medium text-center truncate">{type}</p>
                  <p className="text-xs text-muted-foreground text-center">
                    {documentsByType[type].length} file{documentsByType[type].length !== 1 ? 's' : ''}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{type} Documents</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pt-2">
                  {documentsByType[type].map((doc) => (
                    <div 
                      key={doc.id} 
                      className="border rounded-md p-3 flex items-center gap-3 bg-card"
                    >
                      <div className="h-10 w-10 rounded flex items-center justify-center bg-muted">
                        {doc.type.toLowerCase().includes('photo') || doc.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <Image className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{doc.id}</p>
                        <div className="flex flex-col text-xs text-muted-foreground">
                          <span>Uploaded by {doc.uploaded_by}</span>
                          <span>{new Date(doc.upload_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild className="flex-shrink-0">
                        <a href={doc.url} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          ))}
          
          <Dialog>
            <DialogTrigger asChild>
              <div className="border rounded-md border-dashed p-3 hover:bg-muted/30 cursor-pointer transition-colors flex flex-col items-center justify-center">
                <div className="h-8 w-8 rounded flex items-center justify-center mb-2">
                  <Files className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs font-medium text-center">View All Documents</p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>All Documents</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto pt-2">
                {data.documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="border rounded-md p-3 flex items-center gap-3 bg-card"
                  >
                    <div className="h-10 w-10 rounded flex items-center justify-center bg-muted">
                      {doc.type.toLowerCase().includes('photo') || doc.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                        <Image className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="font-medium truncate">{doc.type}</p>
                      </div>
                      <div className="flex flex-col text-xs text-muted-foreground">
                        <span>{doc.id}</span>
                        <div className="flex items-center gap-1">
                          <span>{doc.uploaded_by}</span>
                          <span>•</span>
                          <span>{new Date(doc.upload_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild className="flex-shrink-0">
                      <a href={doc.url} download target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
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
