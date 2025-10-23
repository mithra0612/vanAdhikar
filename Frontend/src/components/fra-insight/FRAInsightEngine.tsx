"use client";"use client";



import { useState } from "react";import { useState } from "react";

import { SearchInterface } from "./SearchInterface";import { SearchInterface } from "./SearchInterface";

import { ResultFeed } from "./ResultFeed";import { ChatInterface } from "./ChatInterface";

import { HistoryDrawer } from "./HistoryDrawer";import { MapViewer } from "./MapViewer";

import { ThemeToggle } from "./ThemeToggle";import { FrequentlyAsked } from "./FrequentlyAsked";

import { History, Menu } from "lucide-react";import ExportPanel from "./ExportPanel";

import { Button } from "@/components/ui/button";

export interface ChatMessage {

export interface ChatMessage {  id: string;

  id: string;  role: 'user' | 'assistant';

  role: 'user' | 'assistant';  content: string;

  content: string;  timestamp: Date;

  timestamp: Date;  type: 'text' | 'voice';

  type: 'text' | 'voice';  language: string;

  language: string;  attachments?: InsightWidget[];

  attachments?: InsightWidget[];}

}

export interface InsightWidget {

export interface InsightWidget {  id: string;

  id: string;  type: 'chart' | 'map' | 'stat' | 'table';

  type: 'chart' | 'map' | 'stat' | 'table';  title: string;

  title: string;  data: any;

  data: any;  config?: any;

  config?: any;}

}

export interface QuerySuggestion {

export interface QuerySuggestion {  id: string;

  id: string;  text: string;

  text: string;  category: 'fra' | 'land' | 'water' | 'schemes' | 'forest';

  category: 'fra' | 'land' | 'water' | 'schemes' | 'forest';  icon?: string;

  icon?: string;}

}

