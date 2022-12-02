import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import KakaoLogin from "react-kakao-login";
import { Link, useNavigate } from "react-router-dom";
import { auth, useAuthActions } from "../../features/auth/auth.action";
import { ReactComponent as KakaoSvg } from "../../assets/kakao-svgrepo-com.svg";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const authActions = useAuthActions();
  const token = import.meta.env.VITE_KAKAO_KEY;

  const register = () => {
    if (!name) alert("Please enter name");
    authActions.registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <div className="auth">
      <div className="container">
        <input
          type="text"
          className="auth__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요."
        />
        <input
          type="email"
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
        />
        <input
          type="password"
          className="auth__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8자 이상, 영문, 숫자, 특수문자"
        />
        <button className="auth__btn" onClick={register}>
          회원가입
        </button>
        <button
          className="auth__btn auth__btn-google auth__btn-icon"
          onClick={authActions.signInWithGoogle}
        >
          <div className="auth__icon">
            <FontAwesomeIcon icon={faGoogle} />
          </div>
          구글로 시작
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
                카카오로 시작
              </button>
            );
          }}
        />
        <div className="auth__link">
          <Link to="/">로그인</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
