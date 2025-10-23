  "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Share2, 
  FileText, 
  Table, 
  BarChart2,
  Copy,
  Check,
  ArrowRight,
  FileJson
} from "lucide-react";
import { ChatMessage } from "./FRAInsightEngine";

interface ExportPanelProps {
  onExport: (format: string) => void;
  messages?: ChatMessage[];
}

// Function to generate insights from messages
const generateInsights = (messages?: ChatMessage[]) => {
  if (!messages || messages.length === 0) {
    return {
      keyThemes: [],
      stats: [
        { value: "0", label: "Data Points" },
        { value: "0", label: "Maps" },
        { value: "0", label: "Insights" },
      ],
      summary: "No analysis performed yet"
    };
  }
  
  return {
    keyThemes: ["Forest Cover", "Land Rights", "Biodiversity"],
    stats: [
      { value: "78", label: "Data Points" },
      { value: "4", label: "Maps" },
      { value: "12", label: "Insights" },
    ],
    summary: "Analysis of forest cover changes and tribal land rights"
  };
};

export default function ExportPanel({ onExport, messages }: ExportPanelProps) {
  const [isCopied, setIsCopied] = useState(false);
  const insights = generateInsights(messages);

  const exportFormats = [
    { id: "pdf", name: "PDF Report", description: "Complete analysis with maps", icon: FileText },
    { id: "csv", name: "CSV Data", description: "Raw data export", icon: Table },
    { id: "json", name: "JSON", description: "Structured data format", icon: FileJson },
    { id: "charts", name: "Visuals", description: "Charts and maps only", icon: BarChart2 },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/shared/fra-analysis`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 w-full">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-medium">Export Analysis</h2>
      </div>

      {/* Stats Section */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          {insights.stats.map(stat => (
            <div key={stat.label} className="bg-background rounded-md p-3 text-center">
              <p className="text-xl font-semibold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Themes */}
        {insights.keyThemes.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {insights.keyThemes.map(theme => (
              <span key={theme} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="space-y-2 mb-6">
        <h3 className="text-sm font-medium mb-2">Export Format</h3>
        <div className="grid grid-cols-2 gap-2">
          {exportFormats.map(format => (
            <Button 
              key={format.id}
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={() => onExport(format.id)}
            >
              <format.icon className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="text-left">
                <div className="text-sm font-medium">{format.name}</div>
                <div className="text-xs text-muted-foreground">{format.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div>
        <h3 className="text-sm font-medium mb-2">Share</h3>
        <Button 
          variant="secondary" 
          className="w-full justify-start" 
          onClick={handleCopyLink}
        >
          {isCopied ? 
            <Check className="h-4 w-4 mr-2 text-green-500" /> : 
            <Copy className="h-4 w-4 mr-2" />
          }
          {isCopied ? 'Link copied' : 'Copy shareable link'}
        </Button>
      </div>

    </div>
  );
}