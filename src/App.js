import React from "react";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./App.scss";
import Routes from "./pages/Routes";
import { useAuthContext } from "./Contexts/auth";
import Screenloader from "./components/screenloader";

function App() {
  const { isAppLoading } = useAuthContext();

  return <>{isAppLoading ? <Screenloader /> : <Routes />}</>;
}

export default App;
