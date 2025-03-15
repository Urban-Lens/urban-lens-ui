import { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/login";
import RegisterPage from "../pages/register";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
];
