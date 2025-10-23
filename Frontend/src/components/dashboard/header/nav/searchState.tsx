"use client";
import React, { useState, useMemo } from "react";
import useDashboardStore from "../../../../stores/searchStore";

const RegionSearch = () => {
  // Initial states with default images
  const INITIAL_STATES = [
    { name: "Madhya Pradesh", image: "./statesImg/madhyapradesh.png" },
    { name: "Tripura", image: "./statesImg/tripura.png" },
    { name: "Odisha", image: "./statesImg/odisha.png" },
    { name: "Telangana", image: "./statesImg/telangana.png" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Local search filtering
  const filteredStates = useMemo(() => {
    if (!searchTerm) return INITIAL_STATES;
    return INITIAL_STATES.filter((state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const { setState, setDistrict, setActiveTab } = useDashboardStore();

  const handleStateClick = (state) => {
    setState(state.name);
    setDistrict("");
    setActiveTab("district");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full -right-1/4 w-96 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-5 z-10"
    >
      {/* Header */}
      <div className="mb-4">
        <h5 className="text-lg font-semibold text-gray-800 mb-2">
          Search by Region
        </h5>
        <div className="relative">
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredStates.map((state) => (
          <button
            key={state.name}
            onClick={() => handleStateClick(state)}
            className="group flex flex-col items-center p-2 rounded-lg bg-white hover:bg-gray-100 transition"
          >
            <img
              src={state.image || "./placeholder-state.png"}
              alt={state.name}
              className="w-24 h-16 object-cover rounded-md  group-hover:shadow-md transition"
              onError={(e) => {
                e.currentTarget.src = "./placeholder-state.png";
              }}
            />
            <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-600">
              {state.name}
            </p>
          </button>
        ))}

        {filteredStates.length === 0 && (
          <div className="col-span-3 text-center text-gray-500 text-sm py-4">
            No states found
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionSearch;
