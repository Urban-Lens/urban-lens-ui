import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "sonner";

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
  industry: string;
  budget: number;
}

export interface IRegisterResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const register = async (
  credentials: IRegisterCredentials
): Promise<IRegisterResponse> => {
  const { data } = await axios.post<IRegisterResponse>("/auth/register", credentials);
  return data;
};

export const useRegister = (
  onSuccess: (registerResponse: IRegisterResponse) => void
) => {
  return useMutation<IRegisterResponse, Error, IRegisterCredentials>({
    mutationFn: async (registerCredentials: IRegisterCredentials) => {
      const response = await register(registerCredentials);
      return response;
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
    onSettled: async (registerResponse: IRegisterResponse | undefined) => {
      if (registerResponse) {
        toast.success("Registration Successful");
        onSuccess(registerResponse);
      }
    },
  });
}; 