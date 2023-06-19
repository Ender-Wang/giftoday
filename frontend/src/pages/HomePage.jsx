import React, { useEffect, useState } from "react";
import MessageBoard from "../components/MessageBoard";
import Calendar from "../components/Calendar";
import ShopItem from "../components/ShopItem";
// import Footer from "../components/Footer";

export default function HomePage() {
  //Default selected day is today
  const [selectedDay, setSelectedDay] = useState(new Date());
  const handleDayClick = (day) => {
    setSelectedDay(new Date(day));
  };
  useEffect(() => {
    document.title = "Giftoday - Home";
  }, []);

  return (
    <div>
      <div className="absolute right-2/3 max-w-400 h-1/2 mt-16">
        <Calendar selectedDay={selectedDay} onDayClick={handleDayClick} />
      </div>
      <div className="absolute right-2/3 max-w-400 h-1/2 bottom-[-90px]">
        <MessageBoard selectedDay={selectedDay} />
      </div>
      <div className="absolute left-1/3 w-3/5 h-full mt-8 justify-center overflow-y-auto">
        <ShopItem />
      </div>
      {/* <div className="absolute bottom-2 bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
        <Footer />
      </div> */}
    </div>
  );
}
