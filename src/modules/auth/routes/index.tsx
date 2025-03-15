import { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/login";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
];
