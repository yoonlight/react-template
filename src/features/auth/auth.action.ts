import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { app } from "../../firebase";
import { useAuthAPI } from "./auth.api";
import { authState } from "./auth.state";

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const useAuthActions = () => {
  const setAuth = useSetRecoilState(authState);
  const api = useAuthAPI();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const isRegisteredRes = await api.checkRegistered(user.uid);
      if (!isRegisteredRes.data && user.displayName && user.email) {
        await api.register({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      const token = await user.getIdToken();
      const res = await api.login({ token });
      localStorage.setItem("accessToken", res.data.accessToken);
      setAuth(res.data.accessToken);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(err.message);
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      const res = await api.login({ token });
      localStorage.setItem("accessToken", res.data.accessToken);
      setAuth(res.data.accessToken);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await api.register({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(err.message);
    }
  };

  const sendEmailVerificationLink = async () => {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      alert("Email Verification Sent!");
    } else {
      alert("로그인 된 경우에 접속가능한 페이지입니다.");
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("accessToken");
      setAuth(null);
      navigate("/login");
    });
  };

  return {
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendEmailVerificationLink,
    sendPasswordReset,
    logout,
  };
};
