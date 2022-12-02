import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, useAuthActions } from "../../features/auth/auth.action";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const authActions = useAuthActions();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <div className="auth">
      <div className="container">
        <input
          type="email"
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소 입력"
        />
        <button
          className="auth__btn"
          onClick={() => authActions.sendPasswordReset(email)}
        >
          이메일 전송
        </button>
        <div className="auth__link">
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
export default Reset;
