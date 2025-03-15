"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateLocationForm } from "../components/create-location-form";

export interface AvailableLocation {
  name: string;
  lat: number;
  lng: number;
}

const availableLocations: AvailableLocation[] = [
  { name: "Halfway Tree Plaza", lat: 18.0063, lng: -76.779 },
  { name: "Maxfield Park", lat: 18.005, lng: -76.787 },
  { name: "Hillside Mall", lat: 18.0038, lng: -76.789 },
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
  // Search/Select mode state.
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<AvailableLocation[]>(availableLocations);
  const [selectedLocation, setSelectedLocation] = useState<AvailableLocation | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Create mode state.
  const [isCreatingLocation, setIsCreatingLocation] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredLocations(availableLocations);
      return;
    }
    const lower = searchTerm.toLowerCase();
    setFilteredLocations(
      availableLocations.filter((loc) =>
        loc.name.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm]);

  const handleSelectLocation = (loc: AvailableLocation) => {
    setSelectedLocation(loc);
    setSearchTerm(loc.name);
    setDropdownOpen(false);
    setIsCreatingLocation(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDropdownOpen(true);
    if (selectedLocation && e.target.value !== selectedLocation.name) {
      setSelectedLocation(null);
    }
  };

  // When the create form returns coordinates, update the selected location.
  const handleCreateLocationSubmit = (
    loc: AvailableLocation,
    payload: any
  ) => {
    setSelectedLocation(loc);
    setSearchTerm(loc.name);
    setIsCreatingLocation(false);
    console.log("Created location:", payload);
  };

  // This function is called from the create form as soon as coordinates are fetched.
  const handleCoordinatesChange = (coords: { lat: number; lng: number }) => {
    // Update selected location immediately to update the map.
    setSelectedLocation({ name: "", lat: coords.lat, lng: coords.lng });
  };

  const fallbackLat = 18.0045;
  const fallbackLng = -76.788;
  const lat = selectedLocation ? selectedLocation.lat : fallbackLat;
  const lng = selectedLocation ? selectedLocation.lng : fallbackLng;
  // const embedUrl = generateOSMEmbedUrl(lat, lng);

  const handleContinue = () => {
    if (!selectedLocation) {
      alert("Please select a location first.");
      return;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Column: Search / Create Form */}
      <div className="w-full md:w-1/2 p-6 bg-white">
        <h1 className="text-2xl font-semibold mb-2">
          {isCreatingLocation ? "Create New Location" : "Track New Location"}
        </h1>
        <p className="text-gray-500 mb-6">
          {isCreatingLocation
            ? "Enter details for your custom location."
            : "Select the location you would like to see analytics for."}
        </p>

        {!isCreatingLocation ? (
          <>
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
              {searchTerm && filteredLocations.length === 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  No matching locations found.
                  <Button
                    variant="link"
                    className="ml-2 p-0"
                    onClick={() => setIsCreatingLocation(true)}
                  >
                    Add your own location
                  </Button>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                disabled={!selectedLocation}
                onClick={handleContinue}
                className="w-full"
              >
                Continue
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreatingLocation(true)}
                className="w-full"
              >
                Add Your Own Location
              </Button>
            </div>
          </>
        ) : (
          <CreateLocationForm
            onSubmit={handleCreateLocationSubmit}
            onCancel={() => setIsCreatingLocation(false)}
            onCoordinatesChange={handleCoordinatesChange}
          />
        )}
      </div>

      {/* Right Column: Map Section */}
      <div className="w-full md:w-2/3 h-64 md:h-full relative overflow-hidden">
        <iframe
          title="OpenStreetMap"
          src={generateOSMEmbedUrl(
            selectedLocation ? selectedLocation.lat : fallbackLat,
            selectedLocation ? selectedLocation.lng : fallbackLng
          )}
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
