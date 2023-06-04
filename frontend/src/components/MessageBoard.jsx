import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID } from "../states/GlobalState";

export default function MessageBoard() {
  const [activeButton, setActiveButton] = useState("Button 2");
  const [newMessage, setNewMessage] = useState("");
  const holidays = ["Youth", "Chrismas", "Valentien", "Spring Festival"];
  const [preMessage, setPreMessage] = useState([]);
  const [tag, setTag] = useState("");
  const userID = getUserID();

  const tags = ["parents", "friends", " colleagues"];

  const handleButtonClick = (content) => {
    setActiveButton(content);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "newMessage":
        setNewMessage(value);
        // setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "tag":
        setTag(value);
        // setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        break;
      default:
        break;
    }
  };

  const handleSaveButton = async () => {
    const data = {
      message: newMessage,
    };

    setPreMessage(preMessage.concat(newMessage));
    try {
      const response = await fetch(
        "http://localhost:4000/user/" + userID + "/message",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (response.ok) {
        // const result = await response.json();
        alert("successful!");
        setNewMessage("");
      } else {
        alert("Set Record failed!");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while processing the request.");
    }
  };

  return (
    <div className="h-600 ">
      <div className=" h-1/3 absolute bottom-16 left-20 w-1/4  bg-background rounded-md">
        <div className="flex flex-row items-center justify-center mb-8 mt-8 ">
          <button
            type="button"
            className="  py-1 px-5 rounded-lg bg-lightButton mr-4 hover:bg-normalButton  transform hover:scale-105"
            onClick={() => handleButtonClick("Button 1")}
          >
            Festivals
          </button>
          <button
            type="button"
            className=" py-1 px-5 rounded-lg bg-lightButton hover:bg-normalButton transform hover:scale-105"
            onClick={() => handleButtonClick("Button 2")}
          >
            Records
          </button>
        </div>
        {activeButton === "Button 1" && (
          <div className="h-32 overflow-y-auto">
            <div className="mb-4 ">
              {holidays.map((item, index) => (
                <div
                  className="w-4/5 mx-auto h-7 bg-gray-200 mb-4 rounded-sm hover:bg-gray-300  transform hover:scale-102"
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeButton === "Button 2" && (
          <div className="h-32 overflow-y-auto">
            <div>
              <div className="mb-4 ">
                {preMessage.map((item, index) => (
                  <div
                    className="w-4/5 mx-auto h-7 bg-gray-200 mb-4 rounded-sm hover:bg-gray-300  transform hover:scale-102"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-4/5 mx-auto h-7 bg-gray-200 mb-4 rounded-sm flex ">
              <input
                type="text"
                id="newMessage"
                name="newMessage"
                value={newMessage}
                onChange={handleInputChange}
                className="w-full mx-auto h-7 bg-gray-200 mb-4"
              />

              <select
                id="tag"
                name="tag"
                value={tags}
                onChange={handleInputChange}
                className={
                  "w-full border-b-2 border-themeColor p-2 outline-none "
                }
                required
              >
                <option value="" disabled>
                  Select a tag
                </option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className=" rounded-sm bg-gray-200 hover:bg-normalButton transform hover:scale-105"
                onClick={() => {
                  handleSaveButton();
                }}
              >
                save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
