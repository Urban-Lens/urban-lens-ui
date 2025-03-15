import { RouteObject } from "react-router-dom";
import { MyLocationsPage } from "../pages/my-locations";
import { DashboardLayout } from "@/modules/core/layout/dashboard-layout";

export const locationRoutes: RouteObject[] = [
  {
    path: "locations",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MyLocationsPage />,
      },
    ],
  },
];
