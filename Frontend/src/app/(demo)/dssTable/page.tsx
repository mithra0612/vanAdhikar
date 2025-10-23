"use client";

import React, { useState } from "react";
import { Search, Filter, Download, ArrowLeft } from "lucide-react";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import FilterBar from "@/components/appComponents/filtersBar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Sample Data (unchanged)
const sampleData = [
  {
    id: 1,
    uniqueIdentifier: "FRA-TN-2025-01401",
    name: "Rahul Sharma",
    type: "community",
    schemes: [
      { name: "Farmer Support", priority: "high", enrolled: true },
      { name: "Women Empowerment", priority: "mid", enrolled: false },
    ],
  },
  {
    id: 2,
    uniqueIdentifier: "FRA-TN-2025-01402",
    name: "Aditi Mehra",
    type: "individual",
    schemes: [
      { name: "Health Insurance", priority: "mid", enrolled: true },
      { name: "Housing Scheme", priority: "low", enrolled: false },
    ],
  },
  {
    id: 3,
    uniqueIdentifier: "FRA-TN-2025-01403",
    name: "Vikram Patel",
    type: "community",
    schemes: [
      { name: "Skill Development", priority: "high", enrolled: true },
      { name: "Rural Housing", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 4,
    uniqueIdentifier: "FRA-TN-2025-01404",
    name: "Neha Singh",
    type: "individual",
    schemes: [
      { name: "Women Empowerment", priority: "high", enrolled: true },
      { name: "Child Education", priority: "mid", enrolled: false },
    ],
  },
  {
    id: 5,
    uniqueIdentifier: "FRA-TN-2025-01405",
    name: "Arjun Verma",
    type: "community",
    schemes: [
      { name: "Startup Support", priority: "high", enrolled: false },
      { name: "Farmer Support", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 6,
    uniqueIdentifier: "FRA-TN-2025-01406",
    name: "Priya Nair",
    type: "individual",
    schemes: [
      { name: "Housing Scheme", priority: "high", enrolled: true },
      { name: "Women Empowerment", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 7,
    uniqueIdentifier: "FRA-TN-2025-01407",
    name: "Rohan Gupta",
    type: "community",
    schemes: [
      { name: "Education Grant", priority: "high", enrolled: false },
      { name: "Pension Scheme", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 8,
    uniqueIdentifier: "FRA-TN-2025-01408",
    name: "Simran Kaur",
    type: "individual",
    schemes: [
      { name: "Child Education", priority: "high", enrolled: true },
      { name: "Startup Support", priority: "mid", enrolled: false },
    ],
  },
  {
    id: 9,
    uniqueIdentifier: "FRA-TN-2025-01409",
    name: "Manish Yadav",
    type: "community",
    schemes: [
      { name: "Skill Development", priority: "high", enrolled: false },
      { name: "Housing Scheme", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 10,
    uniqueIdentifier: "FRA-TN-2025-01410",
    name: "Kavya Reddy",
    type: "individual",
    schemes: [
      { name: "Pension Scheme", priority: "high", enrolled: true },
      { name: "Health Insurance", priority: "mid", enrolled: false },
    ],
  },
  {
    id: 11,
    uniqueIdentifier: "FRA-TN-2025-01411",
    name: "Anil Kumar",
    type: "community",
    schemes: [
      { name: "Rural Housing", priority: "mid", enrolled: false },
      { name: "Farmer Support", priority: "high", enrolled: true },
    ],
  },
  {
    id: 12,
    uniqueIdentifier: "FRA-TN-2025-01412",
    name: "Sneha Iyer",
    type: "individual",
    schemes: [
      { name: "Health Insurance", priority: "mid", enrolled: true },
      { name: "Child Education", priority: "high", enrolled: true },
    ],
  },
  {
    id: 13,
    uniqueIdentifier: "FRA-TN-2025-01413",
    name: "Rajesh Pillai",
    type: "community",
    schemes: [
      { name: "Startup Support", priority: "high", enrolled: true },
      { name: "Pension Scheme", priority: "mid", enrolled: false },
    ],
  },
  {
    id: 14,
    uniqueIdentifier: "FRA-TN-2025-01414",
    name: "Meera Joshi",
    type: "individual",
    schemes: [
      { name: "Skill Development", priority: "high", enrolled: false },
      { name: "Women Empowerment", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 15,
    uniqueIdentifier: "FRA-TN-2025-01415",
    name: "Karan Malhotra",
    type: "community",
    schemes: [
      { name: "Housing Scheme", priority: "high", enrolled: true },
      { name: "Education Grant", priority: "mid", enrolled: false },
    ],
  },
  {
    id: 16,
    uniqueIdentifier: "FRA-TN-2025-01416",
    name: "Divya Kapoor",
    type: "individual",
    schemes: [
      { name: "Child Education", priority: "high", enrolled: true },
      { name: "Health Insurance", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 17,
    uniqueIdentifier: "FRA-TN-2025-01417",
    name: "Aman Jain",
    type: "community",
    schemes: [
      { name: "Farmer Support", priority: "high", enrolled: false },
      { name: "Rural Housing", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 18,
    uniqueIdentifier: "FRA-TN-2025-01418",
    name: "Pooja Das",
    type: "individual",
    schemes: [
      { name: "Pension Scheme", priority: "high", enrolled: true },
      { name: "Startup Support", priority: "mid", enrolled: false },
    ],
  },
  {
    id: 19,
    uniqueIdentifier: "FRA-TN-2025-01419",
    name: "Santosh Reddy",
    type: "community",
    schemes: [
      { name: "Skill Development", priority: "high", enrolled: true },
      { name: "Housing Scheme", priority: "mid", enrolled: true },
    ],
  },
  {
    id: 20,
    uniqueIdentifier: "FRA-TN-2025-01420",
    name: "Ananya Mishra",
    type: "individual",
    schemes: [
      { name: "Women Empowerment", priority: "high", enrolled: false },
      { name: "Child Education", priority: "mid", enrolled: true },
    ],
  },
];

function DssTable() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  // Pagination logic
  const totalPages = Math.ceil(sampleData.length / rowsPerPage);
  const currentData = sampleData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const renderPersnolInfo = (type) => {
    if (type === "community") {
      router.push("/community-details");
    } else {
      router.push("/personal-information");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-99 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
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
              <h1 className="text-xl font-semibold">Dss System</h1>
            </div>
          </div>
        </div>
      </header>
      <ContentLayout title="table">
        <div className="flex flex-col w-full mt-2 bg-gray-50">
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
                      className="w-64 pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center px-2.5 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 text-gray-600">
                      <Download className="h-4 w-4 mr-1.5" />
                      Export
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="inline-flex items-center px-2.5 py-1.5 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 text-gray-600"
                    >
                      <Filter className="h-4 w-4 mr-1.5" />
                      {isFilterOpen ? "Hide Filters" : "Show Filters"}
                    </button>
                  </div>
                </div>

                {/* Table Container with Fixed Height and Scroll */}
                <div className="flex-1 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="sticky top-0 bg-gray-50 z-10">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Id
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Scheme 1
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b">
                          Scheme 2
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentData.map((row) => (
                        <tr
                          onClick={() => renderPersnolInfo(row.type)}
                          key={row.id}
                          className="hover:bg-gray-50 hover:cursor-pointer"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {row.uniqueIdentifier}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {row.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                            {row.type}
                          </td>
                          {row.schemes.map((scheme, idx) => (
                            <td key={idx} className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-900 font-medium">
                                  {scheme.name}
                                </span>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${
                                    scheme.priority === "high"
                                      ? "bg-blue-50 text-blue-700"
                                      : scheme.priority === "mid"
                                      ? "bg-gray-100 text-gray-700"
                                      : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  {scheme.priority}
                                </span>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${
                                    scheme.enrolled
                                      ? "bg-green-50 text-green-700"
                                      : "bg-gray-50 text-gray-600"
                                  }`}
                                >
                                  {scheme.enrolled
                                    ? "Enrolled"
                                    : "Not Enrolled"}
                                </span>
                              </div>
                            </td>
                          ))}
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

            {/* Filter Sidebar */}
            <FilterBar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </div>
      </ContentLayout>
    </>
  );
}

export default DssTable;
