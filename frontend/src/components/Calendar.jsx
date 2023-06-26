import React from "react";
import { AiFillGift } from "react-icons/ai";
import { getSelectedDate, setSelectedDate } from "../states/GlobalState";

export default function Calendar({ selectedDay, onDayClick }) {
  const currentDay = new Date();

  const handleDayClick = (day) => {
    const dayWithMonthAndYear = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth(),
      day
    );
    onDayClick(dayWithMonthAndYear);

    const selectedDate = new Date(dayWithMonthAndYear);
    setSelectedDate(selectedDate);

    // wrap the selected date in a Date object
    // const dateOfSelected = new Date(getSelectedDate());  // this is a Date object
    // console.log(
    //   "Date of selected to string:",
    //   dateOfSelected.toLocaleDateString("en-GB")
    // );
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
            className={`text-center ${dayClass} ${currentDayStyle} h-10 w-10 border-separate rounded-[50%]`}
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
    <div className="bg-themeColor-80 flex w-full flex-col justify-center rounded-lg bg-cover bg-center bg-no-repeat p-2">
      <AiFillGift className="absolute z-0 ml-2.5 mt-16 text-[260px] text-white opacity-20" />
      {/* Calendar header */}
      <div className="mb-4 flex w-full items-center justify-between">
        <div
          className="cursor-default pl-2 pt-1 text-xl font-bold transition duration-300 ease-in-out hover:scale-125 hover:text-white"
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
            className="cursor-pointer px-2 text-2xl font-semibold transition duration-300 ease-in-out hover:scale-125 hover:text-white"
            onClick={handlePreviousMonth}
          >
            &lt;
          </button>
          <button
            className="cursor-pointer px-2 text-2xl font-semibold transition duration-300 ease-in-out hover:scale-125 hover:text-white"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
      </div>
      <table className="w-full transform transition-all duration-500 ease-in-out">
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
