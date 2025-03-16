import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { IUser } from "../types";

const getAccountDetails = async () => {
  return (await axios.get<IUser>("/auth/me")).data;
};

export const useGetAccountDetails = (isAuthenticated: boolean) => {
  return useQuery<IUser, Error>({
    queryKey: ["accountDetails"],
    queryFn: () => getAccountDetails(),
    enabled: isAuthenticated === true,
  });
};
