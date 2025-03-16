import { Navigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/provider";
import { JSX } from "react";

type GuardedRouteProps = {
  component: JSX.Element;
};

/** Route to restrict access from authentication */
const GuardedRoute = ({ component }: GuardedRouteProps) => {
  const { isAuthenticated } = useAuth();
  return <>{isAuthenticated ? component : <Navigate to="/login" />}</>;
};

export default GuardedRoute;
