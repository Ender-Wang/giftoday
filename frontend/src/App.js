import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegistrationPage from "./pages/RegistrationPage";
import PremiumBenefitsPage from "./pages/PremiumBenefitsPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/premium-benefits" element={<PremiumBenefitsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
