import { authRoutes } from "@/modules/auth/routes";
import DashboardLayout from "@/modules/core/layout/dashboard-layout";
import { locationRoutes } from "@/modules/locations/routes";
import { marketingRoutes } from "@/modules/marketing/routes";
import { createBrowserRouter } from "react-router-dom";
import GuardedRoute from "./GuardedRoute";

export const appRouter = createBrowserRouter([
  ...authRoutes,
  ...marketingRoutes,
  {
    path: "",
    element: <GuardedRoute component={<DashboardLayout />} />,
    children: [...locationRoutes],
  },
]);
