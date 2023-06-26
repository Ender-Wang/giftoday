import React, { useEffect, useState } from "react";
import MessageBoard from "../components/MessageBoard";
import Calendar from "../components/Calendar";
import ShopItem from "../components/ShopItem";

export default function HomePage({ searchContent }) {
  //Default selected day is today
  const [selectedDay, setSelectedDay] = useState(new Date());
  const handleDayClick = (day) => {
    setSelectedDay(new Date(day));
  };
  useEffect(() => {
    document.title = "Giftoday - Home";
  }, []);

  return (
    <div className="ml-28 flex flex-col md:flex-row">
      <div className="fixed mt-14 w-full md:w-1/3">
        <div className="mt-4 h-[350px] w-[300px]">
          <Calendar selectedDay={selectedDay} onDayClick={handleDayClick} />
        </div>
        <div className="mt-8 h-[350px] w-[300px]">
          <MessageBoard selectedDay={selectedDay} />
        </div>
      </div>
      <div className=" ml-[350px] w-full md:w-2/3">
        <div className="mt-8 h-full justify-center overflow-y-auto">
<<<<<<< HEAD
<<<<<<< HEAD
          <ShopItem />
=======
          <ShopItem selectedTag={selectedTag} searchContent={searchContent} />
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
=======
          <ShopItem selectedTag={selectedTag} searchContent={searchContent} />
>>>>>>> parent of 3200ef4 (feat(ShopItem): add filter function)
        </div>
      </div>
    </div>
  );
}
