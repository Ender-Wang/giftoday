import React from "react";
import MessageBoard from "../components/MessageBoard";

export default function HomePage() {
  //Get globalState userID and loggedInDate
  const userID = localStorage.getItem("userID");
  const loggedInDate = localStorage.getItem("loggedInDate");

  return (
    <div>
      <div>HomePage</div>
      {userID
        ? "User #" + userID + " logged in at " + loggedInDate
        : "No user logged in"}
      <MessageBoard />
    </div>
  );
}
