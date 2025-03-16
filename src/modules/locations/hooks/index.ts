import { IGetLocationMetricsParams } from "../types";

export const locationQueryKeys = {
  geocodedAddress: (address: string) => ["geocodedAddress", address] as const,
  location: (id: string) => ["location", id] as const,
  campaignRecommendation: (id: string) =>
    ["campaignRecommendation", id] as const,
  locationRecommendation: (id: string) =>
    ["locationRecommendation", id] as const,
  getLocations: ["locations"] as const,
  getMyLocations: ["myLocations"] as const,
  locationMetrics: (params: IGetLocationMetricsParams) =>
    ["locationMetrics", params] as const,
};
