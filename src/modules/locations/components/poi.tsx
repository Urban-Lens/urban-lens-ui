import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCATION_ROUTES } from "../routes/routes";
import { ILocation } from "../types";

interface PointOfInterest {
  id: string;
  name: string;
  votes: number;
}

interface Props {
  locations: ILocation[];
}

export function PointsOfInterest({ locations }: Props) {
  const navigate = useNavigate();

  const [points, setPoints] = useState<PointOfInterest[]>([]);

  // When locations are fetched, map them to points with random initial votes.
  useEffect(() => {
    if (locations) {
      setPoints(
        locations.map((loc) => ({
          id: loc.id,
          name: loc.address, // using address as display name
          votes: Math.floor(Math.random() * 100) + 50, // random votes between 50 and 150
        }))
      );
    }
  }, [locations]);

  // Simulate real-time vote updates.
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((currentPoints) =>
        currentPoints.map((point) => {
          // Simulate a vote change between -2 and +3.
          const voteChange = Math.floor(Math.random() * 6) - 2;
          return { ...point, votes: Math.max(0, point.votes + voteChange) };
        })
      );
    }, 3000); // Update every 3 seconds.
    return () => clearInterval(interval);
  }, []);

  // Sort points by votes (highest first).
  const sortedPoints = [...points].sort((a, b) => b.votes - a.votes);

  const handlePoiClick = (id: string) => {
    navigate(LOCATION_ROUTES.MANAGE_LOCATION.OVERVIEW.DETAIL(id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="font-light text-lg text-muted-foreground">
          Points of Interest
        </p>
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
              <span className="text-sm font-medium">{point.votes}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default PointsOfInterest;
