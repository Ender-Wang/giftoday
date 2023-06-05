import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID } from "../states/GlobalState";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function MessageBoard() {
  const [activeButton, setActiveButton] = useState("Button 2");
  const holidays = ["Youth", "Chrismas", "Valentien", "Spring Festival"];
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [preMessage, setPreMessage] = useState([]);
  const [preTag, setPreTag] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newTag, setNewTag] = useState("");
  const userID = getUserID();

  const tags = ["parents", "friends", " colleagues"];

  //when open the page, preMessages will be shown
  useEffect(() => {
    fetchData();
  });
  //Show messages or festivals
  const handleButtonClick = (content) => {
    setActiveButton(content);
  };
  //fetch messages from mongodb
  const fetchData = () => {
    fetch("http://localhost:4000/user/" + userID + "/message", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setPreMessage((prevMessages) => [...responseData]);
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      <div className=" h-1/3 absolute bottom-16 left-20 w-1/4  bg-background rounded-md">
        {isLoggedIn ? (
          // Homepage after login
          <div>
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
            <div>
              {/* After pressing "Festivals" button */}
              {activeButton === "Button 1" && (
                <div className="h-32 overflow-y-auto">
                  <div className="mb-4 ">
                    {holidays.map((item, index) => (
                      <div
                        className="w-4/5 mx-auto h-7 bg-message1 mb-4 rounded-sm hover:bg-message2  transform hover:scale-102"
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
                <div className="h-32 overflow-y-auto">
                  <div>
                    <div className="mb-4 ">
                      {preMessage.map((item, index) => (
                        <div
                          className="w-4/5 mx-auto h-7 bg-message1 mb-4 rounded-sm hover:bg-message2  transform hover:scale-102"
                          key={index}
                        >
                          <div className="flex justify-between items-center">
                            <div>{item.message}</div>
                            <div className=" text-center rounded-lg  bg-tag w-24">
                              Tag
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-4/5 mx-auto h-7 bg-message1  rounded-sm flex ">
                    <input
                      type="text"
                      id="newMessage"
                      name="newMessage"
                      value={newMessage}
                      onChange={handleInputChange}
                      className="w-full mx-auto h-7 bg-message1 hover:bg-message2"
                    />
                  </div>
                  <div className="w-4/5 mx-auto h-7 bg-message1 hover:bg-message2 mb-4 rounded-sm flex ">
                    <select
                      id="tag"
                      name="tag"
                      value={newTag}
                      onChange={handleInputChange}
                      className=" w-full bg-message1  "
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
                      className=" rounded-sm bg-lightButton hover:bg-normalButton transform hover:scale-102"
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
        ) : (
          // Homepage without login
          <div>
            <div className="flex flex-row items-center justify-center mb-8 mt-8 ">
              <button
                type="button"
                className="  py-1 px-5 rounded-lg bg-lightButton mr-4 hover:bg-normalButton  transform hover:scale-105"
                onClick={() => handleButtonClick("Button 1")}
              >
                Festivals
              </button>
            </div>
            <div className="h-32 overflow-y-auto">
              <div className="mb-4 ">
                {holidays.map((item, index) => (
                  <div
                    className="w-4/5 mx-auto h-7 bg-message1 mb-4 rounded-sm hover:bg-message2  transform hover:scale-102"
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
