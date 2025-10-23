"use client";
import React, { useState } from "react";
import { Search, Download, ArrowLeft } from "lucide-react";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import ClaimSidebarWrapper from "@/components/claims/claimSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define a type for table rows
type TableRow = {
  id: number;
  name: string;
  type: string;
  schemes: { name: string; priority: string; enrolled: boolean }[];
  // Sidebar fields
  village: string;
  gramPanchayat: string;
  taluk: string;
  district: string;
  claimType: "IFR" | "CR" | "CFR";
  status: "Approved" | "Rejected" | "Pending";
  timeline: { status: "Approved" | "Rejected" | "Pending"; date: string }[];
  stFdst: boolean;
  otfd: boolean;
};

// Sample Data (25 entries)
const sampleData: TableRow[] = [
  {
    id: 1,
    name: "Ravi Kumar",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "high", enrolled: true },
      { name: "Scheme 2A", priority: "mid", enrolled: false },
    ],
    village: "Rampur",
    gramPanchayat: "Rampur GP",
    taluk: "Taluk 1",
    district: "District X",
    claimType: "IFR",
    status: "Approved",
    timeline: [
      { status: "Pending", date: "2024-01-10" },
      { status: "Approved", date: "2024-02-15" },
    ],
    stFdst: true,
    otfd: false,
  },
  {
    id: 2,
    name: "Sita Devi",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "low", enrolled: true },
      { name: "Scheme 2B", priority: "high", enrolled: true },
    ],
    village: "Lakshmanpur",
    gramPanchayat: "Lakshmanpur GP",
    taluk: "Taluk 2",
    district: "District Y",
    claimType: "CR",
    status: "Pending",
    timeline: [{ status: "Pending", date: "2024-03-01" }],
    stFdst: false,
    otfd: true,
  },
  {
    id: 3,
    name: "Amit Singh",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "high", enrolled: false },
      { name: "Scheme 2A", priority: "mid", enrolled: true },
    ],
    village: "Singhpur",
    gramPanchayat: "Singhpur GP",
    taluk: "Taluk 3",
    district: "District Z",
    claimType: "CFR",
    status: "Rejected",
    timeline: [
      { status: "Pending", date: "2024-02-01" },
      { status: "Rejected", date: "2024-03-10" },
    ],
    stFdst: false,
    otfd: false,
  },
  {
    id: 4,
    name: "Meena Sharma",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "mid", enrolled: true },
      { name: "Scheme 2B", priority: "low", enrolled: false },
    ],
    village: "Sharmapur",
    gramPanchayat: "Sharmapur GP",
    taluk: "Taluk 4",
    district: "District W",
    claimType: "IFR",
    status: "Pending",
    timeline: [{ status: "Pending", date: "2024-04-01" }],
    stFdst: true,
    otfd: false,
  },
  {
    id: 5,
    name: "Ramesh Yadav",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "high", enrolled: true },
      { name: "Scheme 2A", priority: "mid", enrolled: true },
    ],
    village: "Yadavpur",
    gramPanchayat: "Yadavpur GP",
    taluk: "Taluk 5",
    district: "District V",
    claimType: "CFR",
    status: "Approved",
    timeline: [
      { status: "Pending", date: "2024-05-01" },
      { status: "Approved", date: "2024-06-10" },
    ],
    stFdst: false,
    otfd: true,
  },
  {
    id: 6,
    name: "Sunita Patel",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "mid", enrolled: false },
      { name: "Scheme 2B", priority: "high", enrolled: true },
    ],
    village: "Patelpur",
    gramPanchayat: "Patelpur GP",
    taluk: "Taluk 25",
    district: "District A",
    claimType: "CR",
    status: "Rejected",
    timeline: [
      { status: "Pending", date: "2024-07-01" },
      { status: "Rejected", date: "2024-08-10" },
    ],
    stFdst: true,
    otfd: false,
  },
  {
    id: 7,
    name: "Anil Kumar",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "mid", enrolled: true },
      { name: "Scheme 2A", priority: "low", enrolled: false },
    ],
    village: "Kumarpur",
    gramPanchayat: "Kumarpur GP",
    taluk: "Taluk 6",
    district: "District B",
    claimType: "IFR",
    status: "Approved",
    timeline: [
      { status: "Pending", date: "2024-06-01" },
      { status: "Approved", date: "2024-07-15" },
    ],
    stFdst: true,
    otfd: true,
  },
  {
    id: 8,
    name: "Priya Singh",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "high", enrolled: true },
      { name: "Scheme 2B", priority: "mid", enrolled: true },
    ],
    village: "Singhpura",
    gramPanchayat: "Singhpura GP",
    taluk: "Taluk 7",
    district: "District C",
    claimType: "CR",
    status: "Pending",
    timeline: [{ status: "Pending", date: "2024-08-01" }],
    stFdst: false,
    otfd: false,
  },
  {
    id: 9,
    name: "Rajeshwari Devi",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "low", enrolled: false },
      { name: "Scheme 2A", priority: "high", enrolled: true },
    ],
    village: "Rajapur",
    gramPanchayat: "Rajapur GP",
    taluk: "Taluk 8",
    district: "District D",
    claimType: "CFR",
    status: "Rejected",
    timeline: [
      { status: "Pending", date: "2024-09-01" },
      { status: "Rejected", date: "2024-09-15" },
    ],
    stFdst: false,
    otfd: true,
  },
  {
    id: 10,
    name: "Vikram Sharma",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "mid", enrolled: true },
      { name: "Scheme 2B", priority: "high", enrolled: true },
    ],
    village: "Sharmapur",
    gramPanchayat: "Sharmapur GP",
    taluk: "Taluk 9",
    district: "District E",
    claimType: "IFR",
    status: "Approved",
    timeline: [
      { status: "Pending", date: "2024-10-01" },
      { status: "Approved", date: "2024-10-20" },
    ],
    stFdst: true,
    otfd: false,
  },
  {
    id: 11,
    name: "Deepak Yadav",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "high", enrolled: true },
      { name: "Scheme 2A", priority: "mid", enrolled: false },
    ],
    village: "Yadavpur",
    gramPanchayat: "Yadavpur GP",
    taluk: "Taluk 10",
    district: "District F",
    claimType: "CFR",
    status: "Pending",
    timeline: [{ status: "Pending", date: "2024-11-01" }],
    stFdst: false,
    otfd: true,
  },
  {
    id: 12,
    name: "Kavita Patel",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "low", enrolled: true },
      { name: "Scheme 2B", priority: "mid", enrolled: true },
    ],
    village: "Patelpur",
    gramPanchayat: "Patelpur GP",
    taluk: "Taluk 11",
    district: "District G",
    claimType: "CR",
    status: "Rejected",
    timeline: [
      { status: "Pending", date: "2024-12-01" },
      { status: "Rejected", date: "2024-12-10" },
    ],
    stFdst: true,
    otfd: false,
  },
  {
    id: 13,
    name: "Arjun Singh",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "mid", enrolled: true },
      { name: "Scheme 2A", priority: "low", enrolled: false },
    ],
    village: "Singhpur",
    gramPanchayat: "Singhpur GP",
    taluk: "Taluk 12",
    district: "District H",
    claimType: "IFR",
    status: "Approved",
    timeline: [
      { status: "Pending", date: "2025-01-01" },
      { status: "Approved", date: "2025-01-20" },
    ],
    stFdst: false,
    otfd: true,
  },
  {
    id: 14,
    name: "Rina Sharma",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "high", enrolled: true },
      { name: "Scheme 2B", priority: "mid", enrolled: false },
    ],
    village: "Sharmapur",
    gramPanchayat: "Sharmapur GP",
    taluk: "Taluk 13",
    district: "District I",
    claimType: "CR",
    status: "Pending",
    timeline: [{ status: "Pending", date: "2025-02-01" }],
    stFdst: true,
    otfd: false,
  },
  {
    id: 15,
    name: "Vijay Kumar",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "low", enrolled: true },
      { name: "Scheme 2A", priority: "high", enrolled: true },
    ],
    village: "Kumarpur",
    gramPanchayat: "Kumarpur GP",
    taluk: "Taluk 14",
    district: "District J",
    claimType: "CFR",
    status: "Rejected",
    timeline: [
      { status: "Pending", date: "2025-03-01" },
      { status: "Rejected", date: "2025-03-15" },
    ],
    stFdst: false,
    otfd: true,
  },
  {
    id: 16,
    name: "Anita Devi",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "mid", enrolled: true },
      { name: "Scheme 2B", priority: "low", enrolled: false },
    ],
    village: "Lakshmanpur",
    gramPanchayat: "Lakshmanpur GP",
    taluk: "Taluk 15",
    district: "District K",
    claimType: "IFR",
    status: "Approved",
    timeline: [
      { status: "Pending", date: "2025-04-01" },
      { status: "Approved", date: "2025-04-20" },
    ],
    stFdst: true,
    otfd: false,
  },
  {
    id: 17,
    name: "Rohit Singh",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "high", enrolled: false },
      { name: "Scheme 2A", priority: "mid", enrolled: true },
    ],
    village: "Singhpur",
    gramPanchayat: "Singhpur GP",
    taluk: "Taluk 16",
    district: "District L",
    claimType: "CR",
    status: "Pending",
    timeline: [{ status: "Pending", date: "2025-05-01" }],
    stFdst: false,
    otfd: true,
  },
  {
    id: 18,
    name: "Seema Yadav",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "mid", enrolled: true },
      { name: "Scheme 2B", priority: "high", enrolled: true },
    ],
    village: "Yadavpur",
    gramPanchayat: "Yadavpur GP",
    taluk: "Taluk 17",
    district: "District M",
    claimType: "CFR",
    status: "Rejected",
    timeline: [
      { status: "Pending", date: "2025-06-01" },
      { status: "Rejected", date: "2025-06-10" },
    ],
    stFdst: true,
    otfd: false,
  },
  {
    id: 19,
    name: "Ajay Kumar",
    type: "Type A",
    schemes: [
      { name: "Scheme 1A", priority: "low", enrolled: true },
      { name: "Scheme 2A", priority: "mid", enrolled: false },
    ],
    village: "Kumarpur",
    gramPanchayat: "Kumarpur GP",
    taluk: "Taluk 18",
    district: "District N",
    claimType: "IFR",
    status: "Approved",
    timeline: [
      { status: "Pending", date: "2025-07-01" },
      { status: "Approved", date: "2025-07-20" },
    ],
    stFdst: false,
    otfd: true,
  },
  {
    id: 20,
    name: "Priyanka Sharma",
    type: "Type B",
    schemes: [
      { name: "Scheme 1B", priority: "high", enrolled: true },
      { name: "Scheme 2B", priority: "low", enrolled: false },
    ],
    village: "Sharmapur",
    gramPanchayat: "Sharmapur GP",
    taluk: "Taluk 19",
    district: "District O",
    claimType: "CR",
    status: "Pending",
    timeline: [{ status: "Pending", date: "2025-08-01" }],
    stFdst: true,
    otfd: false,
  },
];

