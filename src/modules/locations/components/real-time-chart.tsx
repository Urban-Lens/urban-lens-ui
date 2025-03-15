"use client";

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
import { DataPoint } from "../types";

interface RealTimeChartProps {
  data: DataPoint[];
}

const locations = [
  { id: "value1", name: "Pavillion Mall", color: "var(--chart-1)" },
  { id: "value2", name: "Clock tower Plaza", color: "var(--chart-2)" },
  { id: "value3", name: "Liguanea Plaza", color: "var(--chart-3)" },
  { id: "value4", name: "Barbican", color: "var(--chart-4)" },
] as const;

export function RealTimeChart({ data }: RealTimeChartProps) {
  const [activeKeys, setActiveKeys] = useState(() =>
    Object.fromEntries(locations.map((loc) => [loc.id, true]))
  );

  const toggleKey = (key: keyof typeof activeKeys) => {
    setActiveKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
      </CardHeader>
      <CardContent className="h-[300px]">
        <div className="flex flex-wrap gap-2 mb-4">
          {locations.map((location) => (
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
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                // Show only hours and minutes for cleaner display
                const parts = value.split(":");
                return `${parts[0]}:${parts[1]}`;
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                fontSize: "12px",
              }}
              formatter={(value, name) => {
                const location = locations.find((loc) => loc.id === name);
                return [value, location?.name ?? name];
              }}
            />

            {locations.map(
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
