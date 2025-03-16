"use client";

import { Cctv, Loader2 } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MetricsCard from "../components/metrics-card";
import { ILocation } from "../types";
import { Button } from "@/components/ui/button";
import { HLSPlayer } from "../components/hls-player";
import { useGetLocationMetrics } from "../hooks/getLocationMetrics";
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

export const getEmbedUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  if (url.includes("watch?v=")) {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  }
  return url;
};

const LiveStreamPage = () => {
  const { location } = useOutletContext<LocationContext>();
  const [isStreamLoading, setIsStreamLoading] = useState(true);
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

  // streamType: "live" for YouTube embed, "object" for HLS stream.
  const [streamType, setStreamType] = useState<"live" | "object">("live");

  const getStreamUrl = (): string | undefined => {
    if (!location) return undefined;
    if (streamType === "live") {
      return getEmbedUrl(location.input_stream_url);
    } else if (streamType === "object") {
      return `http://98.80.189.39:8080/hls_streams/${location.id}/index.m3u8`;
    }
    return undefined;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2 w-full justify-end">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="flex gap-4">
        <Button
          variant={streamType === "live" ? "default" : "outline"}
          onClick={() => setStreamType("live")}
          className="flex-1"
        >
          Live Stream
        </Button>
        <Button
          variant={streamType === "object" ? "default" : "outline"}
          onClick={() => setStreamType("object")}
          className="flex-1"
        >
          Object Detection
        </Button>
      </div>

      <div className="relative bg-black rounded-lg overflow-hidden min-h-[500px]">
        {isStreamLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {streamType === "object" ? (
          <HLSPlayer url={getStreamUrl()!} autoPlay controls />
        ) : (
          <iframe
            src={getEmbedUrl(location?.input_stream_url)}
            className="w-full h-full absolute inset-0"
            onLoad={() => setIsStreamLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Live Stream"
          />
        )}
      </div>
    </div>
  );
};

export default LiveStreamPage;
