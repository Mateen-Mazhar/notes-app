import React from "react";
import Todos from "./Todos";
import { Navigate, Route, Routes } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/dashboard/todos" />}></Route>
        <Route path="todos/*" element={<Todos />}></Route>
      </Routes>
    </>
  );
};

export default Dashboard;
