import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function MessageBoard() {
  const [currentContent, setCurrentContent] = useState("");
  const [firstRecord, setFirstRecord] = useState("");
  const holidays = ["Youth", "Chrismas", "Valentien", "Spring Festival"];

  const Component1 = () => {
    return (
      <div className="h-32 overflow-y-auto">
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
    const firstRecordRef = useRef("");

    useEffect(() => {
      // 组件挂载后，设置输入框焦点
      firstRecordRef.current.focus();
    }, []);

    return (
      <div>
        <div className="h-32 overflow-y-auto">
          {/* read from mongodb */}
          <div className="mb-4">
            {holidays.map((item, index) => (
              <div className="w-4/5 mx-auto h-7 bg-gray-200 mb-4" key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          {/*fixed input*/}
          <div className="w-4/5 mx-auto h-7 bg-gray-200 mb-4">
            <input
              type="text"
              id="message_1"
              name="firstRecord"
              // key="firstRecord"
              ref={firstRecordRef}
              value={firstRecord}
              onChange={handleInputChange}
              className="w-full mx-auto h-7 bg-gray-200 mb-4"
            />
          </div>
        </div>
      </div>
    );
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "firstRecord":
        setFirstRecord(value);
        break;
      default:
        break;
    }
  };

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
        <div>{content}</div>
      </div>
    </div>
  );
}
