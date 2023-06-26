import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegistrationPage from "./pages/RegistrationPage";
import PremiumBenefitsPage from "./pages/PremiumBenefitsPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import { AuthProvider } from "./components/AuthContext";
<<<<<<< HEAD

function App() {
  return (
    <AuthProvider>
      <NavBar />
=======
import { useState } from "react";
function App() {
  const [searchContent, setSearchContent] = useState("");
  const handleSearchSubmit = (text) => {
    setSearchContent(text);
  };
  return (
    <AuthProvider>
      <NavBar
        searchText={searchContent}
        handleSearchSubmit={handleSearchSubmit}
      />
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
      <Routes>
        <Route
          path="/giftoday.com"
          element={<HomePage searchText={searchContent} />}
        />
        <Route
          path="/giftoday.com/registration"
          element={<RegistrationPage />}
        />
        <Route path="/giftoday.com/login" element={<LoginPage />} />
        <Route
          path="/giftoday.com/homepage"
          element={<HomePage searchText={searchContent} />}
        />
        <Route
          path="/giftoday.com/premium-benefits"
          element={<PremiumBenefitsPage />}
        />
        <Route path="/giftoday.com/profile" element={<ProfilePage />} />
        <Route path="/giftoday.com/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
