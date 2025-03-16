import { GetLocationMetricsParams } from "./getLocationMetrics";

export const locationQueryKeys = {
  geocodedAddress: (address: string) => ["geocodedAddress", address] as const,
  location: (id: string) => ["location", id] as const,
  getLocations: ["locations"] as const,
  getMyLocations: ["myLocations"] as const,
  locationMetrics: (params: GetLocationMetricsParams) =>
    ["locationMetrics", params] as const,
};
