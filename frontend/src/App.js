import { Routes, Route } from "react-router-dom";
import { React } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegistrationPage from "./pages/RegistrationPage";
import PremiumBenefitsPage from "./components/PremiumBenefits";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/premiumbenefitspage" element={<PremiumBenefitsPage />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Routes>
    </div>
  );
}

export default App;
