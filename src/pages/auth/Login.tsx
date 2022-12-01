import React, { useEffect, useState } from "react";
import { useAuthActions } from "../../features/auth/auth.action";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../features/auth/auth.state";

function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authActions = useAuthActions();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate("/");
  }, [auth]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="email"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => authActions.logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button
          className="login__btn login__google"
          onClick={authActions.signInWithGoogle}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
