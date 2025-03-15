"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export interface AvailableLocation {
  name: string;
  lat: number;
  lng: number;
}

const availableLocations: AvailableLocation[] = [
  {
    name: "Halfway Tree Plaza",
    lat: 18.0063,
    lng: -76.779,
  },
  {
    name: "Maxfield Park",
    lat: 18.005,
    lng: -76.787,
  },
  {
    name: "Hillside Mall",
    lat: 18.0038,
    lng: -76.789,
  },
];

const generateOSMEmbedUrl = (lat: number, lng: number): string => {
  const delta = 0.005;
  const left = lng - delta;
  const bottom = lat - delta;
  const right = lng + delta;
  const top = lat + delta;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left},${bottom},${right},${top}&layer=mapnik&marker=${lat},${lng}`;
};

export const AddLocationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] =
    useState<AvailableLocation[]>(availableLocations);
  const [selectedLocation, setSelectedLocation] =
    useState<AvailableLocation | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredLocations(availableLocations);
      return;
    }
    const lower = searchTerm.toLowerCase();
    setFilteredLocations(
      availableLocations.filter((loc) => loc.name.toLowerCase().includes(lower))
    );
  }, [searchTerm]);

  const handleSelectLocation = (loc: AvailableLocation) => {
    setSelectedLocation(loc);
    setSearchTerm(loc.name);
    setDropdownOpen(false); // close dropdown upon selection
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDropdownOpen(true); // open dropdown when user types
  };

  const fallbackLat = 18.0045;
  const fallbackLng = -76.788;
  const lat = selectedLocation ? selectedLocation.lat : fallbackLat;
  const lng = selectedLocation ? selectedLocation.lng : fallbackLng;
  const embedUrl = generateOSMEmbedUrl(lat, lng);

  const handleContinue = () => {
    if (!selectedLocation) {
      alert("Please select a location first.");
      return;
    }
    console.log("User selected location:", selectedLocation);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Column: Form Section */}
      <div className="w-full md:w-1/2 p-6 bg-white">
        <h1 className="text-2xl font-semibold mb-2">Track new Location</h1>
        <p className="text-gray-500 mb-6">
          Select the location you would like to see analytics for
        </p>

        <div className="mb-4">
          <Label htmlFor="locationSearch" className="mb-2 block">
            Select location
          </Label>
          <Input
            id="locationSearch"
            placeholder="Search for a location..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          {dropdownOpen && searchTerm && filteredLocations.length > 0 && (
            <div className="border border-gray-200 mt-1 rounded shadow-sm bg-white max-h-48 overflow-y-auto">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.name}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectLocation(loc)}
                >
                  {loc.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <Button
          disabled={!selectedLocation}
          className="mt-4 w-full"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>

      {/* Right Column: Map Section */}
      <div className="w-full md:w-2/3 h-64 md:h-full relative overflow-hidden">
        <iframe
          title="OpenStreetMap"
          src={embedUrl}
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
