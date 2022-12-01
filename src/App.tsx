import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import { useAuthActions } from "./features/auth/auth.action";
import { authState } from "./features/auth/auth.state";
import { useGetUserProfile } from "./features/user/user.action";
import { userState } from "./features/user/user.state";

function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useRecoilState(userState);
  const authActions = useAuthActions();
  const { status } = useGetUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return navigate("/login");
  }, [auth]);

  if (status === "loading") return <div>loading</div>;
  if (status === "error") return <div>error</div>;

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <button className="dashboard__btn" onClick={authActions.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default App;
