import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { locationQueryKeys } from ".";
import { IBusinessRecommendation } from "./businessRecommendation";
import { LOCATION_ROUTES } from "../routes/routes";

const getCampaignRecommendation = async (
  id: string
): Promise<IBusinessRecommendation[]> => {
  const { data } = await axios.get<IBusinessRecommendation[]>(
    LOCATION_ROUTES.API.GET_CAMPAIGN_RECCOMENDATION(id)
  );
  return data;
};

export const useGetCampaignRecommendation = (id: string) => {
  return useQuery<IBusinessRecommendation[], Error>({
    queryKey: locationQueryKeys.campaignRecommendation(id),
    queryFn: () => getCampaignRecommendation(id),
    enabled: !!id,
  });
};
