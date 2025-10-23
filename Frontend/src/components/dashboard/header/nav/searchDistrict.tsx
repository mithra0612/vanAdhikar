"use client";
import React, { useState, useEffect } from "react";
import useDashboardStore from "../../../../stores/searchStore";

const DistrictSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { State, setDistrict, setVillage, setTaluk, setActiveTab } =
    useDashboardStore();

  // Fetch districts when State changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!State) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://www.india-location-hub.in/api/locations/districts?state=${encodeURIComponent(
            State.toUpperCase()
          )}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching districts: ${response.statusText}`);
        }

        const data = await response.json();

        // API returns: { data: { districts: [{ name, ... }] } }
        const districtNames = data?.data?.districts?.map((d) => d.name) || [];
        setDistricts(districtNames);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [State]);

  // Handle search filter
  const filteredDistricts = districts.filter((district) =>
    district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (district: string) => {
    setDistrict(district);
    setVillage(null);
    setTaluk(null);
    setActiveTab("taluk");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full -right-1/4 w-96 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10"
    >
      {/* Search Input */}
      <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow outline-none bg-transparent text-sm"
          placeholder="Search for a district"
          disabled={!State}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-5 w-5 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {/* Scrollable List */}
      <div className="overflow-y-auto border-t border-gray-200 mt-4 max-h-60 grid grid-cols-1 gap-3">
        {loading ? (
          <div className="text-center py-2 text-gray-500">Loading...</div>
        ) : filteredDistricts.length > 0 ? (
          filteredDistricts.map((district, index) => (
            <div
              key={index}
              onClick={() => handleClick(district)}
              className="text-center py-2 px-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            >
              <p className="text-sm font-medium text-gray-700">{district}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-2 text-gray-500">
            {State ? "No districts found" : "Select a state first"}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictSearch;
