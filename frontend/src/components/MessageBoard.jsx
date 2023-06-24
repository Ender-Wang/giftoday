import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID } from "../states/GlobalState";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";

export default function MessageBoard({ selectedDay }) {
  const [activeButton, setActiveButton] = useState("Button 2");
  const [holidays, setHolidays] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [preMessage, setPreMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newTag, setNewTag] = useState("");
  const userID = getUserID();
  const tags = ["parents", "friends", " colleagues"];

  useEffect(() => {
    const fetchHolidays = async () => {
      let month = String(selectedDay.getMonth() + 1).padStart(2, "0");
      let year = String(selectedDay.getFullYear()).padStart(2, "0");
      let day = String(selectedDay.getDate()).padStart(2, "0");
      let url =
        "https://openholidaysapi.org/PublicHolidaysByDate?date=" +
        year +
        "-" +
        month +
        "-" +
        day;

      let response = await fetch(url, {
        method: "GET",
      });
      const responseData = await response.json();
      const days = responseData
        .map((item) => {
          // Map to get the text of "EN"
          const enName = item.name.find((name) => name.language === "EN");
          return enName.text;
        })
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

      setHolidays([...days]);
      // console.log(responseData);
      response.json().then(console.log).catch(console.error);
    };
    fetchHolidays();
  }, [selectedDay, setHolidays]);

  //Show messages or festivals
  const handleButtonClick = (content) => {
    setActiveButton(content);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/user/" + userID + "/message",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setPreMessage([...responseData]);
        } else {
          console.log("Fetching data failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [userID, isLoggedIn]);

  //If newMessage is entered or tag is selected
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "newMessage":
        setNewMessage(value);
        // setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "newTag":
        setNewTag(value);
        // setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        break;
      default:
        break;
    }
  };
  const handleDeleteMessage = async (mID) => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/" + userID + "/message/" + mID,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setPreMessage(preMessage.filter((preM) => preM.id !== mID));
      } else {
        console.log("Deleting data failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Save new message and post it into postman
  const handleSaveButton = async () => {
    const data = {
      message: newMessage,
      date: selectedDay,
      tag: {
        id: 1,
        name: newTag === "" ? "general" : newTag,
      },
    };
    try {
      const response = await fetch(
        "http://localhost:4000/user/" + userID + "/message",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      setNewMessage("");
      setNewTag("");
      setPreMessage(preMessage.concat(result));
    } catch (error) {
      console.log("An error occurred while processing the request.", error);
    }
  };

  return (
    <div className="h-4/5 rounded-md bg-themeColor-80 pb-5">
      {isLoggedIn ? (
        <div className="h-full">
          {/* Buttons */}
          <div className="flex flex-row items-center justify-center px-5 ">
            <button
              type="button"
              className={`mt-5 w-1/2 rounded-t-lg pb-2 pt-2 font-bold ${
                activeButton === "Button 1" ? "bg-themeColor-40" : ""
              }`}
              onClick={() => handleButtonClick("Button 1")}
            >
              Festivals
            </button>
            <button
              type="button"
              className={`mt-5 w-1/2 rounded-t-lg pb-2 pt-2 font-bold ${
                activeButton === "Button 2" ? "bg-themeColor-40" : ""
              }`}
              onClick={() => handleButtonClick("Button 2")}
            >
              Records
            </button>
          </div>

          {/* Message of Festivals */}
          <div
            className={` mx-5 h-4/5 bg-themeColor-40 ${
              activeButton === "Button 1" ? "rounded-tr-md" : "rounded-tl-md"
            } rounded-b-md pb-6`}
          >
            {/* After pressing "Festivals" button */}
            {activeButton === "Button 1" && (
              <div className="max-h-[160px] overflow-y-auto pt-1">
                {/* <div className="absolute inset-0 bg-white" /> */}
                {holidays.map((item, index) => (
                  <div
                    className=" mx-5 my-1 transform border-b-2 px-1 py-1 align-middle transition duration-300 ease-in-out hover:scale-105 hover:cursor-default hover:rounded-md hover:border-transparent hover:bg-themeColor-80 hover:font-bold"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            {/* Message of Records */}
            {activeButton === "Button 2" && (
              <div className="">
                {/* Add a new record */}
                <div className="mb-1 flex justify-center px-5 pt-3">
                  <input
                    type="text"
                    id="newMessage"
                    name="newMessage"
                    value={newMessage}
                    onChange={handleInputChange}
                    className="focus w-full border-b-2 bg-transparent px-1 italic placeholder-white placeholder-opacity-50 focus:not-italic focus:outline-none"
                    placeholder="Add a new tag"
                  />

                  <select
                    id="newTag"
                    name="newTag"
                    value={newTag}
                    onChange={handleInputChange}
                    className=" w-14 bg-transparent text-right text-sm text-lightFontColor hover:cursor-pointer focus:outline-none"
                  >
                    <option value="" disabled>
                      #
                    </option>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        #{tag}
                      </option>
                    ))}
                  </select>

                  <div className="ml-2 rounded-md bg-themeColor-60 text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-themeColor-80 hover:text-black">
                    <button
                      type="button"
                      className="text-bold px-1"
                      onClick={() => {
                        handleSaveButton();
                      }}
                    >
                      save
                    </button>
                  </div>
                </div>

                {/* Existing Records */}
                <div className="max-h-[160px] overflow-y-auto">
                  <div>
                    <div className=" pr-5">
                      {preMessage
                        .filter((item) => {
                          const itemDate = new Date(item.date);
                          return (
                            itemDate.getFullYear() ===
                              selectedDay.getFullYear() &&
                            itemDate.getMonth() === selectedDay.getMonth() &&
                            itemDate.getDate() === selectedDay.getDate()
                          );
                        })
                        .map((item, index) => (
                          <div className="" key={index}>
                            <div className="flex items-center justify-between">
                              <div className="mx-5 my-1 w-full transform truncate whitespace-nowrap border-b-2 px-1 py-1 align-middle transition duration-300 ease-in-out hover:scale-105 hover:cursor-default hover:rounded-md hover:border-transparent hover:bg-themeColor-80 hover:font-bold">
                                {item.message}
                              </div>
                              <div className="flex">
                                <div className=" mr-2 flex text-right text-lightFontColor hover:cursor-default">
                                  #{item.tag && item.tag.name}
                                </div>
                                <div
                                  className="flex items-center"
                                  onClick={() => handleDeleteMessage(item.id)}
                                >
                                  {/* "False" icon */}
                                  <BsFillTrashFill className="bg-transparent text-lg text-lightFontColor transition duration-300 ease-in-out hover:scale-125 hover:cursor-pointer hover:text-red-600" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Homepage without login
        <div className="h-4/5 rounded-md bg-themeColor-80 pb-5">
          <div className="mb-3 flex flex-row items-center justify-center px-5 text-xl">
            <button
              type="button"
              className="mt-5 rounded-t-lg pb-2 pt-2 font-bold hover:cursor-default"
              onClick={() => handleButtonClick("Button 1")}
            >
              Festivals
            </button>
          </div>
          <div className="mx-5 h-full rounded-md bg-themeColor-40 pb-6">
            {/* After pressing "Festivals" button */}
            {activeButton === "Button 1" && (
              <div className="min-w-[230px] overflow-y-auto pt-2">
                {/* <div className="absolute inset-0 bg-white" /> */}
                {holidays.map((item, index) => (
                  <div
                    className=" mx-5 my-1 transform border-b-2 px-1 py-1 align-middle transition duration-300 ease-in-out hover:scale-105 hover:cursor-default hover:rounded-md hover:border-transparent hover:bg-themeColor-80 hover:font-bold"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
