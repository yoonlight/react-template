import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, useAuthActions } from "../../features/auth/auth.action";
import "./Email.scss";

function Email() {
  const navigate = useNavigate();
  const [user, loading, err] = useAuthState(auth);
  const authActions = useAuthActions();

  useEffect(() => {
    if (user?.emailVerified) return navigate("/");
  }, [user]);

  return (
    <div className="email">
      <div className="email__container">
        <button
          className="email__btn"
          onClick={authActions.sendEmailVerificationLink}
        >
          인증 이메일 전송
        </button>
      </div>
    </div>
  );
}

export default Email;
