import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "./AuthContex";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
