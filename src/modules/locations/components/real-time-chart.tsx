import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataPoint, ILocation } from "../types";
import { Label } from "@/components/ui/label";

interface RealTimeChartProps {
  locations: ILocation[];
  data: DataPoint[];
}

export function RealTimeChart({ data, locations }: RealTimeChartProps) {
  // Map the passed locations to chartLocations using the address as the name.

  const chartLocations = locations.map((loc, index) => ({
    id: `value${index + 1}`, // using old keys for now
    name: loc.address,
    color: `var(--chart-${index + 1})`,
  }));

  const [activeKeys, setActiveKeys] = useState(() =>
    Object.fromEntries(chartLocations.map((loc) => [loc.id, true]))
  );

  // Aggregation filter state: "day", "hour", or "seconds"
  const [aggregation, setAggregation] = useState<"day" | "hour" | "seconds">(
    "hour"
  );

  const toggleKey = (key: string) => {
    setActiveKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // A tick formatter that changes based on the aggregation level.
  const tickFormatter = (value: string) => {
    if (aggregation === "day") {
      const date = new Date(value);
      return date.toLocaleDateString();
    } else if (aggregation === "hour") {
      const parts = value.split(":");
      return `${parts[0]}:${parts[1]}`;
    } else if (aggregation === "seconds") {
      return value; // full time string including seconds
    }
    return value;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col items-start justify-start">
          <p className="font-light text-lg text-muted-foreground">
            Overall Traffic
          </p>
          <p className="text-4xl">125,000</p>
        </div>
        <div className="mt-4">
          <Label
            htmlFor="aggregation"
            className="text-sm text-muted-foreground mr-2"
          >
            Aggregation:
          </Label>
          <select
            id="aggregation"
            value={aggregation}
            onChange={(e) =>
              setAggregation(e.target.value as "day" | "hour" | "seconds")
            }
            className="p-1 border rounded"
          >
            <option value="day">Day</option>
            <option value="hour">Hour</option>
            <option value="seconds">Seconds</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="h-[320px] pb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {chartLocations.map((location) => (
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
              ></span>
              {location.name}
            </button>
          ))}
        </div>

        <ResponsiveContainer width="100%" height="100%">
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
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                fontSize: "12px",
              }}
              formatter={(value, name) => {
                const loc = chartLocations.find((l) => l.id === name);
                return [value, loc?.name ?? name];
              }}
            />

            {chartLocations.map(
              (location) =>
                activeKeys[location.id] && (
                  <Line
                    key={location.id}
                    type="monotone"
                    dataKey={location.id}
                    stroke={location.color}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                    dot={false}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
