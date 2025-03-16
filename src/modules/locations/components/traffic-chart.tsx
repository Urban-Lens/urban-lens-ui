"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface TrafficComparisonCardProps {
  title?: string;
  totalCount: number;
  pedestrianCount: number;
  vehicleCount: number;
  className?: string;
}

export function TrafficComparisonCard({
  title = "Pedestrian Traffic vs Vehicular Traffic",
  totalCount,
  pedestrianCount,
  vehicleCount,
  className,
}: TrafficComparisonCardProps) {
  const data = [
    { name: "Pedestrians", value: pedestrianCount },
    { name: "Vehicles", value: vehicleCount },
  ];

  const COLORS = ["#22c55e", "#3b82f6"];

  const pedestrianPercentage = Math.round((pedestrianCount / totalCount) * 100);
  const vehiclePercentage = Math.round((vehicleCount / totalCount) * 100);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <p className="font-light text-lg text-muted-foreground">
                {title}
              </p>
            </div>
            <p className="text-4xl">
              {totalCount.toLocaleString()}{" "}
              <span className="text-sm text-muted-foreground">
                total traffic
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 rounded-lg shadow border">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.value.toLocaleString()} (
                          {Math.round((data.value / totalCount) * 100)}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[0] }}
            />
            <span className="text-sm text-muted-foreground">Pedestrians</span>
            <span className="ml-auto font-medium">{pedestrianPercentage}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[1] }}
            />
            <span className="text-sm text-muted-foreground">Vehicles</span>
            <span className="ml-auto font-medium">{vehiclePercentage}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
