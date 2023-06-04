import React from "react";
import MessageBoard from "../components/MessageBoard";
import { getUserID, getLoggedInDate } from "../states/GlobalState";
import ShopItem from "../components/ShopItem";

export default function HomePage() {
  return (
    <div>
      <div>HomePage</div>
      {getUserID()
        ? "User #" + getUserID() + " logged in at " + getLoggedInDate()
        : "No user logged in"}
      <MessageBoard />
      <ShopItem />
    </div>
  );
}
