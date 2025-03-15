import { authRoutes } from "@/modules/auth/routes";
import { createBrowserRouter } from "react-router-dom";


export const appRouter = createBrowserRouter([
    ...authRoutes,
]);
