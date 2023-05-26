import React, { useState } from "react";
import MessageBoard from "../components/MessageBoard";
import { getUserID, getLoggedInDate } from "../states/GlobalState";
import Calendar from "../components/Calendar";

export default function HomePage() {
  //Default selected day is today
  const [selectedDay, setSelectedDay] = useState(new Date());
  const handleDayClick = (day) => {
    setSelectedDay(new Date(day));
  };

  return (
    <div>
      <div>HomePage</div>
      {getUserID()
        ? "User #" + getUserID() + " logged in at " + getLoggedInDate()
        : "No user logged in"}
      <Calendar selectedDay={selectedDay} onDayClick={handleDayClick} />
      <MessageBoard />
    </div>
  );
}
