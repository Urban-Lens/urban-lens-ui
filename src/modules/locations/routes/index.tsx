import { RouteObject } from "react-router-dom";
import { MyLocationsPage } from "../pages/my-locations";
import { DashboardLayout } from "@/modules/core/layout/dashboard-layout";
import { LOCATION_ROUTES } from "./routes";
import { ExploreLocationsPage } from "../pages/explore-locations";

export const locationRoutes: RouteObject[] = [
  {
    path: LOCATION_ROUTES.ROOT,
    element: <MyLocationsPage />,
  },
  {
    path: LOCATION_ROUTES.EXPLORE,
    element: <ExploreLocationsPage />,
  },
];
