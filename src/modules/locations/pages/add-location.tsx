import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetLocations } from "../hooks/getLocations";
import { ILocation } from "../types";
import { useAuth } from "@/modules/auth/provider";
import { useTrackLocation } from "../hooks/trackLocation";
import { useGetAccountDetails } from "@/modules/auth/hooks/getAccountDetails";

const generateOSMEmbedUrl = (lat: number, lng: number): string => {
  const delta = 0.005;
  const left = lng - delta;
  const bottom = lat - delta;
  const right = lng + delta;
  const top = lat + delta;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left},${bottom},${right},${top}&layer=mapnik&marker=${lat},${lng}`;
};

export const AddLocationPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { data: user } = useGetAccountDetails(isAuthenticated);
  const { data: locations } = useGetLocations();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<ILocation[]>(
    locations ?? []
  );
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCreatingLocation, setIsCreatingLocation] = useState(false);

  useEffect(() => {
    if (!locations) return;
    if (!searchTerm) {
      setFilteredLocations(locations);
      return;
    }
    const lower = searchTerm.toLowerCase();
    setFilteredLocations(
      locations.filter((loc) => loc.address.toLowerCase().includes(lower))
    );
  }, [searchTerm, locations]);

  const handleSelectLocation = (loc: ILocation) => {
    setSelectedLocation(loc);
    setSearchTerm(loc.address);
    setDropdownOpen(false);
    setIsCreatingLocation(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDropdownOpen(true);
    if (selectedLocation && e.target.value !== selectedLocation.address) {
      setSelectedLocation(null);
    }
  };

//   // Update coordinates from create form.
//   const handleCoordinatesChange = (coords: {
//     latitude: number;
//     longitude: number;
//   }) => {
//     setSelectedLocation({
//       address: "",
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//     } as ILocation);
//   };

//   // When the create form is submitted, update the selected location.
//   const handleCreateLocationSubmit = (
//     loc: { address: string; latitude: number; longitude: number },
//     payload: any
//   ) => {
//     setSelectedLocation({ ...loc } as ILocation);
//     setSearchTerm(loc.address);
//     setIsCreatingLocation(false);
//     console.log("Created location:", payload);
//   };

  const fallbackLat = 18.0045;
  const fallbackLng = -76.788;

  // Use the track location hook.
  const { mutate: trackLocation, isPending: isTracking } = useTrackLocation(
    (response) => {
      console.log("Location attached successfully:", response);
      // Optionally, you can navigate to a new page or show a success toast here.
    }
  );

  const handleContinue = () => {
    if (!selectedLocation) {
      alert("Please select a location first.");
      return;
    }
    if (!user) {
      alert("User not found.");
      return;
    }
    // Call track location with the selected location id and user id.
    trackLocation({ location_id: selectedLocation.id, user_id: user.id });
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
            : "Select the location you’d like to track analytics for, or add your own if it’s not listed."}
        </p>

        {/* {!isCreatingLocation ? ( */}
        <>
          <div className="mb-4">
            <Label htmlFor="locationSearch" className="mb-2 block">
              Select Location
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
                    key={loc.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectLocation(loc)}
                  >
                    {loc.address}
                  </div>
                ))}
              </div>
            )}
            {/* {searchTerm && filteredLocations.length === 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  No matching locations found.
                  <Button
                    variant="link"
                    className="ml-2 p-0"
                    onClick={() => setIsCreatingLocation(true)}
                  >
                    Add your own location.
                  </Button>
                </div>
              )} */}
            {/* {!searchTerm && filteredLocations.length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  Have a location in mind?{" "}
                  <Button
                    variant="link"
                    className="ml-2 p-0"
                    onClick={() => setIsCreatingLocation(true)}
                  >
                    Add it.
                  </Button>
                </div>
              )} */}
          </div>
          <div className="flex flex-col gap-4">
            <Button
              disabled={!selectedLocation || isTracking}
              onClick={handleContinue}
              className="w-full"
            >
              {isTracking ? "Tracking..." : "Continue"}
            </Button>
            {/* <p className="text-sm text-gray-500 text-center">OR</p>
            <Button
              variant="outline"
              onClick={() => setIsCreatingLocation(true)}
              className="w-full"
            >
              Add Your Own Location
            </Button> */}
          </div>
        </>
        {/* // ) : (
        //   <CreateLocationForm
        //     onSubmit={handleCreateLocationSubmit}
        //     onCancel={() => setIsCreatingLocation(false)}
        //     onCoordinatesChange={handleCoordinatesChange}
        //   />
        // )} */}
      </div>

      {/* Right Column: Map Section */}
      <div className="w-full md:w-2/3 h-64 md:h-full relative overflow-hidden">
        <iframe
          title="OpenStreetMap"
          src={generateOSMEmbedUrl(
            selectedLocation ? selectedLocation.latitude : fallbackLat,
            selectedLocation ? selectedLocation.longitude : fallbackLng
          )}
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AddLocationPage;
