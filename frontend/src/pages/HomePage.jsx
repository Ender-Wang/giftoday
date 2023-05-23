import React from "react";
import HomePage from "./HomePage";
import MessageBoard from "../components/MessageBoard";

export default function HomePage() {
  const userID = localStorage.getItem("userID");
  const loggedInDate = localStorage.getItem("loggedInDate");

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
  };

  return (
    <div>
      <div>HomePage</div>
      {userID
        ? "User " + userID + " logged in at " + loggedInDate
        : "No user logged in"}
      <div></div>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Landing Page</h1>
        <MessageBoard />
      </div>
    </div>
  );
}
