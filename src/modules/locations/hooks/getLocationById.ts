import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { locationQueryKeys } from ".";
import { ILocation } from "../types";

const getLocationById = async (id: string): Promise<ILocation> => {
  const { data } = await axios.get<ILocation>(`/locations/${id}`);
  return data;
};

export const useGetLocationById = (id: string) => {
  return useQuery<ILocation, Error>({
    queryKey: locationQueryKeys.location(id),
    queryFn: () => getLocationById(id),
    enabled: !!id,
  });
};
