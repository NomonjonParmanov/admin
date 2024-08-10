import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

function Auth() {
  let isLogin = localStorage.getItem("token");
  return isLogin ? <Outlet /> : <Navigate replace to={"/login"} />;
}

export default memo(Auth);
