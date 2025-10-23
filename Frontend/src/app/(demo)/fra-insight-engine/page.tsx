"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Search, 
  Mic, 
  MicOff, 
  Send, 
  History, 
  Languages,
  BarChart3,
  MapPin,
  TrendingUp,
  FileText,
  Download,
  Share2,
  Copy,
  Check,
  Users,
  Trees,
  Award,
  Map,
  Sun,
  Moon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BarGraph from "@/components/dashboard/BarGraph";
import LineChart from "@/components/dashboard/LineChart";
import PieChartOne from "@/components/dashboard/PieChartOne";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'voice';
  language: string;
  attachments?: InsightWidget[];
}

interface InsightWidget {
  id: string;
  type: 'chart' | 'map' | 'stat' | 'table';
  title: string;
  data: any;
}

const recentQuestions = [
  { id: 1, text: "Pending FRA claims in Maharashtra", category: "fra" },
  { id: 2, text: "Villages with water scarcity", category: "water" },
  { id: 3, text: "Forest cover changes", category: "forest" },
  { id: 4, text: "Land rights implementation", category: "land" },
  { id: 5, text: "Community forest schemes", category: "schemes" },
  { id: 6, text: "Tribal settlements mapping", category: "land" }
];

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" }
];

export default function FRAInsightPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  // Close history dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock chart data
  const fraClaimsData = [
    { asset: "Approved", value: 8234 },
    { asset: "Pending", value: 4613 },
    { asset: "Rejected", value: 892 },
  ];

  const monthlyProgressData = [
    {
      id: "claims",
      data: [
        { x: "Jan", y: 650 },
        { x: "Feb", y: 720 },
        { x: "Mar", y: 890 },
        { x: "Apr", y: 1200 },
        { x: "May", y: 1450 },
        { x: "Jun", y: 1380 },
      ]
    }
  ];

  const regionDistributionData = [
    { id: "gadchiroli", label: "Gadchiroli", value: 2340, color: "#8884d8" },
    { id: "chandrapur", label: "Chandrapur", value: 1890, color: "#82ca9d" },
    { id: "gondia", label: "Gondia", value: 1567, color: "#ffc658" },
    { id: "yavatmal", label: "Yavatmal", value: 1234, color: "#ff7300" },
  ];

  const handleSearch = async (query: string, isVoice = false) => {
    if (!query.trim()) return;

    // Add to search history if not already present
    if (!searchHistory.includes(query.trim())) {
      setSearchHistory(prev => [query.trim(), ...prev.slice(0, 9)]); // Keep last 10 searches
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date(),
      type: isVoice ? 'voice' : 'text',
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowHistory(false);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(query),
        timestamp: new Date(),
        type: 'text',
        language: selectedLanguage,
        attachments: generateMockWidgets(query)
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (query: string): string => {
    const responses = {
      'fra claims': 'Based on the latest data, there are currently 12,847 pending FRA claims across Maharashtra. The analysis shows significant progress in tribal districts with 68% completion rate in Gadchiroli and 72% in Chandrapur.',
      'water scarcity': 'Water scarcity analysis reveals that 342 villages in the region face acute water shortage. Satellite data indicates 23% decrease in water bodies over the past 5 years.',
      'forest cover': 'Forest cover analysis shows a 15% increase in protected areas over the last decade. However, 8 districts show concerning deforestation patterns near mining areas.',
      'default': 'Analysis completed successfully. The data shows important trends in forest rights implementation across the selected regions. Key indicators suggest positive developments in community participation and land recognition processes.'
    };

    const queryLower = query.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (queryLower.includes(key)) return response;
    }
    return responses.default;
  };

  const generateMockWidgets = (query: string): InsightWidget[] => {
    return [
      {
        id: 'stats-1',
        type: 'stat',
        title: 'Key Statistics',
        data: {
          totalClaims: '12,847',
          approvedClaims: '8,234',
          pendingClaims: '4,613',
          villages: '2,456'
        }
      },
      {
        id: 'chart-1',
        type: 'chart',
        title: 'Claims Progress Over Time',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024'],
          values: [120, 180, 240, 320, 410]
        }
      },
      {
        id: 'map-1', 
        type: 'map',
        title: 'Regional Distribution Map',
        data: {
          regions: [
            { name: 'Gadchiroli', claims: 2340, density: 'high' },
            { name: 'Chandrapur', claims: 1890, density: 'medium' },
            { name: 'Gondia', claims: 1567, density: 'medium' },
            { name: 'Yavatmal', claims: 1234, density: 'low' }
          ]
        }
      }
    ];
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue("Sample voice query about forest rights");
      }, 2000);
    }
  };

  const handleRecentQuestionClick = (question: string) => {
    handleSearch(question);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleBackToSearch = () => {
    setMessages([]);
    setInputValue("");
    setIsLoading(false);
  };

  const handleHistoryItemClick = (historyQuery: string) => {
    setInputValue(historyQuery);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    setShowHistory(false);
  };

  return (
    <ContentLayout title="FRA Insight Engine">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/fra-insight-engine">FRA Insight Engine</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ChatGPT-style Interface */}
      <div className="min-h-[75vh] flex flex-col">
        {/* Messages Area */}
        {hasMessages ? (
          <div className="flex-1 mb-6">
            {/* Back Button and Header */}
            <div className="max-w-6xl mx-auto px-4 mb-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToSearch}
                  className="flex items-center gap-2 hover:bg-gray-50"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Search
                </Button>
                <div className="text-sm text-gray-500">
                  {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                </div>
              </div>
            </div>
            
            <ScrollArea className="h-[60vh]">
              <div className="max-w-6xl mx-auto space-y-6 px-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-full w-full ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white ml-8' 
                        : 'bg-white dark:bg-gray-800 border mr-8'
                    } rounded-lg p-6 shadow-sm`}>
                      <div className="flex items-start gap-3">
                        {message.role === 'assistant' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm mb-4 leading-relaxed">{message.content}</p>
                          
                          {/* Dashboard-style Embedded Widgets */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                              {message.attachments.map((widget) => (
                                <div key={widget.id}>
                                  {widget.type === 'stat' && (
                                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-800 dark:text-blue-200">
                                          <TrendingUp className="h-4 w-4" />
                                          Key Statistics
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                          {Object.entries(widget.data).map(([key, value]) => (
                                            <div key={key} className="text-center bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm">
                                              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{value as string}</div>
                                              <div className="text-xs text-gray-600 dark:text-gray-300 capitalize mt-1">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                  
                                  {widget.type === 'chart' && (
                                    <Card className="col-span-full lg:col-span-2">
                                      <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                          <BarChart3 className="h-4 w-4" />
                                          Claims Status Distribution
                                        </CardTitle>
                                        <CardDescription className="text-xs text-gray-600">
                                          Current status breakdown of FRA claims
                                        </CardDescription>
                                      </CardHeader>
                                      <CardContent className="pt-0 pb-6">
                                        <div className="h-72 w-full flex items-center justify-center p-4">
                                          <div className="w-full max-w-sm mx-auto">
                                            <PieChartOne data={regionDistributionData} />
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                  
                                  {widget.type === 'map' && (
                                    <Card className="col-span-full">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                          <MapPin className="h-4 w-4" />
                                          Regional Distribution Map
                                        </CardTitle>
                                        <CardDescription className="text-xs text-gray-600">
                                          Geographic spread of FRA claims across districts
                                        </CardDescription>
                                      </CardHeader>
                                      <CardContent className="pt-0 pb-6">
                                        <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg relative overflow-hidden border">
                                          {/* Satellite Map Container */}
                                          <div className="absolute inset-2 rounded-md shadow-inner overflow-hidden">
                                            {/* Satellite Map Image */}
                                            <div 
                                              className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                                              style={{
                                                backgroundImage: `url('/images/sample-map.jpg')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                              }}
                                            >
                                              {/* Map Overlay Controls */}
                                              <div className="absolute top-3 right-3 flex gap-1 bg-white rounded-md shadow-lg overflow-hidden">
                                                <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white">
                                                  Satellite
                                                </button>
                                                <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">
                                                  Cadastral
                                                </button>
                                              </div>
                                              
                                              {/* Claims Density Legend */}
                                              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                                                <h5 className="text-xs font-medium mb-2 text-gray-900">Claims Density</h5>
                                                <div className="space-y-1">
                                                  <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                                                    <span className="text-xs text-gray-700">High (2000+)</span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                                    <span className="text-xs text-gray-700">Medium (1000-2000)</span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                                    <span className="text-xs text-gray-700">Low (0-1000)</span>
                                                  </div>
                                                </div>
                                              </div>
                                              
                                              {/* Blue Boundary Overlay (representing the highlighted area) */}
                                              <div className="absolute inset-0">
                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                  <polygon
                                                    points="25,35 60,25 75,55 65,75 35,70 20,50"
                                                    fill="rgba(59, 130, 246, 0.1)"
                                                    stroke="#3b82f6"
                                                    strokeWidth="0.5"
                                                    strokeDasharray="2,2"
                                                    className="animate-pulse"
                                                  />
                                                </svg>
                                              </div>
                                              
                                              {/* Location Markers */}
                                              <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-red-500 rounded-full shadow-lg animate-ping"></div>
                                              <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-500 rounded-full shadow-lg"></div>
                                              <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-green-500 rounded-full shadow-lg"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                </div>
                              ))}
                              
                              {/* Quick Actions */}
                              <div className="col-span-full">
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                                  <Button variant="secondary" size="sm" className="text-xs">
                                    <Languages className="h-3 w-3 mr-1" />
                                    View in Hindi
                                  </Button>
                                  <Button variant="secondary" size="sm" className="text-xs" onClick={handleCopyLink}>
                                    {isCopied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                    {isCopied ? 'Copied!' : 'Share'}
                                  </Button>
                                  <Button variant="secondary" size="sm" className="text-xs">
                                    <Download className="h-3 w-3 mr-1" />
                                    Export PDF
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mr-8 max-w-full w-full">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <span className="text-sm text-gray-500 ml-2">Analyzing FRA data and generating insights...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </div>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trees className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                FRA Insight Engine
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get intelligent insights on Forest Rights Act data, claims processing, and community forest management across India
              </p>
            </div>
          </div>
        )}
        
        {/* Centered Search Bar - ChatGPT Style */}
        <div className={`${hasMessages ? 'border-t bg-white dark:bg-gray-900 py-4' : ''}`}>
          <div className="max-w-6xl mx-auto px-4">
            {/* ChatGPT-style Search Bar */}
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border shadow-sm p-2" ref={searchRef}>
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about FRA claims, forest data, or village information..."
                  className="pl-12 h-14 text-base rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch(inputValue);
                    }
                  }}
                  onFocus={() => setShowHistory(searchHistory.length > 0)}
                />
                
                {/* Search History Dropdown */}
                {showHistory && searchHistory.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    <div className="flex items-center justify-between p-3 border-b">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="text-xs text-gray-500 hover:text-red-500"
                      >
                        Clear All
                      </Button>
                    </div>
                    <div className="py-2">
                      {searchHistory.map((historyItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleHistoryItemClick(historyItem)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
                        >
                          <History className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            {historyItem}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[120px] h-10 rounded-lg">
                  <SelectValue>
                    {languages.find(lang => lang.code === selectedLanguage)?.flag}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceToggle}
                className={`h-10 w-10 rounded-lg ${isRecording ? 'text-red-500 animate-pulse' : ''}`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className={`h-10 w-10 rounded-lg ${showHistory ? 'bg-blue-50 text-blue-600' : ''}`}
                disabled={searchHistory.length === 0}
              >
                <History className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={() => handleSearch(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Recent Questions - Only show when no messages */}
            {!hasMessages && (
              <div className="mt-4 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {recentQuestions.map((question) => (
                    <Button
                      key={question.id}
                      variant="outline"
                      onClick={() => handleRecentQuestionClick(question.text)}
                      className="text-left justify-start h-auto py-4 px-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm mb-2">{question.text}</div>
                        <Badge variant="secondary" className="text-xs">
                          {question.category.toUpperCase()}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
