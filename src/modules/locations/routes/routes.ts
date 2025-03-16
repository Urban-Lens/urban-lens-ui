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
    CAMPAIGNS: "/locations/:id/campaigns",
  },
  API: {
    GET_LOCATIONS: "/locations",
    GET_MY_LOCATIONS: "/my-locationss",
    GET_LOCATION_METRICS: "/analytics/metrics",
  },
};
