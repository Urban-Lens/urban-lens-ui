import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  value: string | number;
  percentageChange?: number;
  comparisonValue?: number;
  isPositive?: boolean;
  icon: ReactNode;
}

export default function MetricsCard({
  title,
  value,
  percentageChange,
  comparisonValue,
  isPositive = true,
  icon,
}: Props) {
  return (
    <div className="rounded-lg bg-white p-4 border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-3">
            <h2 className="text-sm text-gray-600">{title}</h2>
          </div>
          {percentageChange !== undefined && (
            <span
              className={`text-xs font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {percentageChange}%{isPositive ? "↑" : "↓"}
            </span>
          )}
          <div className="ml-auto">{icon}</div>
        </div>
      </div>

      <div className="mt-1">
        <span
          className={`${
            typeof value === "number" ? "text-3xl" : "text-xl"
          } font-semibold text-gray-900 leading-none`}
        >
          {value}
        </span>
      </div>

      {comparisonValue !== undefined && (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-gray-500">Compared to yesterday</span>
          <span className="text-xs font-medium text-gray-900">
            {comparisonValue}
          </span>
        </div>
      )}
    </div>
  );
}
