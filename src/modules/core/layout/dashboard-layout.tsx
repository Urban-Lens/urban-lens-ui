import { Aperture } from "lucide-react";
import { Outlet } from "react-router-dom";
import { Tabs, Tab } from "../components/Tabs";
import { LOCATION_ROUTES } from "@/modules/locations/routes/routes";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Explore", href: LOCATION_ROUTES.EXPLORE },
  { label: "Locations", href: LOCATION_ROUTES.ROOT },
  { label: "Campaigns", href: "/dashboard/campaigns" },
  { label: "Metrics & Analytics", href: "/dashboard/metrics" },
];

export const DashboardLayout = () => {
  return (
    <>
      <header className="">
        <div className="flex items-center px-4 py-6 gap-2 mb-2 border-b border-gray-300">
          <Aperture className="text-primary" />
          <h2 className="text-primary font-semibold text-lg">Urban Lens</h2>
        </div>
        <nav className="py-2">
          <Tabs>
            {navItems.map((item) => (
              <Tab
                key={item.label}
                label={item.label}
                href={item.href}
                children={undefined}
              >
                {/* No tab content is rendered here since routing handles it */}
              </Tab>
            ))}
          </Tabs>
        </nav>
      </header>
      <main className="bg-white">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
