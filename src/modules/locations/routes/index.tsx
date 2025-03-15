import { RouteObject } from "react-router-dom";
import { MyLocationsPage } from "../pages/my-locations";
import { LOCATION_ROUTES } from "./routes";
import { ExploreLocationsPage } from "../pages/explore-locations";
import { AddLocationPage } from "../pages/add-location";

export const locationRoutes: RouteObject[] = [
  {
    path: LOCATION_ROUTES.ROOT,
    element: <MyLocationsPage />,
  },
  {
    path: LOCATION_ROUTES.EXPLORE,
    element: <ExploreLocationsPage />,
  },
  {
    path: LOCATION_ROUTES.ADD_POI,
    element: <AddLocationPage />,
  },
];
