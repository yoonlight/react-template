import { useApi } from "../../api";
import {
  ILoginKakaoRequest,
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
  const loginKakao = (body: ILoginKakaoRequest) =>
    api.post<ILoginResponse>("/auth/login/kakao", body);
  return {
    login,
    register,
    checkRegistered,
    loginKakao,
  };
};
