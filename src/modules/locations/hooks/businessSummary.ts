import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { locationQueryKeys } from ".";
import { IBusinessRecommendation } from "../types";

const getBusinessRecommendation = async (
  id: string
): Promise<IBusinessRecommendation> => {
  const { data } = await axios.get<IBusinessRecommendation>(
    `/analytics/business-recommendation-summary?location_id=${id}`
  );
  return data;
};

export const useGetBusinessRecommendation = (id: string) => {
  return useQuery<IBusinessRecommendation, Error>({
    queryKey: locationQueryKeys.locationRecommendation(id),
    queryFn: () => getBusinessRecommendation(id),
    enabled: !!id,
  });
};
