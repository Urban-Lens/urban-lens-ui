import { Cctv, Presentation } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import locationImage from "../../../assets/location.png";
import MetricsCard from "../components/metrics-card";
import { ILocation } from "../types";
import { useGetLocationMetrics } from "../hooks/getLocationMetrics";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationContext {
  location: ILocation | undefined;
  isLoading: boolean;
  error: Error | null;
}

const ManageLocationPage = () => {
  const { location } = useOutletContext<LocationContext>();

  // Internal state: "hour", "day", or "seconds"
  const [aggregation, setAggregation] = useState<"hour" | "day" | "seconds">(
    "hour"
  );

  // Convert internal state to API value: "seconds" becomes an empty string.
  const apiAggregation = aggregation === "seconds" ? "" : aggregation;

  // Fetch metrics using selected aggregation and location id.
  const { data: metrics } = useGetLocationMetrics({
    time_aggregation: apiAggregation,
    location_id: location?.id,
  });

  // Determine a friendly label for the current aggregation.
  const aggregationLabel =
    aggregation.charAt(0).toUpperCase() + aggregation.slice(1);

  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <img
        src={location?.thumbnail || locationImage}
        alt={location?.address || "Location"}
        className="w-full h-64 object-cover rounded"
      />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-semibold">{location?.address}</h1>
          <p className="text-gray-500 text-sm">{location?.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={aggregation}
            onValueChange={(value) =>
              setAggregation(value as "hour" | "day" | "seconds")
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Aggregation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Hour</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="seconds">Seconds</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Current: {aggregationLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <MetricsCard
          title="Number of Vehicles"
          value={Math.round(metrics?.timeseries?.[0].vehicle_count ?? 0)}
          percentageChange={2.9}
          comparisonValue={130}
          icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
        />
        <MetricsCard
          title="Number of Pedestrians"
          value={Math.round(metrics?.timeseries?.[0].people_count ?? 0)}
          percentageChange={2.9}
          comparisonValue={130}
          icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
        />
        <MetricsCard
          title="Location Recommendation"
          value="Positive, Room for Business Growth"
          icon={
            <Presentation className="h-5 w-5 text-primary" strokeWidth={1.5} />
          }
        />
        <MetricsCard
          title="Today's Campaign Recommendation"
          value="Billboard and Walkboard"
          icon={
            <Presentation className="h-5 w-5 text-primary" strokeWidth={1.5} />
          }
        />
      </div>
    </div>
  );
};

export default ManageLocationPage;
