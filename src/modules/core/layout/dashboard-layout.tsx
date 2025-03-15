import { Aperture } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Explore", href: "/explore" },
  { label: "Locations", href: "/locations" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Metrics & Analytics", href: "/metrics" },
];

export const DashboardLayout = () => {
  const { pathname } = useLocation();

  // Helper function to determine if the link is active.
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 p-4">
          <Aperture className="text-gray-700" />
          <h2 className="text-primary font-semibold">Urban Lens</h2>
        </div>

        {/* Top Nav */}
        <nav className="py-2 px-8 flex justify-around border-t border-gray-100">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={
                  "relative inline-flex items-center font-semibold pb-2 " +
                  (active
                    ? "text-green-600 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-green-600"
                    : "text-gray-500 hover:text-gray-700")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="bg-white">
        <Outlet />
      </main>
    </>
  );
};
