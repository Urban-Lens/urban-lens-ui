import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { locationQueryKeys } from ".";
import { ILocationRecommendation } from "../types";

const getLocationRecommendation = async (
  id: string
): Promise<ILocationRecommendation> => {
  const { data } = await axios.get<ILocationRecommendation>(
    `/analytics/location-recommendation-summary?location_id=${id}`
  );
  return data;
};

export const useGetLocationRecommendation = (id: string) => {
  return useQuery<ILocationRecommendation, Error>({
    queryKey: locationQueryKeys.locationRecommendation(id),
    queryFn: () => getLocationRecommendation(id),
    enabled: !!id,
  });
};