export function FRAInsightEngine() {

export function FRAInsightEngine() {  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);  const [isLoading, setIsLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [selectedLanguage, setSelectedLanguage] = useState("en");  const [mapVisible, setMapVisible] = useState(false);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);  const [currentQuery, setCurrentQuery] = useState("");

  const [searchHistory, setSearchHistory] = useState<ChatMessage[]>([]);

  const handleNewQuery = async (query: string, isVoice = false) => {

  const handleNewQuery = async (query: string, isVoice = false) => {    const userMessage: ChatMessage = {

    const userMessage: ChatMessage = {      id: Date.now().toString(),

      id: Date.now().toString(),      role: 'user',

      role: 'user',      content: query,

      content: query,      timestamp: new Date(),

      timestamp: new Date(),      type: isVoice ? 'voice' : 'text',

      type: isVoice ? 'voice' : 'text',      language: selectedLanguage

      language: selectedLanguage    };

    };

    setMessages(prev => [...prev, userMessage]);

    setMessages(prev => [...prev, userMessage]);    setIsLoading(true);

    setSearchHistory(prev => {    setCurrentQuery(query);

      const newHistory = [userMessage, ...prev.filter(m => m.role === 'user')];

      return newHistory.slice(0, 20); // Keep last 20 searches    // Simulate AI processing

    });    setTimeout(() => {

    setIsLoading(true);      const assistantMessage: ChatMessage = {

        id: (Date.now() + 1).toString(),

    // Simulate AI response        role: 'assistant',

    setTimeout(() => {        content: generateResponse(query),

      const assistantMessage: ChatMessage = {        timestamp: new Date(),

        id: (Date.now() + 1).toString(),        type: 'text',

        role: 'assistant',        language: selectedLanguage,

        content: generateMockResponse(query),        attachments: generateWidgets(query)

        timestamp: new Date(),      };

        type: 'text',

        language: selectedLanguage,      setMessages(prev => [...prev, assistantMessage]);

        attachments: generateMockWidgets(query)      setIsLoading(false);

      };      

      // Show map if query is location-specific

      setMessages(prev => [...prev, assistantMessage]);      if (query.toLowerCase().includes('village') || 

      setIsLoading(false);          query.toLowerCase().includes('district') || 

    }, 1500);          query.toLowerCase().includes('map')) {

  };        setMapVisible(true);

      }

  const generateMockResponse = (query: string): string => {    }, 2000);

    const responses = {  };

      'fra claims': 'Based on the latest data, there are currently 12,847 pending FRA claims across Maharashtra. The analysis shows significant progress in tribal districts with 68% completion rate in Gadchiroli and 72% in Chandrapur.',

      'water scarcity': 'Water scarcity analysis reveals that 342 villages in the region face acute water shortage. Satellite data indicates 23% decrease in water bodies over the past 5 years.',  const generateResponse = (query: string): string => {

      'forest cover': 'Forest cover analysis shows a 15% increase in protected areas over the last decade. However, 8 districts show concerning deforestation patterns near mining areas.',    const templates = [

      'default': 'Analysis completed successfully. The data shows important trends in forest rights implementation across the selected regions. Key indicators suggest positive developments in community participation and land recognition processes.'      `Based on the comprehensive FRA database analysis for "${query}", I found significant insights across multiple data sources including forest rights records, land use patterns, and scheme implementation data.`,

    };      `Analysis complete for your query about ${query.toLowerCase()}. The data reveals important trends in FRA implementation, claim status, and resource distribution patterns.`,

      `I've processed the query "${query}" against our integrated datasets. Here are the key findings from forest rights, water bodies, and land records analysis.`

    const queryLower = query.toLowerCase();    ];

    for (const [key, response] of Object.entries(responses)) {    return templates[Math.floor(Math.random() * templates.length)];

      if (queryLower.includes(key)) return response;  };

    }

    return responses.default;  const generateWidgets = (query: string): InsightWidget[] => {

  };    const widgets: InsightWidget[] = [];

    

  const generateMockWidgets = (query: string): InsightWidget[] => {    // Always include a summary stat

    const widgets: InsightWidget[] = [];    widgets.push({

      id: `stat-${Date.now()}`,

    // Add chart widget      type: 'stat',

    widgets.push({      title: 'Summary Statistics',

      id: 'chart-1',      data: {

      type: 'chart',        totalRecords: Math.floor(Math.random() * 10000) + 1000,

      title: 'FRA Claims Progress',        coverage: Math.floor(Math.random() * 100) + 1,

      data: {        status: ['Approved', 'Pending', 'Rejected'][Math.floor(Math.random() * 3)]

        labels: ['2020', '2021', '2022', '2023', '2024'],      }

        datasets: [{    });

          label: 'Claims Approved',

          data: [120, 180, 240, 320, 410],    // Add chart for data trends

          backgroundColor: 'rgba(34, 197, 94, 0.8)',    if (query.toLowerCase().includes('trend') || query.toLowerCase().includes('change')) {

          borderColor: 'rgba(34, 197, 94, 1)',      widgets.push({

          borderWidth: 2        id: `chart-${Date.now()}`,

        }]        type: 'chart',

      }        title: 'Trend Analysis',

    });        data: {

          type: 'line',

    // Add stats widget          labels: ['2020', '2021', '2022', '2023', '2024'],

    widgets.push({          values: Array.from({length: 5}, () => Math.floor(Math.random() * 1000))

      id: 'stats-1',        }

      type: 'stat',      });

      title: 'Key Statistics',    }

      data: {

        totalClaims: '12,847',    // Add map for location queries

        approvedClaims: '8,234',    if (query.toLowerCase().includes('village') || query.toLowerCase().includes('district')) {

        pendingClaims: '4,613',      widgets.push({

        rejectedClaims: '892'        id: `map-${Date.now()}`,

      }        type: 'map',

    });        title: 'Geographic Distribution',

        data: {

    // Add map widget          center: [20.5937, 78.9629], // India center

    widgets.push({          zoom: 6,

      id: 'map-1',          markers: Array.from({length: 5}, (_, i) => ({

      type: 'map',            id: i,

      title: 'Regional Distribution',            lat: 20 + Math.random() * 10,

      data: {            lng: 75 + Math.random() * 10,

        center: [19.7515, 75.7139], // Maharashtra center            title: `Location ${i + 1}`

        zoom: 7,          }))

        markers: [        }

          { lat: 19.9975, lng: 73.7898, title: 'Mumbai', value: 234 },      });

          { lat: 18.5204, lng: 73.8567, title: 'Pune', value: 567 },    }

          { lat: 21.1458, lng: 79.0882, title: 'Nagpur', value: 890 }

        ]    return widgets;

      }  };

    });

  const clearChat = () => {

    return widgets;    setMessages([]);

  };    setCurrentQuery("");

    setMapVisible(false);

  const handleHistoryItemClick = (message: ChatMessage) => {  };

    setIsHistoryOpen(false);

    handleNewQuery(message.content, message.type === 'voice');  return (

  };    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="max-w-7xl mx-auto p-4 space-y-6">

  const hasMessages = messages.length > 0;        {/* Search Interface - Always at top */}

        <SearchInterface 

  return (          onQuery={handleNewQuery}

    <div className="min-h-screen bg-background">          language={selectedLanguage}

      {/* Header */}          onLanguageChange={setSelectedLanguage}

      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">          isLoading={isLoading}

        <div className="container max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">        />

          <Button

            variant="ghost"        {/* Main Content Area */}

            size="sm"        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            onClick={() => setIsHistoryOpen(true)}          {/* Chat Interface - Main area */}

            className="flex items-center gap-2"          <div className="lg:col-span-3 space-y-4">

          >            <ChatInterface 

            <History className="h-4 w-4" />              messages={messages}

            <span className="hidden sm:inline">History</span>              isLoading={isLoading}

          </Button>              onClear={clearChat}

                        currentQuery={currentQuery}

          <h1 className="text-lg font-semibold hidden sm:block">FRA Insight Engine</h1>            />

                    </div>

          <ThemeToggle />

        </div>          {/* Right Sidebar */}

      </div>          <div className="space-y-4">

            {/* Map Viewer */}

      {/* Main Content */}            {mapVisible && (

      <div className="pt-16 pb-8">              <MapViewer 

        <div className="container max-w-6xl mx-auto px-4 h-full">                visible={mapVisible}

          <div className={`transition-all duration-500 ${hasMessages ? 'h-full' : 'h-[calc(100vh-8rem)] flex items-center justify-center'}`}>                onToggle={() => setMapVisible(!mapVisible)}

                            query={currentQuery}

            {/* Results Feed - appears above search when there are messages */}              />

            {hasMessages && (            )}

              <div className="mb-8">

                <ResultFeed            {/* Frequently Asked */}

                  messages={messages}            <FrequentlyAsked 

                  isLoading={isLoading}              onQuerySelect={handleNewQuery}

                  onExport={(format) => console.log('Export:', format)}              language={selectedLanguage}

                />            />

              </div>

            )}            {/* Export Panel */}

            <ExportPanel 

            {/* Search Interface - centered initially, moves to bottom when results appear */}              messages={messages}

            <div className={`${hasMessages ? 'sticky bottom-8' : ''}`}>              onExport={(format) => console.log('Exporting format:', format)}

              <SearchInterface            />

                onSearch={handleNewQuery}          </div>

                isLoading={isLoading}        </div>

                selectedLanguage={selectedLanguage}      </div>

                onLanguageChange={setSelectedLanguage}    </div>

                hasMessages={hasMessages}  );

              />}
            </div>
          </div>
        </div>
      </div>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={searchHistory}
        onHistoryItemClick={handleHistoryItemClick}
      />
    </div>
  );
}