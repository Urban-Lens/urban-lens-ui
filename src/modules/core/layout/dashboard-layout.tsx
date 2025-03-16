import { useAuth } from "@/modules/auth/provider";
import { LOCATION_ROUTES } from "@/modules/locations/routes/routes";
import { Aperture,} from "lucide-react";
import { Outlet } from "react-router-dom";
import { Tab, Tabs } from "../components/Tabs";
import { useGetAccountDetails } from "@/modules/auth/hooks/getAccountDetails";
import { UserAvatar } from "../components/UserAvatar";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Locations", href: LOCATION_ROUTES.ROOT },
  // { label: "Explore", href: LOCATION_ROUTES.EXPLORE },
//   { label: "Campaigns", href: "/dashboard/campaigns" },
  // { label: "Metrics & Analytics", href: "/dashboard/metrics" },
];

export const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  const { data: user } = useGetAccountDetails(isAuthenticated);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white z-10">
        <div className="flex items-center justify-between px-4 py-6 gap-2 mb-2 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <Aperture className="text-primary" />
            <h2 className="text-primary font-semibold text-lg">Urban Lens</h2>
          </div>
          {user && <UserAvatar user={user} />}
        </div>
        <nav className="">
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
      <main className="bg-white mt-32">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
