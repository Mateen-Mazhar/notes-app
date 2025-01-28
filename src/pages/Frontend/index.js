import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NoPageFound from "../Misc/NoPageFound";
import CreateNote from "./CreateNote";
import SearchPage from "./SearchPage";
import Profile from "./Profile";
import PrivateRoute from "../../components/PrivateRoute";

const Frontend = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PrivateRoute Component={Home} />}></Route>
          <Route path="create" element={<CreateNote />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="*" element={<NoPageFound />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default Frontend;
