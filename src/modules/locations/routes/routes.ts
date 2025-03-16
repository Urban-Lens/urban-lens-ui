export const LOCATION_ROUTES = {
  ROOT: "/locations",
  EXPLORE: "/explore",
  DASHBOARD: "/dashboard",
  ADD_POI: "/locations/add-poi",
  MANAGE_LOCATION: {
    OVERVIEW: {
      ROOT: "/locations/:id",
      DETAIL: (locationUuid: string) => `/locations/${locationUuid}`,
    },
    LOCATION_STREAM: "/locations/:id/location-stream",
    VISITORS: "/locations/:id/visitors",
    VIEW_CAMPAIGN_REC: {
      ROOT: "/locations/:id/campaign-recommendation",
      DETAIL: (locationUuid: string) =>
        `/locations/${locationUuid}/campaign-recommendation`,
    },
    CAMPAIGNS: {
      ROOT: "/locations/:id/campaigns",
      DETAIL: (locationUuid: string) => `/locations/${locationUuid}/campaigns`,
    },
  },
  API: {
    GET_LOCATIONS: "/locations",
    GET_MY_LOCATIONS: "/locations/me/",
    GET_LOCATION_METRICS: "/analytics/metrics",
    GET_CAMPAIGN_RECCOMENDATION: (locationId: string) =>
      `/analytics/business-recommendation?location_id=${locationId}`,
  },
};
