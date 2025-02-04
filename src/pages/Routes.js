import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import { useAuthContext } from "../Contexts/auth";
import PrivateRoute from "../components/PrivateRoute";

const Index = () => {
  const { isAuth } = useAuthContext();
  console.log('isAuth', isAuth)
  return (
    <Routes>
      <Route path="/*" element={<Frontend />} />
      <Route path="/auth/*" element={!isAuth ? <Auth /> : <Navigate to="/" />} />
      <Route
        path="/dashboard/*"
        element={<PrivateRoute Component={Dashboard} />}
      />
    </Routes>
  );
};

export default Index;
