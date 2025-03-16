import { Button } from "@/components/ui/button";
import { LocationCard } from "../components/location-card";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LOCATION_ROUTES } from "../routes/routes";
import { useGetMyLocations } from "../hooks/getMyLocations";

export const MyLocationsPage = () => {
  const navigate = useNavigate();

  const { data: locations = [] } = useGetMyLocations();

  const locationsWithStreams = locations.filter(
    (location) => location.output_stream_url
  );
  const locationsWithoutStreams = locations.filter(
    (location) => !location.output_stream_url
  );

  return (
    <div className="px-8 py-4">
      <section className="mb-8 flex justify-between">
        <div className="">
          <h1 className="text-2xl font-semibold">Your Locations</h1>
          <p className="text-gray-500">
            Manage the locations you are collecting data for
          </p>
        </div>
        <Button
          className="flex items-center"
          onClick={() => navigate(LOCATION_ROUTES.ADD_POI)}
        >
          <MapPin /> Add New Point of Interest
        </Button>
      </section>

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
    </div>
  );
};
