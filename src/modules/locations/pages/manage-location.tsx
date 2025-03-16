import locationImage from "../../../assets/location.png";
import { Button } from "@/components/ui/button";
import { Presentation } from "lucide-react";
import MetricsCard from "../components/metrics-card";
import { Cctv } from "lucide-react";

const ManageLocationPage = () => {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <img src={locationImage} alt="Location" className="w-full h-64" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-semibold">Half Way Tree</h1>
          <p className="text-gray-500 text-sm">12 Hope Road Kingston 5</p>
        </div>
        <Button>Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
        <MetricsCard
          title="Location Recommendation"
          value="Positive, Room for Business Growth"
          icon={
            <Presentation className="h-5 w-5 text-primary" strokeWidth={1.5} />
          }
        />
      </div>
    </div>
  );
};

export default ManageLocationPage;
