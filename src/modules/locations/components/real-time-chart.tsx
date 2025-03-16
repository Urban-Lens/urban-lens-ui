import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ILocation } from "../types";

interface ChartDataPoint {
  time: string;
  [key: string]: string | number;
}

interface RealTimeChartProps {
  locations: ILocation[];
  data: ChartDataPoint[];
  timeAggregation: "hour" | "day" | "seconds";
}

const MOVING_AVERAGE_WINDOW = 5;
const FORECAST_PERIODS = 5;

export function RealTimeChart({
  data,
  locations,
  timeAggregation,
}: RealTimeChartProps) {
  // State for active lines
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  // Update active keys when locations change
  useEffect(() => {
    setActiveKeys(Object.fromEntries(locations.map((loc) => [loc.id, true])));
  }, [locations]);

  // Generate HSL colors for each location
  const chartLocations = useMemo(
    () =>
      locations.map((loc, index) => {
        const hue = (index * 137.5) % 360; // Use golden ratio to spread colors
        return {
          id: loc.id,
          name: loc.address,
          color: `hsl(${hue}, 70%, 50%)`,
        };
      }),
    [locations]
  );

  // Calculate total traffic from current chart data
  const totalTraffic = useMemo(() => {
    if (!data.length) return 0;

    // Get the latest data point
    const latestPoint = data[data.length - 1];

    // Sum up all active location values
    return Object.entries(latestPoint)
      .filter(([key]) => key !== "time" && activeKeys[key])
      .reduce(
        (sum, [, value]) => sum + (typeof value === "number" ? value : 0),
        0
      );
  }, [data, activeKeys]);

  // Toggle line visibility
  const toggleKey = useCallback((key: string) => {
    setActiveKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // A tick formatter that changes based on the aggregation level
  const tickFormatter = useCallback(
    (value: string) => {
      const date = new Date(value);
      if (timeAggregation === "day") {
        return date.toLocaleDateString();
      } else if (timeAggregation === "hour") {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (timeAggregation === "seconds") {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
      return value;
    },
    [timeAggregation]
  );

  const tooltipFormatter = useCallback(
    (value: number, name: string) => {
      const loc = chartLocations.find((l) => l.id === name);
      return [value, loc?.name ?? name];
    },
    [chartLocations]
  );

  // Memoize the toggle buttons
  const locationButtons = useMemo(
    () =>
      chartLocations.map((location) => (
        <button
          key={location.id}
          onClick={() => toggleKey(location.id)}
          className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm ${
            activeKeys[location.id]
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50"
          }`}
        >
          <span
            className="block h-2 w-2 rounded-full"
            style={{ backgroundColor: location.color }}
          />
          {location.name}
        </button>
      )),
    [chartLocations, activeKeys, toggleKey]
  );

  // Update the forecast data generation
  const { processedData, forecastData } = useMemo(() => {
    if (!data.length) return { processedData: [], forecastData: [] };

    // Calculate moving averages
    const movingAverages = locations.map((location) => {
      const values = data.map((d) => Number(d[location.id]) || 0);
      return values.map((_, index) => {
        const start = Math.max(0, index - MOVING_AVERAGE_WINDOW + 1);
        const subset = values.slice(start, index + 1);
        return subset.reduce((a, b) => a + b, 0) / subset.length;
      });
    });

    // Generate forecast data
    const lastValues = movingAverages.map((ma) => ma[ma.length - 1] || 0);
    const forecast = [];
    const lastTime = new Date(data[data.length - 1].time);
    const interval =
      timeAggregation === "hour"
        ? 3600000
        : timeAggregation === "day"
        ? 86400000
        : 1000;

    // Start forecast from last data point
    for (let i = 0; i < FORECAST_PERIODS; i++) {
      const newTime = new Date(lastTime.getTime() + (i + 1) * interval);
      const point: ChartDataPoint = {
        time: newTime.toISOString(),
        isForecast: true,
        // Store forecast values in separate keys
        ...Object.fromEntries(
          locations.map((loc, idx) => [`${loc.id}-forecast`, lastValues[idx]])
        ),
      };
      forecast.push(point);
    }

    // Combine data with moving averages (without forecast flag)
    const processed = data.map((d, index) => ({
      ...d,
      ...Object.fromEntries(
        locations.map((loc, idx) => [
          `${loc.id}-ma`,
          movingAverages[idx][index],
        ])
      ),
    }));

    return { processedData: processed, forecastData: forecast };
  }, [data, locations, timeAggregation]);

  // Update the chartLines to use separate forecast keys
  const chartLines = useMemo(
    () =>
      chartLocations.flatMap((location) => {
        if (!activeKeys[location.id]) return null;

        return [
          // Original data line (solid)
          <Line
            key={location.id}
            type="monotone"
            dataKey={location.id}
            stroke={location.color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />,
          // Historical moving average (solid)
          <Line
            key={`${location.id}-ma`}
            type="monotone"
            dataKey={`${location.id}-ma`}
            stroke={location.color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            strokeOpacity={0.7}
          />,
          // Forecast line (dotted)
          <Line
            key={`${location.id}-forecast`}
            type="monotone"
            dataKey={`${location.id}-forecast`}
            stroke={location.color}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            connectNulls
            isAnimationActive={false}
            strokeOpacity={0.7}
          />,
        ];
      }),
    [chartLocations, activeKeys]
  );

  return (
    <TooltipProvider>
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <p className="font-light text-lg text-muted-foreground">
                  Overall Traffic
                </p>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sum of traffic from visible locations:</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Shows latest data point</li>
                      <li>Updates based on selected time interval</li>
                      <li>Only includes toggled-on locations</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-4xl">{totalTraffic.toLocaleString()}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex flex-wrap gap-2 flex-1">{locationButtons}</div>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to toggle location visibility:</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Colored buttons show active locations</li>
                  <li>Toggle affects overall traffic calculation</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                tickFormatter={tickFormatter}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  fontSize: "12px",
                }}
                formatter={tooltipFormatter}
              />
              {chartLines}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
