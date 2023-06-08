import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserID } from "../states/GlobalState";

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
    // Remove userID from global state
    removeUserID();
    // Navigate to homepage after logout
    navigate("/");
    window.location.reload(); // reload current page
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
