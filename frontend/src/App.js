import { Routes, Route } from "react-router-dom";
import { React } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegistrationPage from "./pages/RegistrationPage";
import PremiumBenefitsPage from "./pages/PremiumBenefitsPage";
import ProfilePage from "./components/UserInfo";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/premium-benefits" element={<PremiumBenefitsPage />} />
        <Route path="/UserInfo" element={<ProfilePage />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Routes>
    </div>
  );
}

export default App;
