import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Test from "./Test";
import App from "./App";
// import NavBar from './components/NavBar';
import {BrowserRouter} from "react-router-dom";
import Test from "./Test";
import RegistrationPage from "./pages/RegistrationPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
    <Test />
    <RegistrationPage />
  </React.StrictMode>
);