// Helper to get badge color classes
function getStatusBadgeColor(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

// Function to get full claim type name
function getClaimTypeFullName(type: string) {
  switch (type) {
    case "IFR":
      return "Individual Forest Rights";
    case "CR":
      return "Community Rights";
    case "CFR":
      return "Community Forest Resource Rights";
    default:
      return type;
  }
}

// Helper to get the current process stage from timeline
function getCurrentProcessStage(timeline: { status: string; date: string }[]) {
  // Example mapping: you can adjust this mapping as per your process
  // If timeline has more than one entry, assume the last status is the current stage
  if (!timeline || timeline.length === 0) return "Gram Panchayat";
  const lastStatus = timeline[timeline.length - 1].status;
  switch (lastStatus.toLowerCase()) {
    case "pending":
      return "Gram Panchayat";
    case "approved":
      return "Sub-Divisional Level Committee";
    case "rejected":
      return "District Level Committee";
    default:
      return lastStatus;
  }
}

// Main component
export default function ClaimList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClaim, setSelectedClaim] = useState<TableRow | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"stage" | "status" | "type">(
    "stage"
  );
  const [filterStage, setFilterStage] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Add search state
  const rowsPerPage = 10;

  // Helper: get all unique process stages, statuses, and claim types from data
  const allStages = Array.from(
    new Set(sampleData.map((row) => getCurrentProcessStage(row.timeline)))
  );
  const allStatuses = Array.from(new Set(sampleData.map((row) => row.status)));
  const allTypes = Array.from(new Set(sampleData.map((row) => row.claimType)));

  // Filtering logic (multi-select + search)
  const filteredData = sampleData.filter((row) => {
    const stage = getCurrentProcessStage(row.timeline);
    const status = row.status;
    const type = row.claimType;
    const matchesSearch = row.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return (
      matchesSearch &&
      (filterStage.length === 0 || filterStage.includes(stage)) &&
      (filterStatus.length === 0 || filterStatus.includes(status)) &&
      (filterType.length === 0 || filterType.includes(type))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Debug: log selected claim changes
  React.useEffect(() => {
    if (selectedClaim) {
      console.log("Sidebar opened for claim:", selectedClaim);
    } else {
      console.log("Sidebar closed");
    }
  }, [selectedClaim]);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-8 w-8" />
            </Button>{" "}
            <div>
              <h1 className="text-xl font-semibold">Claims</h1>
            </div>
          </div>
        </div>
      </header>
      <ContentLayout title="table">
        <Breadcrumb className="mb-4 mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Claims</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col w-full bg-gray-50">
          <div className="flex flex-1 gap-4">
            {/* Table Section */}
            <div className="flex flex-col flex-1">
              <div className="flex flex-col bg-white border border-gray-200">
                {/* Top Header */}
                <div className="shrink-0 w-full px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search entries..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-64 pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="inline-flex items-center px-2.5 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600"
                      onClick={() => setShowFilters((v) => !v)}
                    >
                      <span className="mr-1.5">
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="inline-block"
                        >
                          <path d="M3 4h10M5 8h6M7 12h2" />
                        </svg>
                      </span>
                      Filters
                    </button>
                    <button className="inline-flex items-center px-2.5 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">
                      <Download className="h-4 w-4 mr-1.5" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Attractive Filter Tabs Row - only visible when showFilters is true */}
                {showFilters && (
                  <div className="w-full px-4 py-2 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b border-gray-200">
                    <div className="flex items-center gap-6">
                      {/* Tabs */}
                      <div className="flex gap-2">
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${
                            activeTab === "stage"
                              ? "border-blue-500 bg-blue-100 text-blue-700"
                              : "border-gray-200 bg-white text-gray-500"
                          }`}
                          onClick={() => setActiveTab("stage")}
                        >
                          Process Stage
                        </button>
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${
                            activeTab === "status"
                              ? "border-blue-500 bg-blue-100 text-blue-700"
                              : "border-gray-200 bg-white text-gray-500"
                          }`}
                          onClick={() => setActiveTab("status")}
                        >
                          Claim Status
                        </button>
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${
                            activeTab === "type"
                              ? "border-blue-500 bg-blue-100 text-blue-700"
                              : "border-gray-200 bg-white text-gray-500"
                          }`}
                          onClick={() => setActiveTab("type")}
                        >
                          Claim Type
                        </button>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        <button
                          className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm border border-gray-300"
                          onClick={() => {
                            setFilterStage([]);
                            setFilterStatus([]);
                            setFilterType([]);
                            setSearchTerm("");
                            setCurrentPage(1);
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    {/* Tab Content */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeTab === "stage" && (
                        <div className="flex gap-2 flex-wrap items-center">
                          {allStages.map((stage) => {
                            const selected = filterStage.includes(stage);
                            return (
                              <button
                                key={stage}
                                className={`px-4 py-1 rounded-full border text-sm font-medium cursor-pointer transition
																${
                                  selected
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                                }
															`}
                                onClick={() => {
                                  setFilterStage((prev) =>
                                    selected
                                      ? prev.filter((s) => s !== stage)
                                      : [...prev, stage]
                                  );
                                  setCurrentPage(1);
                                }}
                              >
                                {stage}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {activeTab === "status" && (
                        <div className="flex gap-2 flex-wrap items-center">
                          {allStatuses.map((status) => {
                            const selected = filterStatus.includes(status);
                            return (
                              <button
                                key={status}
                                className={`px-4 py-1 rounded-full border text-sm font-medium cursor-pointer transition
																${
                                  selected
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                                }
															`}
                                onClick={() => {
                                  setFilterStatus((prev) =>
                                    selected
                                      ? prev.filter((s) => s !== status)
                                      : [...prev, status]
                                  );
                                  setCurrentPage(1);
                                }}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {activeTab === "type" && (
                        <div className="flex gap-2 flex-wrap items-center">
                          {allTypes.map((type) => {
                            const selected = filterType.includes(type);
                            return (
                              <button
                                key={type}
                                className={`px-4 py-1 rounded-full border text-sm font-medium cursor-pointer transition
																${
                                  selected
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                                }
															`}
                                onClick={() => {
                                  setFilterType((prev) =>
                                    selected
                                      ? prev.filter((s) => s !== type)
                                      : [...prev, type]
                                  );
                                  setCurrentPage(1);
                                }}
                              >
                                {getClaimTypeFullName(type)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Table Container with Fixed Height and Scroll */}
                <div className="flex-1 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="sticky top-0 bg-gray-50 z-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Scheduled Tribes
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          OTFD
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Claim Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Process Stage
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentData.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-blue-50 cursor-pointer transition"
                          onClick={() => setSelectedClaim(row)}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {row.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                            {row.stFdst ? "Yes" : "No"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                            {row.otfd ? "Yes" : "No"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                            {getClaimTypeFullName(row.claimType)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                            {getCurrentProcessStage(row.timeline)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeColor(
                                row.status
                              )}`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
                    >
                      Next
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claims Sidebar */}
        <ClaimSidebarWrapper
          selectedClaim={selectedClaim}
          setSelectedClaim={setSelectedClaim}
        />
      </ContentLayout>
    </>
  );
}
