"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PattaDetailsProps = {
  data: {
    patta_id: string;
    status: string;
    area_ha: number;
    issued_date: string;
    document_url: string;
    ocr_confidence: number;
  };
};

export function PattaDetails({ data }: PattaDetailsProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Patta Details</h3>
          <Badge 
            className={
              data.status === "Granted" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : data.status === "Rejected"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }
            variant="outline"
          >
            {data.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-xs text-muted-foreground">Patta ID</span>
            <p className="text-sm font-medium">{data.patta_id}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Area</span>
            <p className="text-sm font-medium">{data.area_ha} ha</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Issued</span>
            <p className="text-sm font-medium">{new Date(data.issued_date).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">OCR Confidence</span>
            <p className="text-sm font-medium">{data.ocr_confidence}%</p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full mt-3 gap-2">
              <FileText size={14} />
              View Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Patta Document</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                <iframe 
                  src={data.document_url} 
                  className="w-full h-full rounded-md"
                  title="Patta Document"
                ></iframe>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{data.patta_id}</div>
                  <div className="text-xs text-muted-foreground">Issued: {new Date(data.issued_date).toLocaleDateString()}</div>
                </div>
                <a 
                  href={data.document_url} 
                  download
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-primary hover:text-primary/80 underline"
                >
                  Download
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
