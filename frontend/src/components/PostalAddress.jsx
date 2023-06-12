import React, { useState } from "react";
import { useEffect } from "react";
import { getUserID } from "../states/GlobalState";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
export default function PostalAddress() {
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country] = useState("Germany");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [preAddress, setPreAddress] = useState([]);
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "shippingDate":
        setShippingDate(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, shippingDate: "" }));
        break;
      case "street":
        setStreet(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, street: "" }));
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
        break;
      case "postalCode":
        setPostalCode(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, postalCode: "" }));
        break;
      case "city":
        setCity(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
        break;
      default:
        break;
    }
  };
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
  //
  // Save new address and post it into mongoDB
  const handleSave = async () => {
    const data = {
      name: name,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      city: city,
      country: country,
      street: street,
      shippingDate: shippingDate,
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
        setName("");
        setPostalCode("");
        setStreet("");
        setCity("");
        setPhoneNumber("");
        setShippingDate("");

        setPreAddress(preAddress.concat(result));
      } else {
        alert("Save failed!");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while processing the request.");
    }
  };

  return (
    <div className="h-600 ">
      {/* "choose address" container */}
      <div className="absolute bottom-8 left-10 h-2/5 w-2/5 pl-4 pt-2">
        <h1 className=" font-sans text-xl">Choose address</h1>
        <div className=" grid h-full w-full grid-rows-4">
          {/* previous addresses */}
          <div className=" row-span-1 mb-2 w-4/5 overflow-y-auto rounded-lg border shadow-lg ">
            <div className=" grid grid-cols-4 grid-rows-3">
              {/* home icon */}
              <div className="row-span-3">
                <AiOutlineHome className="ml-4 mt-2 text-6xl " />
              </div>
              {/* text infor */}
              <div className="col-span-3 ml-4 mt-2">
                {/* name */}
                <div>name</div>
                {/* address */}
                <div className="row-span-2">address</div>
              </div>
            </div>
            <div className=" grid grid-cols-4 grid-rows-3">
              {/* home icon */}
              <div className="row-span-3">
                <AiOutlineHome className="text-6xl " />
              </div>
              {/* text infor */}
              <div className="col-span-3">
                {/* name */}
                <div>name</div>
                {/* address */}
                <div className="row-span-2">address</div>
              </div>
            </div>
          </div>
          {/* new address */}
          <div className="row-span-3 ml-4 mt-2 grid grid-cols-6 gap-4">
            {/* full name */}
            <div className="col-span-4 mb-4">
              <label htmlFor="name" className=" block font-bold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.name ? formErrors.name : ""}
              />
            </div>
            {/* shipping date */}
            <div className="col-span-2 mb-4">
              <label htmlFor="shippingDate" className=" block font-bold">
                Shipping Date
              </label>
              <input
                type="text"
                id="shippingDate"
                name="shippingDate"
                value={shippingDate}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.name ? formErrors.name : ""}
              />
            </div>
            {/* Street */}
            <div className="col-span-4 mb-4">
              <label htmlFor="street" className=" block font-bold">
                Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={street}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.name ? formErrors.name : ""}
              />
            </div>
            {/* phone number */}
            <div className="col-span-2 mb-4">
              <label htmlFor="phoneNumber" className=" block font-bold">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.name ? formErrors.name : ""}
              />
            </div>
            {/* city */}
            <div className="col-span-2 mb-4">
              <label htmlFor="city" className=" block] font-bold">
                City/Town
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.name ? formErrors.name : ""}
              />
            </div>
            {/* country */}
            <div className="col-span-1 mb-4">
              <label htmlFor="country" className=" block  font-bold">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.name ? formErrors.name : ""}
              />
            </div>
            {/* postal code */}
            <div className="col-span-2 mb-4">
              <label htmlFor="postalCode" className=" block font-bold">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={postalCode}
                onChange={handleInputChange}
                className={`border-themeColor w-full border-b-2 outline-none ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                required
                placeholder={formErrors.name ? formErrors.name : ""}
              />
            </div>
            {/* save button */}
            <div className=" mb-4">
              <button
                type="button"
                className="hover:scale-102 transform rounded-lg bg-lightButton px-5  py-1 hover:bg-normalButton"
                // onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
