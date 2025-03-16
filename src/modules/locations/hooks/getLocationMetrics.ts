import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { locationQueryKeys } from ".";
import { LOCATION_ROUTES } from "../routes/routes";
import { IGetLocationMetricsParams, ILocationMetricsResponse } from "../types";

const getLocationMetrics = async (
  params: IGetLocationMetricsParams
): Promise<ILocationMetricsResponse> => {
  const {
    skip = 0,
    limit = 1000,
    address_filter,
    location_id,
    time_aggregation,
  } = params;
  const queryParams = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
  });
  if (address_filter) queryParams.append("address_filter", address_filter);
  if (location_id) queryParams.append("location_id", location_id);
  if (time_aggregation)
    queryParams.append("time_aggregation", time_aggregation);
  const url = `${
    LOCATION_ROUTES.API.GET_LOCATION_METRICS
  }?${queryParams.toString()}`;
  const { data } = await axios.get(url);
  return data;
};

export const useGetLocationMetrics = (params: IGetLocationMetricsParams) => {
  return useQuery<ILocationMetricsResponse>({
    queryKey: locationQueryKeys.locationMetrics(params),
    queryFn: () => getLocationMetrics(params),
  });
};
