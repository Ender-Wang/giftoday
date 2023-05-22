import React from "react";

export default function HomePage() {
  const userID = localStorage.getItem("userID");
  const loggedInDate = localStorage.getItem("loggedInDate");
  return (
    <div>
      <div>HomePage</div>
      {userID
        ? "User " + userID + " logged in at " + loggedInDate
        : "No user logged in"}
      <div></div>
    </div>
  );
}
