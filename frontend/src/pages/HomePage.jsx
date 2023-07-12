import React, { useEffect, useState } from "react";
import MessageBoard from "../components/MessageBoard";
import Calendar from "../components/Calendar";
import ShopItem from "../components/ShopItem";

export default function HomePage({ search, filter }) {
  //Default selected day is today
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTag, setSelectedTag] = useState("general");
  const [selectedHoliday, setSelectedHoliday] = useState("");
  const handleDayClick = (day) => {
    setSelectedDay(new Date(day));
  };
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };
  const handleHolidayClick = (holiday) => {
    setSelectedHoliday(holiday);
  };
  useEffect(() => {
    document.title = "Giftoday - Home";
  }, []);

  return (
    <div className="ml-28 flex flex-col md:flex-row">
      <div className="fixed mt-14 w-full md:w-1/3">
        <div className="mt-10 h-[350px] w-[300px]">
          <Calendar selectedDay={selectedDay} onDayClick={handleDayClick} />
        </div>
        <div className="mt-8 h-[350px] w-[300px]">
          <MessageBoard
            selectedDay={selectedDay}
            onTagClick={handleTagClick}
            onHolidayClick={handleHolidayClick}
          />
        </div>
      </div>
      <div className=" ml-[300px] mt-8 justify-center pl-10 md:w-2/3">
        <ShopItem
          selectedTag={selectedTag}
          searchContent={search}
          showFilter={filter}
          selectedHoliday={selectedHoliday}
        />
      </div>
    </div>
  );
}
