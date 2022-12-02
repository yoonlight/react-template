import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App"));
const Login = lazy(() => import("./pages/auth/Login"));
const Reset = lazy(() => import("./pages/auth/Reset"));
const Register = lazy(() => import("./pages/auth/Register"));
const Email = lazy(() => import("./pages/auth/Email"));
const AuthLayout = lazy(() => import("./pages/auth/Layout"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
      {
        path: "email",
        element: <Email />,
      },
    ],
  },
]);
