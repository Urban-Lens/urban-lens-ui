import { RouteObject } from "react-router-dom";
import ManageLocationLayout from "../components/manage-location-layout";
import { AddLocationPage } from "../pages/add-location";
import Dashboard from "../pages/dashboard";
import { ExploreLocationsPage } from "../pages/explore-locations";
import LiveStreamPage from "../pages/live-stream";
import ManageLocationPage from "../pages/manage-location";
import { MyLocationsPage } from "../pages/my-locations";
import { LOCATION_ROUTES } from "./routes";
import ViewCampaignRecommendationPage from "../pages/view-campaign-recommendation";

export const locationRoutes: RouteObject[] = [
  {
    path: LOCATION_ROUTES.ROOT,
    element: <MyLocationsPage />,
  },
  {
    path: LOCATION_ROUTES.EXPLORE,
    element: <ExploreLocationsPage />,
  },
  {
    path: LOCATION_ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: LOCATION_ROUTES.ADD_POI,
    element: <AddLocationPage />,
  },
  {
    path: LOCATION_ROUTES.MANAGE_LOCATION.OVERVIEW.ROOT,
    element: <ManageLocationLayout />,
    children: [
      {
        path: "",
        element: <ManageLocationPage />,
      },
      {
        path: LOCATION_ROUTES.MANAGE_LOCATION.LOCATION_STREAM,
        element: <LiveStreamPage />,
      },
      {
        path: LOCATION_ROUTES.MANAGE_LOCATION.VIEW_CAMPAIGN_REC.ROOT,
        element: <ViewCampaignRecommendationPage />,
      },
      // {
      //   path: LOCATION_ROUTES.MANAGE_LOCATION.VISITORS,
      //   element: <VisitorsPage />,
      // },
      // {
      //   path: LOCATION_ROUTES.MANAGE_LOCATION.CAMPAIGNS,
      //   element: <CampaignsPage />,
      // },
    ],
  },
];
