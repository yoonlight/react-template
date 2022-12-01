import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../features/auth/auth.state";

export const api = axios.create({ baseURL: "/api" });

export const useApi = () => {
  const [auth, setAuth] = useRecoilState(authState);

  if (auth) {
    return axios.create({
      baseURL: "/api",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
  }
  return axios.create({ baseURL: "/api" });
};
