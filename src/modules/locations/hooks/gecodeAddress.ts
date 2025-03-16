import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { locationQueryKeys } from ".";

export interface NominatimResult {
  lat: string;
  lon: string;
}

const geocodeAddress = async (address: string): Promise<NominatimResult[]> => {
  const response = await axios.get<NominatimResult[]>(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  return response.data;
};

export const useGeocodeAddress = (address: string) => {
  return useQuery<NominatimResult[], Error>({
    queryKey: locationQueryKeys.geocodedAddress(address),
    queryFn: () => geocodeAddress(address),
    enabled: !!address, // only run query if address is provided
  });
};
