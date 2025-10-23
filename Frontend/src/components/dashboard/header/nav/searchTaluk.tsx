"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useDashboardStore from "../../../../stores/searchStore";

const SearchTaluk = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [taluks, setTaluks] = useState<string[]>([]);
  const [filteredTaluks, setFilteredTaluks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { State, District, setTaluk, setVillage, setActiveTab } =
    useDashboardStore();

  // Fetch taluks
  const fetchTaluks = async () => {
    if (!State || !District) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.india-location-hub.in/api/locations/talukas?state=${State}&district=${District}`
      );

      // Extract taluka names from API response
      const talukList = response.data?.data?.talukas?.map((t: any) => t.name) || [];
      setTaluks(talukList);
      setFilteredTaluks(talukList);
    } catch (err) {
      console.error("Error fetching taluks:", err);
      setError("Failed to fetch taluks");
      setTaluks([]);
      setFilteredTaluks([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredTaluks(taluks);
    } else {
      setFilteredTaluks(
        taluks.filter((t) => t.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  // Handle click
  const handleClick = (taluk: string) => {
    setTaluk(taluk);
    setVillage("");
    setActiveTab("village/city");
  };

  useEffect(() => {
    fetchTaluks();
  }, [State, District]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full right--1/3 w-96 mt-2 bg-white border rounded-lg shadow-lg p-4 z-10"
    >
      {/* Search Box */}
      <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow outline-none bg-transparent text-sm"
          placeholder="Search taluk"
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

      {/* List */}
      <div className="overflow-y-auto border-t border-gray-200 mt-4 max-h-60 grid grid-cols-1 gap-2">
        {loading ? (
          <div className="text-center py-2 text-gray-500">Loading...</div>
        ) : filteredTaluks.length > 0 ? (
          filteredTaluks.map((taluk, index) => (
            <div
              key={index}
              onClick={() => handleClick(taluk)}
              className="text-center py-2 px-3 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-sm font-medium text-gray-700">{taluk}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-2 text-gray-500">
            No taluks found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTaluk;
