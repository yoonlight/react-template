import { lazy } from "react";
import { Outlet } from "react-router-dom";

const BackHeader = lazy(() => import("../../components/header/BackHeader"));

const Layout = () => {
  return (
    <>
      <BackHeader />
      <Outlet />
    </>
  );
};

export default Layout;
