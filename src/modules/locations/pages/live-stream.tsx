"use client";

import { Cctv, Loader2 } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MetricsCard from "../components/metrics-card";
import { ILocation } from "../types";
import { Button } from "@/components/ui/button";
import { HLSPlayer } from "../components/hls-player";

interface LocationContext {
  location: ILocation | undefined;
  isLoading: boolean;
  error: Error | null;
}

const getEmbedUrl = (url: string | undefined): string | undefined => {
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
  // streamType: "live" for YouTube embed, "object" for HLS stream.
  const [streamType, setStreamType] = useState<"live" | "object">("live");

  const getStreamUrl = (): string | undefined => {
    if (!location) return undefined;
    if (streamType === "live") {
      return getEmbedUrl(location.input_stream_url);
    } else if (streamType === "object") {
      return "http://98.80.189.39:8080/hls_streams/rnXIjl_Rzy4/index.m3u8";
    }
    return undefined;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricsCard
          title="Number of Vehicles"
          value={5}
          percentageChange={2.9}
          comparisonValue={130}
          icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
        />
        <MetricsCard
          title="Number of Pedestrians"
          value={320}
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
