import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import RegistrationPage from "./pages/RegistrationPage";
import PremiumBenefitsPage from "./pages/PremiumBenefitsPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import { AuthProvider } from "./components/AuthContext";
import OrderConfirmation from "./pages/OrderConfirmationPage";

function App() {
  const [searchContent, setSearchContent] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const handleSearchContent = (content) => {
    setSearchContent(content);
  };
  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <AuthProvider>
      <NavBar
        onSearchClick={handleSearchContent}
        onFilterClick={handleFilter}
      />
      <Routes>
        <Route
          path="/giftoday.com"
          element={<HomePage search={searchContent} filter={showFilter} />}
        />
        <Route
          path="/giftoday.com/registration"
          element={<RegistrationPage />}
        />
        <Route path="/giftoday.com/login" element={<LoginPage />} />
        <Route path="/giftoday.com/homepage" element={<HomePage />} />
        <Route
          path="/giftoday.com/premium-benefits"
          element={<PremiumBenefitsPage />}
        />
        <Route path="/giftoday.com/profile" element={<ProfilePage />} />
        <Route path="/giftoday.com/checkout" element={<CheckoutPage />} />
        <Route
          path="/giftoday.com/OrderConfirmation"
          element={<OrderConfirmation />}
        />
        <Route path="*" element={<p>There's nothing here!</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
