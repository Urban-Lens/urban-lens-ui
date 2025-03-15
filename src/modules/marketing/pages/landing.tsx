import landingImage from "@/assets/landing.png";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-start px-4">
        <div className="flex flex-col items-start justify-center gap-6 pt-40 md:items-center">
          <p className="w-full text-left font-medium text-muted-foreground md:text-center">
            Real-time. Intelligent. Analytics.
          </p>
          <h1 className="text-left text-4xl font-semibold tracking-tight text-primary md:mx-auto md:w-3/4 md:text-center md:text-7xl">
            Transform CCTV streams into actionable insights
          </h1>
          <p className="text-left text-muted-foreground md:w-3/4 md:text-center md:text-lg">
            AI-powered analytics platform that turns live video feeds into
            valuable traffic data. Make informed decisions for your business
            across Jamaica.
          </p>
          <div className="my-4 flex w-full justify-center">
            <Button className="w-full sm:w-auto">
              <Link to="/register">Start Analyzing</Link>
            </Button>
          </div>
          <div className="relative mt-auto h-auto min-h-[200px] w-full md:min-h-[300px] flex flex-row items-center justify-center">
            <div className="relative w-full max-w-[1200px] p-[1px] rounded-t-2xl bg-gradient-to-b from-primary/30 to-transparent">
              <img
                src={landingImage}
                alt="UrbanLens Analytics Dashboard showing real-time traffic analysis"
                className="object-contain object-bottom rounded-t-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
