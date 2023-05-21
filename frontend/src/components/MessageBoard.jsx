import React, { useState } from "react";

export default function MessageBoard(){
    const [currentContent, setCurrentContent] = useState ("")
    const [firstRecord, setFirstRecord] = useState("");
    const [secondRecord, setSecondRecord] = useState("");
    const [thirdRecord, setThirdRecord] = useState("");
    const festivals = [
        "Youth day"
    ];
    const Component1=() =>{
        return <div>
                    <div className="mb-4">
                        <div
                            className="w-full bg-gray-400 ">
                                Youth day
                        </div>
                    </div>

                    <div className="mb-4">
                        <div
                            className="w-full bg-gray-400 ">
                        </div>
                    </div>

                    <div className="mb-8">
                        <div
                            className="w-full bg-gray-400 ">
                        </div>
                    </div>
                </div>;
    };
    const Component2=() =>{
        return <div>
                    <div className="mb-4 ">
                    <input
                        type="text"
                        id="firstRecord"
                        name="firstRecord"
                        value={firstRecord}
                        onChange={handleInputChange}
                        className="w-full bg-gray-400"/>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            id="secondRecord"
                            name="secondRecord"
                            value={secondRecord}
                            onChange={handleInputChange}
                            className="w-full bg-gray-400"/>
                    </div>

                    <div className="mb-8">
                        <input
                            type="text"
                            id="thirdRecord"
                            name="thirdRecord"
                            value={thirdRecord}
                            onChange={handleInputChange}
                            className="w-full bg-gray-400 "/>
                    </div>
                </div>;
    };
    
    const handleInputChange = (event) => {
        const { name, value} =event.target;

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

    
    let content= <Component2/>;
    
    

    const handleButtonClick = (content) => {
        setCurrentContent(content);
    }
    if(currentContent === 'Content 1'){
        content=<Component1/>;
    }else {
        content=<Component2/>;
    }

    return (
        <div className="h-600 "> 
            <div className=" h-300 absolute bottom-20 left-20 w-1/4 flex flex-col items-center justify-center bg-background">
                
                <div className="mb-8 mt-8 basis-1">
                            <button type="button" 
                            className="  py-1 px-5 rounded-full bg-lightButton mr-4"
                            onClick={()=>handleButtonClick('Content 1')}>
                            Festivals
                            </button>
                            <button type="button" 
                            className=" py-1 px-5 rounded-full bg-lightButton"
                            onClick={()=>handleButtonClick('Content 2')}>
                            Records
                            </button>
                </div>
                <div>{content}</div>

                


        
            </div>
        </div>
    );
}