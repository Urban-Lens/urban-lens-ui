"use client";

import { useOutletContext } from "react-router-dom";
import { ILocation } from "../types";
import { useGetCampaignRecommendation } from "../hooks/getRecommendation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { MapPin, Loader2, CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface LocationContext {
  location: ILocation | undefined;
  isLoading: boolean;
  error: Error | null;
}

// A simple function to apply basic markdown styling for **bold** and *italic*
const formatRecommendation = (text: string) => {
  // Replace **text** with <strong>text</strong>
  let formatted = text.replace(
    /\*\*(.*?)\*\*/g,
    "<strong class='text-primary'>$1</strong>"
  );
  // Replace *text* with <em>text</em>
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return formatted;
};

export const ViewCampaignRecommendationPage = () => {
  const { location } = useOutletContext<LocationContext>();

  const {
    data: recommendations,
    isLoading,
    error,
  } = useGetCampaignRecommendation(location?.id ?? "");

  // Format the date for display

  const recommendation = recommendations && recommendations[0];

  const formattedDate =
    recommendation && new Date(recommendation.timestamp).toLocaleString();

  if (isLoading || !recommendation) {
    return (
      <Card className="max-w-4xl mx-auto flex items-center justify-center h-80">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto p-4">
        <p className="text-red-500">Failed to load recommendation.</p>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span>{recommendation.location_address}</span>
        </div>
        <CardTitle className="text-2xl">Advertising Recommendations</CardTitle>
        <CardDescription>
          Industry:{" "}
          <span className="font-medium text-foreground">
            {recommendation.industry}
          </span>{" "}
          • Recommendation #{recommendation.recommendation_id}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <h3 className="font-semibold text-lg mb-4">Top 10 Strategies</h3>
        <ul className="space-y-4">
          {recommendation.recommendations.map((rec, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-medium">
                {index + 1}
              </span>
              <p
                className="leading-7 text-muted-foreground mt-0.5"
                dangerouslySetInnerHTML={{ __html: formatRecommendation(rec) }}
              />
            </li>
          ))}
        </ul>
      </CardContent>

      <Separator />

      <CardFooter className="pt-4 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>Generated: {formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>
            Processing time:{" "}
            {(recommendation.execution_time_ms / 1000).toFixed(2)}s
          </span>
        </div>
        <Button variant="outline" size="sm">
          Export PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewCampaignRecommendationPage;
