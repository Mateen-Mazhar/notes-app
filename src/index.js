import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "../src/Config/global";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Contexts/auth";
import TodosProvider from "./Contexts/Todos";
import NotesProvider from "./Contexts/notes";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TodosProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </TodosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
