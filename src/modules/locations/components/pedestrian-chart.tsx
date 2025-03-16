"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {  HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ILocationTimeSeries } from "@/types/metrics";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PedestrianTrafficCardProps {
  title?: string;
  currentCount: number;
  percentageChange?: number;
  timeseriesData: ILocationTimeSeries[];
  className?: string;
}

export function PedestrianTrafficCard({
  title = "Pedestrian Traffic",
  currentCount,
  timeseriesData,
  className,
}: PedestrianTrafficCardProps) {
  // Format data for the chart
  const chartData = timeseriesData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    count: item.people_count,
  }));

  // Determine if trend is positive or negative

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <p className="font-light text-lg text-muted-foreground">
                {title}
              </p>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Summary of traffic data:</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Shows latest data point</li>
                    <li>Updates based on selected time interval</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-4xl">{currentCount}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                hide={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => `${value}`}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
