import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "sonner";

export interface ITrackLocationCredentials {
  location_id: string;
  user_id: string;
}

export interface ITrackLocationResponse {
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  tags: string[];
  input_stream_url: string;
  output_stream_url: string;
  thumbnail: string;
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const trackLocation = async (
  credentials: ITrackLocationCredentials
): Promise<ITrackLocationResponse> => {
  const { data } = await axios.post<ITrackLocationResponse>(
    `/locations/attach-location?location_id=${credentials.location_id}&user_id=${credentials.user_id}`
  );
  return data;
};

export const useTrackLocation = (
  onSuccess: (response: ITrackLocationResponse) => void
) => {
  return useMutation<ITrackLocationResponse, Error, ITrackLocationCredentials>({
    mutationFn: async (credentials: ITrackLocationCredentials) => {
      return await trackLocation(credentials);
    },
    onError: () => {
      toast.error("Failed to attach location. Please try again.");
    },
    onSettled: async (response: ITrackLocationResponse | undefined) => {
      if (response) {
        toast.success(`You are now tracking ${response.address}`);
        onSuccess(response);
      }
    },
  });
};
