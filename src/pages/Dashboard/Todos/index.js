import React from "react";
import Add from "./Add";
import { Navigate, Route, Routes } from "react-router-dom";
import All from "./All";

const Todos = () => {
  return (
    <>
    <Routes>
      <Route index element={<Navigate to="/dashboard/todos/add" />}></Route>
      <Route path="add" element={<Add/>}></Route>
      <Route path="all" element={<All/>}></Route>
    </Routes>
    </>
    
  )
};

export default Todos;
