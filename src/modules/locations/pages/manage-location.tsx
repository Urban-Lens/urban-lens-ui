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
import { LOCATION_ROUTES } from "../routes/routes";

interface LocationContext {
  location: ILocation | undefined;
  isLoading: boolean;
  error: Error | null;
}

const ManageLocationPage = () => {
  const { location } = useOutletContext<LocationContext>();

  // Aggregation state: "hour", "day", or "seconds" (for UI)
  const [aggregation, setAggregation] = useState<"hour" | "day" | "seconds">(
    "hour"
  );
  // For API, convert "seconds" to empty string.
  const apiAggregation = aggregation === "seconds" ? "" : aggregation;
  const { data: metrics } = useGetLocationMetrics({
    time_aggregation: apiAggregation,
    location_id: location?.id,
  });

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
            <SelectTrigger className="w-32 border-gray-100">
              <SelectValue placeholder="Select Aggregation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Hour</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="seconds">Seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <MetricsCard
          title="Number of Vehicles"
          value={metrics?.timeseries?.[0].vehicle_count ?? 0}
          percentageChange={2.9}
          comparisonValue={130}
          icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
        />
        <MetricsCard
          title="Number of Pedestrians"
          value={metrics?.timeseries?.[0].people_count ?? 0}
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
          detailsUrl={
            LOCATION_ROUTES.MANAGE_LOCATION.VIEW_CAMPAIGN_REC.DETAIL(
              location?.id ?? ""
            ) ?? ""
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
