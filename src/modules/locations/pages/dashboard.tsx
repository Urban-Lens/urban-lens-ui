import { Cctv, Presentation } from "lucide-react";
import MetricsCard from "../components/metrics-card";
import { useEffect, useState } from "react";
import { RealTimeChart } from "../components/real-time-chart";
import { generateRandomData } from "@/lib/utils";
import { DataPoint } from "../types";
import PointsOfInterest from "../components/poi";
import { useGetMyLocations } from "../hooks/getMyLocations";
import { useGetLocationMetrics } from "../hooks/getLocationMetrics";

const Dashboard = () => {
  const { data: locations } = useGetMyLocations();
  const { data: metrics } = useGetLocationMetrics({
    time_aggregation: "hour",
  });

  console.log(metrics);

  const [chartData, setChartData] = useState<DataPoint[]>(
    generateRandomData(20)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            value1: Math.floor(Math.random() * 100),
            value2: Math.floor(Math.random() * 80),
            value3: Math.floor(Math.random() * 60),
          },
        ];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 py-4 flex flex-col gap-4">
      <div>
        <h1 className="font-semibold text-lg">Overview</h1>
        <p className="text-sm text-gray-500">
          See how well your locations are doing
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricsCard
          title="Locations Tracked"
          value={locations?.length ?? 0}
          percentageChange={2.9}
          comparisonValue={130}
          icon={<Cctv className="h-5 w-5 text-primary scale-x-[-1]" />}
        />
        <MetricsCard
          title="Average Daily Traffic"
          value={320}
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
      <div className="flex flex-row gap-6 flex-wrap">
        <div className="flex-1/2">
          <RealTimeChart locations={locations ?? []} data={chartData} />
        </div>
        <div className="flex-1">
          <PointsOfInterest locations={locations ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
