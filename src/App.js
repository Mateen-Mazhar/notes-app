import React from "react";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./App.scss";
import Routes from "./pages/Routes";
import { useAuthContext } from "./Contexts/auth";
import Screenloader from "./components/screenloader";

// import { ConfigProvider } from 'antd';

function App() {
  const { isAppLoading } = useAuthContext();

  return (
    //  <ConfigProvider theme={{ token: { colorPrimary: '#4096FF' } }}>
    <>{isAppLoading ? <Screenloader /> : <Routes />}</>

    /* </ConfigProvider> */
  );
}

export default App;
