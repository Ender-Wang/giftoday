import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get login status from local storage
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    // Save login state to local storage
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Remove login state from local storage
    localStorage.removeItem("isLoggedIn");
    // Navigate to homepage after logout
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
