import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID } from "../states/GlobalState";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function MessageBoard() {
  const [activeButton, setActiveButton] = useState("Button 2");
  const holidays = ["Youth", "Chrismas", "Valentien", "Spring Festival"];
  const { isLoggedIn } = useContext(AuthContext);
  const [preMessage, setPreMessage] = useState([]);
  // const [preTag, setPreTag] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newTag, setNewTag] = useState("");
  const userID = getUserID();

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
      <div className=" bg-background absolute bottom-16 left-20 h-1/3  w-1/4 rounded-md">
        {isLoggedIn ? (
          // Homepage after login
          <div>
            <div className="mb-8 mt-8 flex flex-row items-center justify-center ">
              <button
                type="button"
                className="  bg-lightButton hover:bg-normalButton mr-4 transform rounded-lg px-5  py-1 hover:scale-105"
                onClick={() => handleButtonClick("Button 1")}
              >
                Festivals
              </button>
              <button
                type="button"
                className=" bg-lightButton hover:bg-normalButton transform rounded-lg px-5 py-1 hover:scale-105"
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
                        className="bg-message1 hover:bg-message2 hover:scale-102 mx-auto mb-4 h-7 w-4/5  transform rounded-sm"
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
                          className="bg-message1 hover:bg-message2 hover:scale-102 mx-auto mb-4 h-7 w-4/5  transform rounded-sm"
                          key={index}
                        >
                          <div className="flex items-center justify-between">
                            <div>{item.message}</div>
                            <div className=" bg-tag w-24  rounded-lg text-center">
                              Tag
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-message1 mx-auto flex h-7  w-4/5 rounded-sm ">
                    <input
                      type="text"
                      id="newMessage"
                      name="newMessage"
                      value={newMessage}
                      onChange={handleInputChange}
                      className="bg-message1 hover:bg-message2 mx-auto h-7 w-full"
                    />
                  </div>
                  <div className="bg-message1 hover:bg-message2 mx-auto mb-4 flex h-7 w-4/5 rounded-sm ">
                    <select
                      id="tag"
                      name="tag"
                      value={newTag}
                      onChange={handleInputChange}
                      className=" bg-message1 w-full  "
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
                      className=" bg-lightButton hover:bg-normalButton hover:scale-102 transform rounded-sm"
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
            <div className="mb-8 mt-8 flex flex-row items-center justify-center ">
              <button
                type="button"
                className="  bg-lightButton hover:bg-normalButton mr-4 transform rounded-lg px-5  py-1 hover:scale-105"
                onClick={() => handleButtonClick("Button 1")}
              >
                Festivals
              </button>
            </div>
            <div className="h-32 overflow-y-auto">
              <div className="mb-4 ">
                {holidays.map((item, index) => (
                  <div
                    className="bg-message1 hover:bg-message2 hover:scale-102 mx-auto mb-4 h-7 w-4/5  transform rounded-sm"
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
