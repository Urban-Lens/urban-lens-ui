import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cctv, HelpCircle, Presentation } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import MetricsCard from "../components/metrics-card";
import PointsOfInterest from "../components/poi";
import { RealTimeChart } from "../components/real-time-chart";
import { useGetLocationMetrics } from "../hooks/getLocationMetrics";
import { useGetMyLocations } from "../hooks/getMyLocations";
import { useNavigate } from "react-router-dom";
import { LOCATION_ROUTES } from "../routes/routes";

interface MetricPoint {
  timestamp: string;
  source_id: string;
  people_count: number;
  vehicle_count: number;
}

type TimeAggregation = "seconds" | "hour" | "day";

const Dashboard = () => {
  const { data: locations = [] } = useGetMyLocations();
  const navigate = useNavigate();
  const [timeAggregation, setTimeAggregation] =
    useState<TimeAggregation>("seconds");

  // Memoize metrics parameters
  const metricsParams = useMemo(
    () => ({
      limit: timeAggregation === "seconds" ? 200 : 1000,
      time_aggregation: timeAggregation === "seconds" ? "" : timeAggregation,
    }),
    [timeAggregation]
  );

  // Memoize query options
  const queryOptions = useMemo(
    () => ({
      refetchInterval:
        timeAggregation === "seconds"
          ? 1000
          : timeAggregation === "hour"
          ? 60000
          : 3600000,
    }),
    [timeAggregation]
  );

  const { data: metricsData } = useGetLocationMetrics(
    metricsParams,
    queryOptions
  );

  // Transform metrics data for the chart
  const chartData = useMemo(() => {
    if (!metricsData?.timeseries) return [];

    return metricsData.timeseries
      .reverse()
      .map((metric: MetricPoint) => {
        const point: { time: string; [key: string]: string | number } = {
          time: new Date(metric.timestamp).toISOString(),
        };

      point[metric.source_id] = metric.people_count + metric.vehicle_count;

      return point;
    });
  }, [metricsData]);

  const handleTimeAggregationChange = useCallback((value: TimeAggregation) => {
    setTimeAggregation(value);
  }, []);

  if (locations.length === 0) {
    return (
      <div className="px-6 py-4 flex flex-col gap-4">
        <div>
          <h1 className="font-semibold text-lg">Overview</h1>
          <p className="text-sm text-gray-500">
            See how well your locations are doing
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mb-4" strokeWidth={1.5} />
          <h3 className="text-xl font-semibold mb-2">No locations yet</h3>
          <p className="text-gray-500 mb-4">
            Start by adding your first location to monitor
          </p>
          <Button onClick={() => navigate(LOCATION_ROUTES.ADD_POI)}>
            Add Your First Location
          </Button>
        </div>
      </div>
    );
  }
  return (
    <TooltipProvider>
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg">Overview</h1>
            <p className="text-sm text-gray-500">
              See how well your locations are doing
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={timeAggregation}
                  onValueChange={handleTimeAggregationChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time aggregation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="hour">Hour</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select time interval for data aggregation:</p>
              <ul className="list-disc list-inside text-sm">
                <li>Seconds: Real-time updates every second</li>
                <li>Hour: Hourly aggregated data</li>
                <li>Day: Daily aggregated data</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricsCard
            title={
              <div className="flex items-center gap-3">
                <span>Locations Tracked</span>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total number of locations being monitored</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            }
            value={locations.length}
            icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
            // isPositive={true}
            // percentageChange={12}
            // comparisonValue={locations.length - 2}
          />

          <MetricsCard
            title={
              <div className="flex items-center gap-3">
                <span>Current Total Traffic</span>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Overall average traffic across all locations:</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Sum of average people and vehicles</li>
                      <li>Updates based on selected time interval</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
            }
            value={Math.round(
              (metricsData?.averages.avg_people ?? 0) +
                (metricsData?.averages.avg_vehicles ?? 0)
            )}
            icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
            // isPositive={true}
            // percentageChange={8}
            // comparisonValue={Math.round(
            //   ((metricsData?.averages.avg_people ?? 0) +
            //     (metricsData?.averages.avg_vehicles ?? 0)) *
            //     0.92
            // )}
          />

          <MetricsCard
            title="Location Recommendation"
            value="Positive, Room for Business Growth"
            icon={
              <Presentation
                className="h-5 w-5 text-primary"
                strokeWidth={1.5}
              />
            }
            isPositive={true}
          />
          <MetricsCard
            title="Today's Campaign Recommendation"
            value="Billboard and Walkboard"
            icon={
              <Presentation
                className="h-5 w-5 text-primary"
                strokeWidth={1.5}
              />
            }
            isPositive={true}
          />
        </div>
        <div className="flex flex-row gap-6 flex-wrap">
          <div className="flex-1/2">
            <RealTimeChart
              locations={locations}
              data={chartData}
              timeAggregation={timeAggregation}
            />
          </div>
          <div className="flex-1">
            <PointsOfInterest locations={locations} metricsData={metricsData} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
