import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { locationQueryKeys } from ".";
import { LOCATION_ROUTES } from "../routes/routes";
import { ILocation } from "../types";

const getLocations = async () => {
  return (await axios.get<ILocation[]>(LOCATION_ROUTES.API.GET_LOCATIONS)).data;
};

export const useGetLocations = () => {
  return useQuery<ILocation[], Error>({
    queryKey: locationQueryKeys.getLocations,
    queryFn: () => getLocations(),
  });
};
