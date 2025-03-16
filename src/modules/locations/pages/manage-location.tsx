import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cctv, Presentation } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MetricsCard from "../components/metrics-card";
import { PedestrianTrafficCard } from "../components/pedestrian-chart";
import { TrafficComparisonCard } from "../components/traffic-chart";
import { useGetLocationMetrics } from "../hooks/getLocationMetrics";
import { LOCATION_ROUTES } from "../routes/routes";
import { ILocation } from "../types";
import { useGetLocationRecommendation } from "../hooks/getLocationRecommendation";
import { useGetCampaignRecommendation } from "../hooks/getRecommendation";
import { useGenerateRecommendation } from "../hooks/businessRecommendation";
import { getYoutubeThumbnail } from "../components/location-card";
import { useGetBusinessRecommendation } from "../hooks/businessSummary";

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

  const { data: locationRecommendation } = useGetLocationRecommendation(
    location?.id ?? ""
  );

  const { data: businessRecommendation } = useGetBusinessRecommendation(
    location?.id ?? ""
  );

  console.log(businessRecommendation)

  const { data: recommendations } = useGetCampaignRecommendation(
    location?.id ?? ""
  );



  // Recommendation mutation hook.
  const { mutate: generateRecommendation, data: _recommendationData } =
    useGenerateRecommendation();

  // On mount, if location available, generate recommendation.
  useEffect(() => {
    if (!recommendations && location) {
      generateRecommendation(location.id);
    }
  }, [location, generateRecommendation]);

  // If there's an input_stream_url, try to get the YouTube thumbnail.
  const youtubeThumbnail =
    location && location.input_stream_url
      ? getYoutubeThumbnail(location.input_stream_url)
      : undefined;
  // Use YouTube thumbnail if available, otherwise fallback to location.thumbnail.
  const thumbnailSrc = youtubeThumbnail;

  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <img
        src={thumbnailSrc}
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
          value={Math.round(metrics?.timeseries?.[0].vehicle_count ?? 0)}
          //   percentageChange={2.9}
          //   comparisonValue={130}
          icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
        />
        <MetricsCard
          title="Number of Pedestrians"
          value={Math.round(metrics?.timeseries?.[0].people_count ?? 0)}
          //   percentageChange={2.9}
          //   comparisonValue={130}
          icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
        />
        {locationRecommendation && (
          <MetricsCard
            title="Location Recommendation"
            value={locationRecommendation?.evaluation_terms}
            icon={
              <Presentation
                className="h-5 w-5 text-primary"
                strokeWidth={1.5}
              />
            }
            detailsUrl={
              LOCATION_ROUTES.MANAGE_LOCATION.VIEW_CAMPAIGN_REC.DETAIL(
                location?.id ?? ""
              ) ?? ""
            }
          />
        )}
{/* 
        <MetricsCard
          title="Today's Campaign Recommendation"
          value={businessRecommendation?.recommendation ?? ""}
          icon={
            <Presentation className="h-5 w-5 text-primary" strokeWidth={1.5} />
          }
        /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PedestrianTrafficCard
          currentCount={Math.round(metrics?.timeseries?.[0].people_count ?? 0)}
          percentageChange={2.9}
          timeseriesData={metrics?.timeseries.reverse() ?? []}
        />
        <TrafficComparisonCard
          totalCount={Math.round(
            (metrics?.timeseries?.[0].people_count ?? 0) +
              (metrics?.timeseries?.[0].vehicle_count ?? 0)
          )}
          pedestrianCount={Math.round(
            metrics?.timeseries?.[0].people_count ?? 0
          )}
          vehicleCount={Math.round(metrics?.timeseries?.[0].vehicle_count ?? 0)}
        />
      </div>
    </div>
  );
};

export default ManageLocationPage;
