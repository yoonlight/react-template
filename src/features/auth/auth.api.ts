import { useApi } from "../../api";
import {
  ILoginRequest,
  ILoginResponse,
  IRegsiterRequest,
} from "./auth.interface";

export const useAuthAPI = () => {
  const api = useApi();

  const login = (body: ILoginRequest) =>
    api.post<ILoginResponse>("/auth/login", body);
  const register = (body: IRegsiterRequest) => api.post("/auth/register", body);
  const checkRegistered = (uid: string) => api.get(`/auth/uid/${uid}`);
  return {
    login,
    register,
    checkRegistered,
  };
};
