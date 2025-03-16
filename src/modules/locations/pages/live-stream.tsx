import { Cctv, Loader2 } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MetricsCard from "../components/metrics-card";
import { Location } from "../types";

interface LocationContext {
  location: Location | undefined;
  isLoading: boolean;
  error: Error | null;
}

const LiveStreamPage = () => {
  const { location } = useOutletContext<LocationContext>();
  const [isStreamLoading, setIsStreamLoading] = useState(true);

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

      <div className="relative bg-black rounded-lg overflow-hidden min-h-[500px]">
        {isStreamLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <iframe
          src={location?.input_stream_url}
          className="w-full h-full absolute inset-0"
          onLoad={() => setIsStreamLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default LiveStreamPage;
