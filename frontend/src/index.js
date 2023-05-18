import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Test from "./Test";
import RegistrationPage from "./pages/RegistrationPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Test />
    <RegistrationPage />
  </React.StrictMode>
);
