import { authRoutes } from "@/modules/auth/routes";
import { locationRoutes } from "@/modules/locations/routes";
import { marketingRoutes } from "@/modules/marketing/routes";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  ...authRoutes,
  ...locationRoutes,
  ...marketingRoutes
]);
