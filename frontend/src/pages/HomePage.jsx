import React from "react";
import MessageBoard from "../components/MessageBoard";
import { getUserID, getLoggedInDate } from "../states/GlobalState";

export default function HomePage() {
  return (
    <div>
      <div>HomePage</div>
      {getUserID()
        ? "User #" + getUserID() + " logged in at " + getLoggedInDate()
        : "No user logged in"}
      <MessageBoard />
    </div>
  );
}
