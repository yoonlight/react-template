import { useApi } from "../../api";
import { IUserResponse } from "./user.interface";

export const useUserAPI = () => {
  const api = useApi();
  const profile = () => api.get<IUserResponse>("/users/hello");
  return {
    profile,
  };
};
