import { api } from "./api";
import {
  ILoginRequest,
  ILoginResponse,
  IRegsiterRequest,
} from "./auth.interface";

export const authAPI = {
  login: (body: ILoginRequest) => api.post<ILoginResponse>("/auth/login", body),
  register: (body: IRegsiterRequest) => api.post("/auth/register", body),
  checkRegistered: (uid: string) => api.get(`/auth/uid/${uid}`),
};
