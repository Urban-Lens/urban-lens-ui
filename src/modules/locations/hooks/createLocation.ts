import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "sonner";

export interface ICreateLocationCredentials {
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  tags: string[];
  input_stream_url: string;
}

export interface ICreateLocationResponse {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  tags: string[];
  input_stream_url: string;
}

const createLocation = async (
  credentials: ICreateLocationCredentials
): Promise<ICreateLocationResponse> => {
  const { data } = await axios.post<ICreateLocationResponse>(
    "/locations", 
    credentials
  );
  return data;
};

export const useCreateLocation = (
  onSuccess: (response: ICreateLocationResponse) => void
) => {
  return useMutation<
    ICreateLocationResponse,
    Error,
    ICreateLocationCredentials
  >({
    mutationFn: async (credentials: ICreateLocationCredentials) => {
      return await createLocation(credentials);
    },
    onError: () => {
      toast.error("Failed to create location. Please try again.");
    },
    onSettled: async (response: ICreateLocationResponse | undefined) => {
      if (response) {
        toast.success("Location created successfully");
        onSuccess(response);
      }
    },
  });
};
