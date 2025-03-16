import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "sonner";

export interface IBusinessRecommendation {
  location_id: string;
  location_address: string;
  recommendations: string[];
  industry: string;
  recommendation_id: number;
  timestamp: string;
  execution_time_ms: number;
}

const generateBusinessRecommendation = async (
  locationId: string
): Promise<IBusinessRecommendation> => {
  const { data } = await axios.post<IBusinessRecommendation>(
    `/analytics/business-recommendation?location_id=${locationId}`
  );
  return data;
};

export const useGenerateRecommendation = () => {
  return useMutation<IBusinessRecommendation, Error, string>({
    mutationFn: async (locationId: string) => {
      return await generateBusinessRecommendation(locationId);
    },
    onError: () => {
      toast.error("Failed to generate recommendation. Please try again.");
    },
  });
};
