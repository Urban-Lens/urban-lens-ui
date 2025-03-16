import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "../components/location-card";
import { useGetMyLocations } from "../hooks/getMyLocations";
import { LOCATION_ROUTES } from "../routes/routes";

export const MyLocationsPage = () => {
  const navigate = useNavigate();

  const { data: locations = [] } = useGetMyLocations();

  const locationsWithStreams = locations.filter(
    (location) => location.input_stream_url
  );
  const locationsWithoutStreams = locations.filter(
    (location) => !location.input_stream_url
  );

  return (
    <div className="px-8 py-4">
      <section className="mb-8 flex justify-between">
        <div className="">
          <h1 className="font-semibold text-lg">Your Locations</h1>
          <p className="text-gray-500">
            Manage the locations you are collecting data for
          </p>
        </div>
        <Button
          className="flex items-center"
          onClick={() => navigate(LOCATION_ROUTES.ADD_POI)}
        >
          <MapPin /> Add New Location
        </Button>
      </section>

      {locations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mb-4" strokeWidth={1.5} />
          <h3 className="text-xl font-semibold mb-2">No locations yet</h3>
          <p className="text-gray-500 mb-4">
            Start by adding your first location to monitor
          </p>
          <Button onClick={() => navigate(LOCATION_ROUTES.ADD_POI)}>
            Add Your First Location
          </Button>
        </div>
      ) : (
        <>
          {locationsWithStreams.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Locations with Live Streams
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locationsWithStreams.map((location, index) => (
                  <LocationCard location={location} key={index} />
                ))}
              </div>
            </section>
          )}

          {locationsWithoutStreams.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Other Locations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {locationsWithoutStreams.map((location, index) => (
                  <LocationCard location={location} key={index} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
