import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { toast } from "sonner";

export interface IRegisterCredentials {
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  password: string;
  industry: string;
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
  const { data } = await axios.post<IRegisterResponse>("/users", credentials);
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