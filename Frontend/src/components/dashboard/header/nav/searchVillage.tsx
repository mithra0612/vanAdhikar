"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useDashboardStore from "../../../../stores/searchStore";

const VillageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [villages, setVillages] = useState<string[]>([]);
  const [filteredVillages, setFilteredVillages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { State, District, taluk, setVillage, setActiveTab } = useDashboardStore();

  // Fetch villages from API
  const fetchVillages = async () => {
    if (!State || !District || !taluk) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.india-location-hub.in/api/locations/villages?state=${encodeURIComponent(
          State
        )}&district=${encodeURIComponent(District)}&taluka=${encodeURIComponent(taluk)}`
      );

      // Map village objects to their names
      const villageList = response.data?.data?.villages?.map((v: any) => v.name) || [];
      setVillages(villageList);
      setFilteredVillages(villageList);
    } catch (err) {
      console.error("Error fetching villages:", err);
      setError("Failed to fetch villages");
      setVillages([]);
      setFilteredVillages([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredVillages(villages)
    } else {
      setFilteredVillages(
        villages.filter((v) => v.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  // Handle click
  const handleClick = (village: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVillage(village);
    setActiveTab("");
  };

  useEffect(() => {
    fetchVillages();
  }, [taluk]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full right--1/3 w-96 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10"
    >
      {/* Search Box */}
      <label
        className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow outline-none bg-transparent text-sm"
          placeholder="Search for a village"
          disabled={!State || !District || !taluk}
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

      {/* Error */}
      {error && <div className="text-center text-red-500 py-2">{error}</div>}

      {/* Village List */}
      <div className="overflow-y-auto border-t border-gray-200 mt-4 max-h-60 grid grid-cols-1 gap-3">
        {loading ? (
          <div className="text-center py-2 text-gray-500">Loading...</div>
        ) : filteredVillages.length > 0 ? (
          filteredVillages.map((village, idx) => (
            <div
              key={idx}
              onClick={(e) => handleClick(village, e)}
              className="text-center py-2 px-3 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-sm font-medium text-gray-700">{village}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-2 text-gray-500">
            No villages found
          </div>
        )}
      </div>
    </div>
  );
};

export default VillageSearch;