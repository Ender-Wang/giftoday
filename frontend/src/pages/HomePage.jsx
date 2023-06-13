import React, { useState } from "react";
import MessageBoard from "../components/MessageBoard";
import Calendar from "../components/Calendar";
import ShopItem from "../components/ShopItem";

export default function HomePage() {
  //Default selected day is today
  const [selectedDay, setSelectedDay] = useState(new Date());
  const handleDayClick = (day) => {
    setSelectedDay(new Date(day));
  };

  return (
    <div>
      <Calendar selectedDay={selectedDay} onDayClick={handleDayClick} />
      <MessageBoard />
      <ShopItem />
    </div>
  );
}
