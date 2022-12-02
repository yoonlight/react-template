import React, { useEffect, useState } from "react";
import { useAuthActions } from "../../features/auth/auth.action";
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
    <div className="auth">
      <div className="container">
        <input
          type="email"
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="password"
          className="auth__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button
          className="auth__btn"
          onClick={() => authActions.logInWithEmailAndPassword(email, password)}
        >
          이메일 로그인
        </button>
        <button
          className="auth__btn auth__btn-google"
          onClick={authActions.signInWithGoogle}
        >
          구글 로그인
        </button>
        <div className="auth__link">
          <Link to="/reset">비밀번호 찾기</Link>
        </div>
        <div className="auth__link">
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
