import React, { useEffect, useState } from "react";
import { useAuthActions } from "../../features/auth/auth.action";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../features/auth/auth.state";
import KakaoLogin from "react-kakao-login";
import { ReactComponent as KakaoSvg } from "../../assets/kakao-svgrepo-com.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authActions = useAuthActions();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  // [ ]: token 한번에 처리할 수 있도록
  const token = import.meta.env.VITE_KAKAO_KEY;

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
          className="auth__btn auth__btn-google auth__btn-icon"
          onClick={authActions.signInWithGoogle}
        >
          <div className="auth__icon">
            <FontAwesomeIcon icon={faGoogle} />
          </div>
          구글 로그인
        </button>
        <KakaoLogin
          token={token}
          onSuccess={(res) => {
            authActions.loginWithKakao(res.response.access_token);
          }}
          onFail={console.error}
          onLogout={console.info}
          render={({ onClick }) => {
            return (
              <button
                className="auth__btn auth__btn-kakao auth__btn-icon"
                onClick={onClick}
              >
                <div className="auth__icon">
                  <KakaoSvg />
                </div>
                카카오 로그인
              </button>
            );
          }}
        />
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
