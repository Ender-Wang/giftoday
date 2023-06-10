import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID } from "../states/GlobalState";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

export default function MessageBoard() {
  const [activeButton, setActiveButton] = useState("Button 2");
  const holidays = ["Youth", "Chrismas", "Valentien", "Spring Festival"];
  const { isLoggedIn } = useContext(AuthContext);
  const [preMessage, setPreMessage] = useState([]);
  // const [preTag, setPreTag] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newTag, setNewTag] = useState("");
  const userID = getUserID();
  const [showInput, setShowInput] = useState(false);

  const tags = ["parents", "friends", " colleagues"];

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
          // console.log(responseData);
        } else {
          console.log("Fetching data failed.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userID]);

  //If newMessage is entered or tag is selected
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "newMessage":
        setNewMessage(value);
        // setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "tag":
        setNewTag(value);
        // setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        break;
      default:
        break;
    }
  };
  // Save new message and post it into postman
  const handleSaveButton = async () => {
    const data = {
      message: newMessage,
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
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        alert("successful!");
        setNewMessage("");
        setShowInput(false);

        setPreMessage(preMessage.concat(result));
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
      <div className=" absolute bottom-16 left-20 h-1/3 w-1/4  rounded-md bg-background">
        {isLoggedIn ? (
          // Homepage after login
          <div>
            {/* header */}
            <div className="mb-8 mt-8 flex flex-row items-center justify-center ">
              <button
                type="button"
                className="  mr-4 transform rounded-lg bg-lightButton px-5 py-1  hover:scale-105 hover:bg-normalButton"
                onClick={() => handleButtonClick("Button 1")}
              >
                Festivals
              </button>
              <button
                type="button"
                className=" transform rounded-lg bg-lightButton px-5 py-1 hover:scale-105 hover:bg-normalButton"
                onClick={() => handleButtonClick("Button 2")}
              >
                Records
              </button>
            </div>
            {/* body */}
            <div>
              {/* After pressing "Festivals" button */}
              {activeButton === "Button 1" && (
                <div className="h-32 overflow-y-auto">
                  <div className="mb-4 ">
                    {holidays.map((item, index) => (
                      <div
                        className="hover:scale-102 mx-auto mb-4 h-7 w-4/5 transform rounded-sm  bg-message1 hover:bg-message2"
                        key={index}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* After pressing "Records" button */}
              {activeButton === "Button 2" && (
                <div>
                  <div className="h-32 overflow-y-auto">
                    <div>
                      {/* input box */}
                      {showInput && (
                        <div>
                          <div className="mx-auto mb-4 flex h-7  w-4/5 rounded-sm bg-message1 ">
                            <input
                              type="text"
                              id="newMessage"
                              name="newMessage"
                              value={newMessage}
                              onChange={handleInputChange}
                              className="mx-auto h-7 w-full bg-message1 hover:bg-message2"
                            />

                            <select
                              id="tag"
                              name="tag"
                              value={newTag}
                              onChange={handleInputChange}
                              className=" bg-message1 text-lightFontColor "
                            >
                              <option
                                value=""
                                className="text-lightFontColor"
                                disabled
                              >
                                Select a tag
                              </option>
                              {tags.map((tag) => (
                                <option
                                  className="text-lightFontColor"
                                  key={tag}
                                  value={tag}
                                >
                                  {tag}
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              className=" hover:scale-102 transform rounded-sm bg-lightButton hover:bg-normalButton"
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
                    <div>
                      <div className="mb-4 ">
                        {preMessage.map((item, index) => (
                          <div
                            className="hover:scale-102 mx-auto mb-4 h-7 w-4/5 transform rounded-sm  bg-message1 hover:bg-message2"
                            key={index}
                          >
                            <div className="flex items-center justify-between">
                              <div>{item.message}</div>
                              <div className=" w-24 rounded-lg  bg-tag text-center">
                                Tag
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {!showInput && (
                    <div
                      className=" button-4 absolute right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-lightPlusButton"
                      onClick={() => setShowInput(true)}
                    >
                      <AiOutlineEdit className="text-2xl text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Homepage without login
          <div>
            <div className="mb-8 mt-8 flex flex-row items-center justify-center ">
              <button
                type="button"
                className="  mr-4 transform rounded-lg bg-lightButton px-5 py-1  hover:scale-105 hover:bg-normalButton"
                onClick={() => handleButtonClick("Button 1")}
              >
                Festivals
              </button>
            </div>
            <div className="h-32 overflow-y-auto">
              <div className="mb-4 ">
                {holidays.map((item, index) => (
                  <div
                    className="hover:scale-102 mx-auto mb-4 h-7 w-4/5 transform rounded-sm  bg-message1 hover:bg-message2"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
