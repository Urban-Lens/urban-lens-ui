import { createRoot } from "react-dom/client";
import "./index.css";

import { AppProviders } from "./provider/index.tsx";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <RouterProvider router={appRouter} />
  </AppProviders>
);
