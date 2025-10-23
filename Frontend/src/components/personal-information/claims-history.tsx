"use client";

import { useState } from "react";
import { DashboardCard } from "./dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Eye, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ClaimsHistoryProps = {
  data: {
    claims: {
      claim_id: string;
      date_submitted: string;
      type: string;
      supporting_docs: string[];
      status: string;
    }[];
    verification_records: {
      officer: string;
      date: string;
      result: string;
      notes: string;
    }[];
  };
};

export function ClaimsHistory({ data }: ClaimsHistoryProps) {
  const [showAllClaims, setShowAllClaims] = useState(false);
  const [expandedVerification, setExpandedVerification] = useState<number | null>(null);

  const displayedClaims = showAllClaims ? data.claims : data.claims.slice(0, 1);

  return (
    <DashboardCard 
      title="Claims & Verification"
      headerContent={
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0.5">
            {data.claims.filter(c => c.status === "Approved").length} Approved
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs px-2 py-0.5">
            {data.claims.filter(c => c.status === "Under Review").length} Pending
          </Badge>
        </div>
      }
    >
      <div className="space-y-3 h-full">
        {/* Latest Claim Summary */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">Latest Claim</h4>
            {data.claims.length > 1 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
                    <Eye size={12} /> View All ({data.claims.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>All Claims</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
                    {data.claims.map((claim) => (
                      <div key={claim.claim_id} className="border rounded-md p-3 bg-card">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">
                            {claim.claim_id} - {claim.type}
                          </div>
                          <Badge 
                            className={
                              claim.status === "Approved" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : claim.status === "Rejected"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }
                            variant="outline"
                          >
                            {claim.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Submitted on {new Date(claim.date_submitted).toLocaleDateString()}
                        </div>
                        {claim.supporting_docs.length > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {claim.supporting_docs.length} Supporting Document(s)
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {claim.supporting_docs.map((doc, index) => (
                                <a
                                  key={index}
                                  href={doc}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                                >
                                  Document {index + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
            
          {/* Display latest claim information */}
          {displayedClaims.map((claim) => (
            <div 
              key={claim.claim_id} 
              className="border rounded-md p-2 bg-card"
            >
              <div className="flex justify-between mb-1">
                <div className="font-medium text-sm">
                  {claim.claim_id} - {claim.type}
                </div>
                <Badge 
                  className={
                    claim.status === "Approved" 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : claim.status === "Rejected"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }
                  variant="outline"
                >
                  {claim.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Submitted on {new Date(claim.date_submitted).toLocaleDateString()}
              </div>
              {claim.supporting_docs.length > 0 && (
                <div className="mt-1 flex items-center gap-1">
                  <FileText size={12} className="text-muted-foreground" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="sm" className="h-5 p-0 text-xs">
                        View {claim.supporting_docs.length} Document(s)
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Supporting Documents</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-2">
                        {claim.supporting_docs.map((doc, index) => (
                          <div key={index} className="border rounded-md p-2 flex items-center justify-between">
                            <span className="text-sm">Document {index + 1}</span>
                            <a
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline text-sm"
                            >
                              View
                            </a>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Verification Summary */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">Verification Records</h4>
            {data.verification_records.length > 1 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
                    <Eye size={12} /> View All ({data.verification_records.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>All Verification Records</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto p-1">
                    {data.verification_records.map((record, index) => (
                      <div 
                        key={index} 
                        className="border rounded-md p-3 bg-card"
                      >
                        <div className="flex justify-between mb-1">
                          <div className="font-medium">Officer: {record.officer}</div>
                          <Badge 
                            className={
                              record.result === "Approved" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                            variant="outline"
                          >
                            {record.result}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Date: {new Date(record.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm italic">{`"${record.notes}"`}</div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
            
          {/* Display latest verification record */}
          {data.verification_records.slice(0, 1).map((record, index) => (
            <div 
              key={index} 
              className="border rounded-md p-2 bg-card"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">{record.officer}</div>
                <Badge 
                  className={
                    record.result === "Approved" 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                  variant="outline"
                >
                  {record.result}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(record.date).toLocaleDateString()}
              </div>
              <div className="text-xs italic mt-1 line-clamp-2">{`"${record.notes}"`}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
