import { RouteObject } from "react-router-dom";
import { MyLocationsPage } from "../pages/my-locations";
import { LOCATION_ROUTES } from "./routes";
import { ExploreLocationsPage } from "../pages/explore-locations";
import Dashboard from "../pages/dashboard";
import { AddLocationPage } from "../pages/add-location";
import ManageLocationPage from "../pages/manage-location";
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
    path: LOCATION_ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: LOCATION_ROUTES.ADD_POI,
    element: <AddLocationPage />,
  },
  {
    path: LOCATION_ROUTES.MANAGE_LOCATION,
    element: <ManageLocationPage />,
  },
];
