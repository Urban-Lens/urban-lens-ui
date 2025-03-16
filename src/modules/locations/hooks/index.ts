export const locationQueryKeys = {
  geocodedAddress: (address: string) => ["geocodedAddress", address],
  location: (id: string) => ["location", id],
  getLocations: ["locations"],
  getMyLocations: ["myLocations"],
};
