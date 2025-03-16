import { Link, NavLink, Outlet } from "react-router-dom";

const ManageLocationLayout = () => {
  const navigationLinks = [
    { label: "Overview", path: "" },
    { label: "Location Stream", path: "location-stream" },
    { label: "Visitors", path: "visitors" },
    { label: "Campaigns", path: "campaigns" },
  ];

  return (
    <div className="flex flex-col gap-6 relative h-full flex-1">
      <div className="flex flex-col gap-2 absolute top-0 left-0 min-h-[90vh] w-64 border-r border-gray-200 px-4 py-6">
        <Link
          to="/locations"
          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2 mb-2 font-semibold"
        >
          Back to Points of Interest
        </Link>
        <p className="font-light text-lg text-muted-foreground">
          Manage Location
        </p>
        <nav className="mt-4">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
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
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLocationLayout;
