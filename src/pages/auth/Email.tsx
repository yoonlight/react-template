import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, useAuthActions } from "../../features/auth/auth.action";

function Email() {
  const navigate = useNavigate();
  const [user, loading, err] = useAuthState(auth);
  const authActions = useAuthActions();

  useEffect(() => {
    if (user?.emailVerified) return navigate("/");
  }, [user]);

  if (!user) return navigate("/");

  return (
    <div className="auth">
      <div className="container">
        <button
          className="auth__btn"
          onClick={authActions.sendEmailVerificationLink}
        >
          인증 이메일 전송
        </button>
      </div>
    </div>
  );
}

export default Email;
