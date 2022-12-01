import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useUserAPI } from "./user.api";
import { userState } from "./user.state";

export const useGetUserProfile = () => {
  const [user, setUser] = useRecoilState(userState);
  const api = useUserAPI();
  return useQuery("user", api.profile, {
    onSuccess: (res) => setUser(res.data.username),
  });
};
