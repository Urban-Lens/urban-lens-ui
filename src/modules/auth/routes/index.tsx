import { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/login";
import RegisterPage from "../pages/register";
import Home from "../pages/home";

export const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
];
