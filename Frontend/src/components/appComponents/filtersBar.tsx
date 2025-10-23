"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";

export default function FilterBar({ isOpen, onClose }) {
  if (!isOpen) return null; // Only render if open

  // Dummy data
  const schemes = [
    "Pradhan Mantri AwasYojna",
    "Jal Jeevan Mission (JJM)",
    "Pradhan Mantri Gram Sadak Yojana PMGSY",
    "Anganwadi Centre- Poshan 2.0 (ICDS)",
    "Samagra Shiksha Abhiyan",
    "National AYUSH Mission",
    "Responsible tourism (Swadesh Darshan)",
    "Jan ShikshanSansthan (JSS) Scheme",
    "National Livestock Mission",
    "PMAAGY/ SCA to TD",
    "Capacity building-Rashtriya Gram Swaraj Abhiyan (RGSA)",
  ];
  const ministries = [
    "Ministry of Jal Shakti",
    "Ministry of Tribal Affairs",
    "Ministry of Power",
    "Ministry of Health",
    "Ministry of AYUSH",
    "Ministry of Communications",
    "Ministry of Panchayati Raj",
    "D/o Animal Husbandry and Dairying",
  ];
  const priorities = ["High", "Mid", "Low"];
  const enrollmentStatus = ["Enrolled", "Not Enrolled"];

  // Local states for searching and selection
  const [schemeSearch, setSchemeSearch] = useState("");
  const [ministrySearch, setMinistrySearch] = useState("");
  const [selectedSchemes, setSelectedSchemes] = useState(new Set());
  const [selectedMinistries, setSelectedMinistries] = useState(new Set());
  const [selectedPriorities, setSelectedPriorities] = useState(new Set());
  const [selectedEnrollment, setSelectedEnrollment] = useState(new Set());

  // Filtered lists
  const filteredSchemes = schemes.filter((s) =>
    s.toLowerCase().includes(schemeSearch.toLowerCase())
  );
  const filteredMinistries = ministries.filter((m) =>
    m.toLowerCase().includes(ministrySearch.toLowerCase())
  );

  const handleSchemeToggle = (scheme) => {
    const newSelected = new Set(selectedSchemes);
    if (newSelected.has(scheme)) {
      newSelected.delete(scheme);
    } else {
      newSelected.add(scheme);
    }
    setSelectedSchemes(newSelected);
  };

  const handleMinistryToggle = (ministry) => {
    const newSelected = new Set(selectedMinistries);
    if (newSelected.has(ministry)) {
      newSelected.delete(ministry);
    } else {
      newSelected.add(ministry);
    }
    setSelectedMinistries(newSelected);
  };

  const handlePriorityToggle = (priority) => {
    const newSelected = new Set(selectedPriorities);
    if (newSelected.has(priority)) {
      newSelected.delete(priority);
    } else {
      newSelected.add(priority);
    }
    setSelectedPriorities(newSelected);
  };

  const handleEnrollmentToggle = (status) => {
    const newSelected = new Set(selectedEnrollment);
    if (newSelected.has(status)) {
      newSelected.delete(status);
    } else {
      newSelected.add(status);
    }
    setSelectedEnrollment(newSelected);
  };

  const handleClear = () => {
    setSelectedSchemes(new Set());
    setSelectedMinistries(new Set());
    setSelectedPriorities(new Set());
    setSelectedEnrollment(new Set());
    setSchemeSearch("");
    setMinistrySearch("");
  };

  const totalSelected =
    selectedSchemes.size +
    selectedMinistries.size +
    selectedPriorities.size +
    selectedEnrollment.size;

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium text-gray-900">Filters</h2>
            {totalSelected > 0 && (
              <span className="text-xs text-gray-500">
                {totalSelected} selected
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-4 space-y-6">
        {/* Schemes Section */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Schemes
          </label>
          <div className="relative">
            <input
              type="text"
              value={schemeSearch}
              onChange={(e) => setSchemeSearch(e.target.value)}
              placeholder="Search schemes"
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="max-h-33 overflow-y-auto">
            <div className="space-y-1">
              {filteredSchemes.map((scheme) => (
                <label
                  key={scheme}
                  className="flex items-center py-1 px-1 text-sm hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSchemes.has(scheme)}
                    onChange={() => handleSchemeToggle(scheme)}
                    className="h-3.5 w-3.5 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{scheme}</span>
                </label>
              ))}
              {filteredSchemes.length === 0 && (
                <p className="text-xs text-gray-500 py-2 text-center">
                  No schemes found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Ministries Section */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Ministries
          </label>
          <div className="relative">
            <input
              type="text"
              value={ministrySearch}
              onChange={(e) => setMinistrySearch(e.target.value)}
              placeholder="Search ministries"
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="max-h-40 overflow-y-auto">
            <div className="space-y-1">
              {filteredMinistries.map((ministry) => (
                <label
                  key={ministry}
                  className="flex items-center py-1 px-1 text-sm hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedMinistries.has(ministry)}
                    onChange={() => handleMinistryToggle(ministry)}
                    className="h-3.5 w-3.5 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{ministry}</span>
                </label>
              ))}
              {filteredMinistries.length === 0 && (
                <p className="text-xs text-gray-500 py-2 text-center">
                  No ministries found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Priority and Enrollment Sections */}
        <div className="space-y-4">
          {/* Priority Section */}
          {/* <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex flex-row gap-x-4">
              {priorities.map((priority) => (
                <label
                  key={priority}
                  className="flex items-center px-2 py-1 text-sm hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedPriorities.has(priority)}
                    onChange={() => handlePriorityToggle(priority)}
                    className="h-3.5 w-3.5 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{priority}</span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Enrollment Section */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex flex-row gap-x-4">
              {enrollmentStatus.map((status) => (
                <label
                  key={status}
                  className="flex items-center px-2 py-1 text-sm hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedEnrollment.has(status)}
                    onChange={() => handleEnrollmentToggle(status)}
                    className="h-3.5 w-3.5 text-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <button className="flex-1 px-2 py-1.5 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Apply {totalSelected > 0 && `(${totalSelected})`}
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:bg-gray-50 focus:outline-none"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
