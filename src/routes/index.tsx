import { authRoutes } from "@/modules/auth/routes";
import DashboardLayout from "@/modules/core/layout/dashboard-layout";
import { locationRoutes } from "@/modules/locations/routes";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  ...authRoutes,

  {
    path: "",
    element: <DashboardLayout />,
    children: [...locationRoutes],
  },
]);
