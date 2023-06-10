import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID } from "../states/GlobalState";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
export default function PostalAddress() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("Germany");
  const [shippingDate, setShippingDate] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const userID = getUserID();

  const [formErrors, setFormErrors] = useState({});

  const germanyCities = [
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hanover",
    "Nuremberg",
    "Duisburg",
    "Bochum",
    "Wuppertal",
    "Bielefeld",
    "Bonn",
    "Münster",
    "Karlsruhe",
    "Mannheim",
    "Augsburg",
    "Wiesbaden",
    "Gelsenkirchen",
    "Mönchengladbach",
  ];

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           "http://localhost:4000/user/" + userID + "/message",
  //           {
  //             method: "GET",
  //             headers: { "Content-Type": "application/json" },
  //           }
  //         );
  //         if (response.ok) {
  //           const responseData = await response.json();
  //           setPreMessage([...responseData]);
  //           console.log(responseData);
  //         } else {
  //           console.log("Fetching data failed.");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchData();
  //   }, [userID]);

  //   //If newMessage is entered or tag is selected
  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     switch (name) {
  //       case "fullName":
  //         setName(value);
  //         setFormErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
  //         break;
  //       case "postalCode":
  //         setPostalCode(value);
  //         setFormErrors((prevErrors) => ({ ...prevErrors, postalCode: "" }));
  //         break;
  //       case "street":
  //         setStreet(value);
  //         setFormErrors((prevErrors) => ({ ...prevErrors, street: "" }));
  //         break;
  //       case "shippingDate":
  //         setShippingDate(value);
  //         setFormErrors((prevErrors) => ({ ...prevErrors, shippingDate: "" }));
  //         break;
  //       case "city":
  //         setCity(value);
  //         setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  //   const validateForm = (data) => {
  //     const errors = {};

  //     if (data.name.trim() === "") {
  //       errors.name = "Full Name is required!";
  //     }
  //     if (data.date.trim() === "") {
  //       errors.password = "Password is required!";
  //     }
  //     if (data.address.postalCode.trim() === "") {
  //       errors.postalCode = "Postal Code is required!";
  //     }
  //     if (data.address.street.trim() === "") {
  //       errors.street = "Street is required!";
  //     }
  //     if (data.address.city.trim() === "") {
  //       errors.city = "City is required!";
  //     }

  //     return errors;
  //   };
  //   // Save new message and post it into postman
  //   const handleSaveButton = async () => {
  //     const data = {
  //       message: newMessage,
  //     };
  //     try {
  //       const response = await fetch(
  //         "http://localhost:4000/user/" + userID + "/message",
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(data),
  //         }
  //       );
  //       console.log(response);
  //       if (response.ok) {
  //         const result = await response.json();
  //         alert("successful!");
  //         setNewMessage("");
  //         setShowInput(false);

  //         setPreMessage(preMessage.concat(result));
  //       } else {
  //         alert("Set Record failed!");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       alert("An error occurred while processing the request.");
  //     }
  //   };

  return (
    <div className="h-600 ">
      {/* "choose address" container */}
      <div className=" absolute bottom-8 left-10 h-2/5 w-2/5  border">
        {/* previous addresses */}
        <div className=" h-1/3 overflow-y-auto border">
          <div className=" flex border">
            {/* home icon */}
            <div className="basis-1/4">
              <AiOutlineHome className="text-6xl " />
            </div>
            {/* text infor */}
            <div>
              {/* name */}
              <div>name</div>
              {/* address */}
              <div>address</div>
            </div>
          </div>
        </div>
        {/* new address */}
        <div></div>
      </div>
    </div>
  );
}
