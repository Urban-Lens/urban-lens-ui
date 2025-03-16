import { AlertCircle, Loader2 } from "lucide-react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useGetLocationById } from "../hooks/getLocationById";

const ManageLocationLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { data: location, isLoading, error } = useGetLocationById(id!);

  const navigationLinks = [
    { label: "Overview", path: "" },
    { label: "Location Stream", path: "location-stream" },
    // { label: "Visitors", path: "visitors" },
    // { label: "Campaigns", path: "campaigns" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <div className="text-center">
          <h3 className="font-semibold text-lg">Error Loading Location</h3>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative h-full flex-1">
      <div className="flex flex-col gap-2 fixed top-32 left-0 min-h-[90vh] w-64 border-r border-gray-200 px-4 py-6 bg-background">
        <Link
          to="/locations"
          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2 mb-2 font-semibold"
        >
          Back to Locations
        </Link>
        <p className="font-light text-lg text-muted-foreground">
          {location?.address || "Manage Location"}
        </p>
        <nav className="mt-4">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === ""}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 pl-64">
        <Outlet context={{ location, isLoading, error }} />
      </div>
    </div>
  );
};

export default ManageLocationLayout;
