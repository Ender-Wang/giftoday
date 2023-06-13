import React, { useState } from "react";
import { getUserID } from "../states/GlobalState";

export default function Calendar({ selectedDay, onDayClick }) {
  //TODO: Connect with server to fetch festival info and message info
  //   const [festivalInfo, setFestivalInfo] = useState(null);
  //   const [messageInfo, setMessageInfo] = useState(null);

  const currentDay = new Date();

  const handleDayClick = (day) => {
    const dayWithMonthAndYear = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth(),
      day
    );
    onDayClick(dayWithMonthAndYear);
    fetchFestivalInfo(dayWithMonthAndYear, getUserID());
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth() - 1,
      1
    );
    onDayClick(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth() + 1,
      1
    );
    onDayClick(nextMonth);
  };

  const handleJumpToCurrentDay = () => {
    const currentDay = new Date();
    onDayClick(currentDay);
  };

  //TODO: Fetch festival info from backend on selected day
  const fetchFestivalInfo = async (day, userID) => {
    userID = getUserID();
    // try {
    //   const response = await fetch(
    //     `/api/festival-info?day=${day}&userID=${userID}`
    //   );
    //   festivalInfo = await response.json();
    //   setFestivalInfo(festivalInfo);
    // } catch (error) {
    //   console.error("Error fetching festival info:", error);
    // }
    // alert("User ID: " + userID + ", selected day: " + day);
  };

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInPreviousMonth = getDaysInMonth(
    selectedDay.getMonth() - 1,
    selectedDay.getFullYear()
  );
  const daysInCurrentMonth = getDaysInMonth(
    selectedDay.getMonth(),
    selectedDay.getFullYear()
  );

  const firstDayOfMonth = new Date(
    selectedDay.getFullYear(),
    selectedDay.getMonth(),
    1
  );

  const startDayIndex = firstDayOfMonth.getDay(); //Returns 0-6, 0 is Sunday
  const weeksInMonth = Math.ceil((daysInCurrentMonth + startDayIndex) / 7);

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function generateDaysArray() {
    const daysArray = [];
    //Fill in the days with the days from last month before the first day of this month
    for (let i = 0; i < startDayIndex; i++) {
      daysArray.push({
        day: daysInPreviousMonth - startDayIndex + i + 1,
        month: selectedDay.getMonth() - 1,
      });
    }
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      daysArray.push({ day: i, month: selectedDay.getMonth() });
    }
    //Fill in the days with the days from next month after the last day of this month
    for (let i = 1; i <= 42 - (daysInCurrentMonth + startDayIndex); i++) {
      daysArray.push({ day: i, month: selectedDay.getMonth() + 1 });
    }
    return daysArray;
  }

  const renderCalendarGrid = () => {
    const daysArray = generateDaysArray();
    const calendarGrid = [];

    // Render the days in the week row, default to 6 weeks -> fixed 42 days -> fixed calendar grid size
    for (let week = 0; week < 6; week++) {
      const weekRow = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const dayObj = daysArray[week * 7 + dayIndex];

        // Check if the day belongs to the current month, if not, disable the click and change the color to gray
        const isPreviousMonth = dayObj.month < selectedDay.getMonth();
        const isNextMonth = dayObj.month > selectedDay.getMonth();

        const isCurrentDay =
          !isPreviousMonth &&
          !isNextMonth &&
          dayObj.day === currentDay.getDate() &&
          dayObj.month === currentDay.getMonth();

        const isSelected =
          dayObj.day === selectedDay.getDate() &&
          dayObj.month === selectedDay.getMonth();

        const handleClick = () => {
          // Check if the day belongs to the current month
          if (isPreviousMonth || isNextMonth) {
            return; // Do nothing for days outside the current month
          }
          handleDayClick(dayObj.day);
        };

        const dayClass = isSelected
          ? "cursor-pointer bg-gray-200"
          : isPreviousMonth || isNextMonth
          ? "cursor-default text-gray-400"
          : "cursor-pointer hover:bg-gray-200 transition-colors duration-500 ease-in-out";

        //TODO: Add a circle around the current day
        const currentDayStyle = isCurrentDay ? "text-white text-xl" : "";

        weekRow.push(
          <td
            key={dayIndex}
            className={`text-center ${dayClass} ${currentDayStyle}`}
            style={{
              height: "40px",
              width: "40px",
              //   border: "1px solid #ddd",
              borderRadius: "50%",
              borderCollapse: "separate",
              //   padding: "10px",
              //   borderSpacing: "10px",
            }}
            onClick={handleClick}
          >
            {dayObj.day}
          </td>
        );
      }
      calendarGrid.push(<tr key={week}>{weekRow}</tr>);
    }
    return calendarGrid;
  };

  return (
    <div className="flex w-[300px] flex-col justify-center rounded-lg bg-orange-200">
      {/* Calendar header */}
      <div className="mb-4 flex w-[300px] items-center justify-between">
        <div
          className="cursor-default pl-2 pt-1 text-xl font-bold"
          onClick={handleJumpToCurrentDay}
          title="Click to jump to current day"
        >
          {selectedDay.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="flex items-center pr-2 pt-1">
          <button
            className="cursor-pointer px-2 text-lg font-semibold"
            onClick={handlePreviousMonth}
          >
            &lt;
          </button>
          <button
            className="cursor-pointer px-2 text-lg font-semibold"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
      </div>
      <table className="w-[300px] transform transition-all duration-500 ease-in-out">
        {/* Calendar week header */}
        <thead>
          <tr>
            {daysInWeek.map((day) => (
              <th key={day} className="cursor-default py-2 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        {/* Calendar grid */}
        <tbody>{renderCalendarGrid()}</tbody>
      </table>
    </div>
  );
}
