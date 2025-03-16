import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { locationQueryKeys } from ".";
import { Location } from "../types";

const getLocationById = async (id: string): Promise<Location> => {
  const { data } = await axios.get<Location>(`/locations/${id}`);
  return data;
};

export const useGetLocationById = (id: string) => {
  return useQuery<Location, Error>({
    queryKey: locationQueryKeys.location(id),
    queryFn: () => getLocationById(id),
    enabled: !!id,
  });
};
