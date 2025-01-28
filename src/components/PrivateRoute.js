import React from "react";
import { useAuthContext } from "../Contexts/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const { isAuth } = useAuthContext();
  console.log('isAuth', isAuth)
  if (!isAuth) return <Navigate to="/auth/login" />;

  return <Component />;
};

export default PrivateRoute;
