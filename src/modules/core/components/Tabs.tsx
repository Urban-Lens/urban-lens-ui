import { ReactNode, Children, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TabProps = {
  label: string;
  href: string;
  children: ReactNode;
};

type TabsProps = {
  children: ReactElement<TabProps>[];
  className?: string;
};

export const Tabs = ({ children, className }: TabsProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the active tab by matching the current pathname.
  // This checks for an exact match or if the pathname starts with the tab's href.
  const activeKey =
    children.find(
      (child) =>
        location.pathname === child.props.href ||
        location.pathname.startsWith(child.props.href + "/")
    )?.props.label || children[0]?.props.label;

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="flex border-b gap-16 border-gray-300 px-8">
        {Children.map(children, (child) => (
          <button
            key={child.props.label}
            onClick={() => navigate(child.props.href)}
            className={`py-3 px-4 text-sm font-semibold hover:cursor-pointer hover:text-primary transition-colors duration-300 ${
              activeKey === child.props.label
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}
          >
            {child.props.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4  hover:cursor-pointer">
        {Children.map(children, (child) =>
          activeKey === child.props.label ? (
            <div>{child.props.children}</div>
          ) : null
        )}
      </div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};
