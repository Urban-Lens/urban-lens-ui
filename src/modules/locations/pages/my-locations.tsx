import { LocationCard } from "../components/location-card";

export const MyLocationsPage = () => {
  const sampleLocations = [
    {
      name: "Downtown Plaza",
      address: {
        street: "123 Main St",
        apartment: "Suite 101",
        city: "Metropolis",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      rating: 4.7,
      streamUrl: "https://example.com/stream/downtown-plaza",
      thumbnail: "https://via.placeholder.com/400x300?text=Downtown+Plaza",
    },
    {
      name: "City Park",
      address: {
        street: "456 Park Ave",
        apartment: null,
        city: "Metropolis",
        state: "NY",
        zip: "10002",
        country: "USA",
      },
      rating: 4.2,
      streamUrl: "https://example.com/stream/city-park",
      thumbnail: "https://via.placeholder.com/400x300?text=City+Park",
    },
    {
      name: "Lakeside Mall",
      address: {
        street: "789 Lakeshore Blvd",
        apartment: "Unit 202",
        city: "Lakeview",
        state: "MI",
        zip: "48850",
        country: "USA",
      },
      rating: 4.0,
      streamUrl: null,
      thumbnail: null,
    },
  ];

  const locationsWithStreams = sampleLocations.filter(
    (location) => location.streamUrl
  );
  const locationsWithoutStreams = sampleLocations.filter(
    (location) => !location.streamUrl
  );

  return (
    <div className="px-8">
      <section className="mb-8">
        <h1 className="text-2xl font-semibold">Your Locations</h1>
        <p className="text-gray-500">
          Manage the locations you are collecting data for
        </p>
      </section>

      {locationsWithStreams.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Locations with Live Streams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsWithStreams.map((location, index) => (
              <LocationCard key={index} {...location} />
            ))}
          </div>
        </section>
      )}

      {locationsWithoutStreams.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Other Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {locationsWithoutStreams.map((location, index) => (
              <LocationCard key={index} {...location} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
