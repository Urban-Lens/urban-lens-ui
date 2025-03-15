import { RouteObject } from "react-router-dom";
import Home from "../pages/landing";

export const marketingRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];
