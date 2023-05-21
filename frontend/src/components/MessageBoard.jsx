import React, { useState } from "react";

export default function MessageBoard() {
  const [currentContent, setCurrentContent] = useState("");
  const [firstRecord, setFirstRecord] = useState("");
  const [secondRecord, setSecondRecord] = useState("");
  const [thirdRecord, setThirdRecord] = useState("");
  const holidays = ["Youth", "Chrismas", "Valentien", "Spring Festival"];

  const Component1 = () => {
    return (
      <div>
        <div className="mb-4">
          {holidays.map((item, index) => (
            <div className="w-4/5 mx-auto h-7 bg-gray-200 mb-4" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const Component2 = () => {
    return (
      <div>
        <div className="w-4/5 mx-auto h-7 bg-gray-200 mb-4">
          <input
            type="text"
            id="firstRecord"
            name="firstRecord"
            value={firstRecord}
            onChange={handleInputChange}
            className="w-full mx-auto h-7 bg-gray-200 mb-4"
          />
        </div>

        <div className="w-4/5 mx-auto h-7 bg-gray-200 mb-4">
          <input
            type="text"
            id="secondRecord"
            name="secondRecord"
            value={secondRecord}
            onChange={handleInputChange}
            className="w-full mx-auto h-7 bg-gray-200 mb-4"
          />
        </div>

        <div className="w-4/5 mx-auto h-7 bg-gray-200 mb-4">
          <input
            type="text"
            id="thirdRecord"
            name="thirdRecord"
            value={thirdRecord}
            onChange={handleInputChange}
            className="w-full mx-auto h-7 bg-gray-200 mb-4"
          />
        </div>
      </div>
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "firstRecord":
        setFirstRecord(value);
        break;
      case "secondRecord":
        setSecondRecord(value);
        break;
      case "thirdRecord":
        setThirdRecord(value);
        break;
      default:
        break;
    }
  };

  let content = <Component2 />;

  const handleButtonClick = (content) => {
    setCurrentContent(content);
  };
  if (currentContent === "Content 1") {
    content = <Component1 />;
  } else {
    content = <Component2 />;
  }

  return (
    <div className="h-600 ">
      <div className=" h-1/3 absolute bottom-16 left-24 w-1/4  bg-background">
        <div className="flex flex-row items-center justify-center mb-8 mt-8 ">
          <button
            type="button"
            className="  py-1 px-5 rounded-full bg-lightButton mr-4"
            onClick={() => handleButtonClick("Content 1")}
          >
            Festivals
          </button>
          <button
            type="button"
            className=" py-1 px-5 rounded-full bg-lightButton"
            onClick={() => handleButtonClick("Content 2")}
          >
            Records
          </button>
        </div>
        <div className="h-32 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
}
