import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LOCATION_ROUTES } from "../routes/routes";
import { ILocation, ILocationMetricsResponse } from "../types";

interface Props {
  locations: ILocation[];
  metricsData?: ILocationMetricsResponse;
}

export function PointsOfInterest({ locations, metricsData }: Props) {
  const navigate = useNavigate();

  // Calculate points based on location averages from timeseries
  const points = useMemo(() => {
    if (!metricsData?.timeseries || !locations.length) return [];

    // Group timeseries data by location
    const locationData = metricsData.timeseries.reduce((acc, metric) => {
      if (!acc[metric.source_id]) {
        acc[metric.source_id] = [];
      }
      acc[metric.source_id].push(metric);
      return acc;
    }, {} as Record<string, typeof metricsData.timeseries>);

    // Calculate average for each location
    return locations.map((loc) => {
      const locationMetrics = locationData[loc.id] || [];
      const total = locationMetrics.reduce(
        (sum, metric) => sum + metric.people_count + metric.vehicle_count,
        0
      );
      const average = locationMetrics.length
        ? Math.round(total / locationMetrics.length)
        : 0;

      return {
        id: loc.id,
        name: loc.address,
        votes: average,
      };
    });
  }, [locations, metricsData?.timeseries]);

  // Sort points by votes (highest first)
  const sortedPoints = useMemo(
    () => [...points].sort((a, b) => b.votes - a.votes),
    [points]
  );

  const handlePoiClick = (id: string) => {
    navigate(LOCATION_ROUTES.MANAGE_LOCATION.OVERVIEW.DETAIL(id));
  };

  return (
    <TooltipProvider>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <p className="font-light text-lg text-muted-foreground">
              Locations
            </p>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Locations ranked by average traffic:</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Traffic = people + vehicles</li>
                  <li>Updates based on selected time interval</li>
                  <li>Click to view location details</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {sortedPoints.map((point, index) => (
              <li
                key={point.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => handlePoiClick(point.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePoiClick(point.id);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 flex items-center justify-center p-0"
                  >
                    {index + 1}
                  </Badge>
                  <p className="font-medium">{point.name}</p>
                </div>
                <span className="text-sm font-medium">
                  {point.votes.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default PointsOfInterest;
