import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, useAuthActions } from "../../features/auth/auth.action";
import "./Reset.scss";
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
    <div className="reset">
      <div className="reset__container">
        <input
          type="email"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => authActions.sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;
