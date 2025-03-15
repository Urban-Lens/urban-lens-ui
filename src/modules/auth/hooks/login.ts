import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { ILoginCredentials, ILoginResponse } from "../types";

const login = async (
  credentials: ILoginCredentials
): Promise<ILoginResponse> => {
  const formData = new URLSearchParams();
  formData.append("password", credentials.password);
  formData.append("username", credentials.email);

  const { data } = await axios.post<ILoginResponse>("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return data;
};

export const useLogin = (
  onSuccess: (loginResponse: ILoginResponse) => void
) => {
  return useMutation<ILoginResponse, Error, ILoginCredentials>({
    mutationFn: async (loginCredentials: ILoginCredentials) => {
      const response = await login(loginCredentials);
      return response;
    },
    onError: () => {
      toast.error("Invalid username or password. Please try again.");
    },

    onSettled: async (loginResponse: ILoginResponse | undefined) => {
      if (loginResponse) {
        toast.success("Login Successful");
        onSuccess(loginResponse);
      }
    },
  });
};
