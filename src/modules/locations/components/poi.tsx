"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PointOfInterest {
  id: string;
  name: string;
  votes: number;
}

// Using the same locations as real-time-chart
const locations = [
  { id: "value1", name: "Pavillion Mall" },
  { id: "value2", name: "Clock tower Plaza" },
  { id: "value3", name: "Liguanea Plaza" },
  { id: "value4", name: "Barbican" },
] as const;

export function PointsOfInterest() {
  const navigate = useNavigate();
  const [points, setPoints] = useState<PointOfInterest[]>(() =>
    locations.map((loc) => ({
      id: loc.id,
      name: loc.name,
      votes: Math.floor(Math.random() * 100) + 50, // Initial random votes between 50-150
    }))
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((currentPoints) => {
        return currentPoints.map((point) => {
          // Randomly update votes (simulating other users voting)
          const voteChange = Math.floor(Math.random() * 6) - 2; // -2 to +3 range
          return {
            ...point,
            votes: Math.max(0, point.votes + voteChange),
          };
        });
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Sort points by votes
  const sortedPoints = [...points].sort((a, b) => b.votes - a.votes);

  const handlePoiClick = (id: string) => {
    navigate(`/locations/${id}`);
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
              onClick={() => handlePoiClick(point.id)}
              role="button"
              tabIndex={0}
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
                <div>
                  <p className="font-medium">{point.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{point.votes}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default PointsOfInterest;
